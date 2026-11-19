"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Trash2,
  Lock,
  Clock,
  Star,
  Mail,
  User,
  Calendar,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { GuestReview } from "@/lib/reviews-storage";

export default function AdminReviewsPage() {
  const [adminKey, setAdminKey] = useState<string>("winn-hotel-admin");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [reviews, setReviews] = useState<GuestReview[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [loading, setLoading] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function loadReviews(keyToUse = adminKey) {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`/api/reviews/admin?key=${encodeURIComponent(keyToUse)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to authenticate or fetch reviews.");
      }
      setReviews(data.reviews || []);
      setAuthenticated(true);
    } catch (err) {
      setAuthenticated(false);
      setErrorMessage(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        const res = await fetch(`/api/reviews/admin?key=${encodeURIComponent("winn-hotel-admin")}`);
        const data = await res.json();
        if (mounted && res.ok) {
          setReviews(data.reviews || []);
          setAuthenticated(true);
        }
      } catch {
        // Leave unauthenticated
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  async function handleModerate(id: string, status: "approved" | "rejected") {
    setActionLoading(id);
    try {
      const res = await fetch("/api/reviews/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      
      // Update local state
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status, moderatedAt: new Date().toISOString() } : r)),
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update review status");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;
    setActionLoading(id);
    try {
      const res = await fetch(`/api/reviews/admin?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete review");
    } finally {
      setActionLoading(null);
    }
  }

  const counts = {
    all: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  const filteredReviews = reviews.filter((r) => {
    if (filter === "all") return true;
    return r.status === filter;
  });

  return (
    <div className="pt-28 pb-24 min-h-screen bg-ivory">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-charcoal/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-lake text-white">
                <Lock size={14} />
              </span>
              <p className="label-caps text-sage">Administration Portal</p>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl text-lake">
              Guest Reviews Moderation
            </h1>
            <p className="text-xs text-charcoal/65 mt-1">
              Screen, approve, or reject guest reviews before they appear on the public website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-white border border-charcoal/15 text-lake hover:text-terra transition-colors rounded-sm focus-ring"
            >
              <span>View Public Reviews</span>
              <ExternalLink size={12} />
            </Link>

            <button
              onClick={() => loadReviews()}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-lake text-white hover:bg-lake-deep transition-colors rounded-sm focus-ring disabled:opacity-60"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Key Login if not authenticated */}
        {!authenticated && (
          <div className="my-12 max-w-md mx-auto bg-white p-8 border border-charcoal/10 shadow-sm">
            <h2 className="font-serif text-2xl text-lake mb-2">Enter Administration Key</h2>
            <p className="text-xs text-charcoal/60 mb-4">
              Enter the hotel management moderation key to access review management.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loadReviews();
              }}
              className="space-y-4"
            >
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Moderation key"
                className="w-full bg-white border border-charcoal/15 px-4 py-2.5 text-sm focus:border-terra focus:outline-none rounded-sm"
              />
              {errorMessage && (
                <p className="text-xs text-terra">{errorMessage}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-terra text-white hover:bg-[#a66244] transition-colors rounded-sm"
              >
                {loading ? "Authenticating…" : "Unlock Portal"}
              </button>
            </form>
          </div>
        )}

        {/* Authenticated Dashboard */}
        {authenticated && (
          <div className="mt-8 space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setFilter("pending")}
                className={`p-5 text-left border rounded-sm transition-all ${
                  filter === "pending"
                    ? "bg-white border-terra shadow-sm ring-1 ring-terra"
                    : "bg-white/80 border-charcoal/10 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-charcoal/60 mb-1">
                  <span>Pending Moderation</span>
                  <Clock size={14} className="text-terra" />
                </div>
                <p className="font-serif text-3xl font-medium text-terra">
                  {counts.pending}
                </p>
              </button>

              <button
                onClick={() => setFilter("approved")}
                className={`p-5 text-left border rounded-sm transition-all ${
                  filter === "approved"
                    ? "bg-white border-sage shadow-sm ring-1 ring-sage"
                    : "bg-white/80 border-charcoal/10 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-charcoal/60 mb-1">
                  <span>Approved (Live)</span>
                  <CheckCircle2 size={14} className="text-sage" />
                </div>
                <p className="font-serif text-3xl font-medium text-sage">
                  {counts.approved}
                </p>
              </button>

              <button
                onClick={() => setFilter("rejected")}
                className={`p-5 text-left border rounded-sm transition-all ${
                  filter === "rejected"
                    ? "bg-white border-charcoal/30 shadow-sm ring-1 ring-charcoal/30"
                    : "bg-white/80 border-charcoal/10 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-charcoal/60 mb-1">
                  <span>Rejected</span>
                  <XCircle size={14} className="text-charcoal/40" />
                </div>
                <p className="font-serif text-3xl font-medium text-charcoal/60">
                  {counts.rejected}
                </p>
              </button>

              <button
                onClick={() => setFilter("all")}
                className={`p-5 text-left border rounded-sm transition-all ${
                  filter === "all"
                    ? "bg-white border-lake shadow-sm ring-1 ring-lake"
                    : "bg-white/80 border-charcoal/10 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-charcoal/60 mb-1">
                  <span>Total Submissions</span>
                  <ShieldCheck size={14} className="text-lake" />
                </div>
                <p className="font-serif text-3xl font-medium text-lake">
                  {counts.all}
                </p>
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-lake capitalize">
                  {filter} Reviews ({filteredReviews.length})
                </h2>
              </div>

              {filteredReviews.length === 0 ? (
                <div className="bg-white border border-charcoal/10 p-12 text-center rounded-sm">
                  <p className="text-charcoal/60 text-sm">
                    No reviews in the &ldquo;{filter}&rdquo; queue.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white border border-charcoal/10 p-6 md:p-8 rounded-sm shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          {/* Status Badge */}
                          <span
                            className={`px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider rounded-sm ${
                              rev.status === "approved"
                                ? "bg-sage/15 text-sage border border-sage/30"
                                : rev.status === "rejected"
                                ? "bg-charcoal/10 text-charcoal/60 border border-charcoal/20"
                                : "bg-terra/15 text-terra border border-terra/30"
                            }`}
                          >
                            {rev.status}
                          </span>

                          <div className="flex items-center gap-1 text-terra">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={15}
                                className={
                                  s <= rev.rating
                                    ? "fill-terra text-terra"
                                    : "text-charcoal/15"
                                }
                              />
                            ))}
                            <span className="text-xs font-semibold text-lake ml-1">
                              {rev.rating}.0
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {rev.status !== "approved" && (
                            <button
                              onClick={() => handleModerate(rev.id, "approved")}
                              disabled={actionLoading === rev.id}
                              className="px-3 py-1.5 text-xs font-medium bg-sage text-white hover:bg-[#788376] transition-colors rounded-sm focus-ring flex items-center gap-1"
                            >
                              <CheckCircle2 size={13} />
                              <span>Approve & Publish</span>
                            </button>
                          )}

                          {rev.status !== "rejected" && (
                            <button
                              onClick={() => handleModerate(rev.id, "rejected")}
                              disabled={actionLoading === rev.id}
                              className="px-3 py-1.5 text-xs font-medium bg-charcoal/10 text-charcoal hover:bg-charcoal/20 transition-colors rounded-sm focus-ring flex items-center gap-1"
                            >
                              <XCircle size={13} />
                              <span>Reject</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(rev.id)}
                            disabled={actionLoading === rev.id}
                            className="p-1.5 text-charcoal/40 hover:text-terra transition-colors rounded-sm focus-ring"
                            title="Delete review"
                            aria-label="Delete review"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl text-lake mb-2">
                        {rev.title}
                      </h3>

                      <p className="text-sm text-charcoal/80 whitespace-pre-line leading-relaxed mb-4">
                        {rev.content}
                      </p>

                      {/* Category Breakdown if present */}
                      {rev.categories && Object.keys(rev.categories).length > 0 && (
                        <div className="p-3 bg-sand/15 border border-charcoal/5 rounded-sm mb-4 text-xs flex flex-wrap gap-3">
                          {Object.entries(rev.categories).map(([k, v]) => (
                            <span key={k} className="text-charcoal/70">
                              <strong className="capitalize">{k}:</strong> {v}★
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Guest Details metadata */}
                      <div className="pt-4 border-t border-charcoal/8 grid sm:grid-cols-3 gap-3 text-xs text-charcoal/65">
                        <div className="flex items-center gap-1.5">
                          <User size={13} className="text-sage" />
                          <span className="font-medium text-charcoal">{rev.name}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Mail size={13} className="text-sage" />
                          <span className="font-mono text-charcoal/80">{rev.email}</span>
                          <span className="text-[0.6875rem] text-sage font-medium">(private)</span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:justify-end">
                          <Calendar size={13} className="text-sage" />
                          <span>
                            {new Date(rev.submittedAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
