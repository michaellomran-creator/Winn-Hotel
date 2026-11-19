"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const preferred = String(fd.get("preferredDate") || "");
    const today = new Date().toISOString().slice(0, 10);
    const checkIn = preferred || today;
    const checkOutDate = new Date(checkIn);
    checkOutDate.setDate(checkOutDate.getDate() + 1);
    const checkOut = checkOutDate.toISOString().slice(0, 10);

    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkIn,
          checkOut,
          guests: "1",
          roomPreference: "General enquiry",
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          specialRequests: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  const field =
    "w-full bg-white border border-charcoal/15 px-4 py-3 text-sm focus:border-terra focus:outline-none focus:ring-1 focus:ring-terra/40 rounded-sm";

  if (status === "success") {
    return (
      <div className="bg-white border border-sage/30 p-10 text-center" role="status">
        <h2 className="font-serif text-3xl text-lake">Message sent</h2>
        <p className="mt-3 text-charcoal/65">
          Thank you. Our team will respond as soon as possible.
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-charcoal/10 p-6 md:p-10 space-y-4"
    >
      <h2 className="font-serif text-3xl text-lake mb-2">Send a message</h2>
      <div>
        <label htmlFor="name" className="text-xs text-charcoal/70 block mb-1.5">
          Name
        </label>
        <input id="name" name="name" required className={field} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="text-xs text-charcoal/70 block mb-1.5">
            Email
          </label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
        <div>
          <label htmlFor="phone" className="text-xs text-charcoal/70 block mb-1.5">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={field} />
        </div>
      </div>
      <div>
        <label
          htmlFor="preferredDate"
          className="text-xs text-charcoal/70 block mb-1.5"
        >
          Preferred date (optional)
        </label>
        <input id="preferredDate" name="preferredDate" type="date" className={field} />
      </div>
      <div>
        <label htmlFor="message" className="text-xs text-charcoal/70 block mb-1.5">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={field} />
      </div>
      {status === "error" ? (
        <p className="text-sm text-terra" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
