"use client";

import { useState } from "react";
import { rooms } from "@/content/rooms";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormState = {
  checkIn: string;
  checkOut: string;
  guests: string;
  roomPreference: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
};

const initial: FormState = {
  checkIn: "",
  checkOut: "",
  guests: "2",
  roomPreference: "",
  name: "",
  email: "",
  phone: "",
  specialRequests: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!form.checkIn) next.checkIn = "Please select a check-in date.";
    if (!form.checkOut) next.checkOut = "Please select a check-out date.";
    if (
      form.checkIn &&
      form.checkOut &&
      new Date(form.checkOut) <= new Date(form.checkIn)
    ) {
      next.checkOut = "Check-out must be after check-in.";
    }
    if (!form.guests || Number(form.guests) < 1) {
      next.guests = "Enter number of guests.";
    }
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.phone.trim()) next.phone = "Please enter a phone or WhatsApp number.";
    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setMessage(data.message);
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Unable to send enquiry. Please try again or call the hotel.",
      );
    }
  }

  const field =
    "w-full bg-white border border-charcoal/15 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-terra focus:outline-none focus:ring-1 focus:ring-terra/40 rounded-sm transition-colors";

  if (status === "success") {
    return (
      <div
        className="bg-white border border-sage/30 p-8 md:p-10 text-center"
        role="status"
      >
        <p className="label-caps text-sage mb-3">Request received</p>
        <h3 className="font-serif text-3xl text-lake">Thank you</h3>
        <p className="mt-4 text-charcoal/70 leading-relaxed max-w-md mx-auto">
          {message || site.booking.note}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "bg-white border border-charcoal/10",
        compact ? "p-5 md:p-6" : "p-6 md:p-10",
      )}
    >
      {!compact ? (
        <div className="mb-8">
          <p className="label-caps text-sage mb-2">Reservation enquiry</p>
          <h3 className="font-serif text-2xl md:text-3xl text-lake">
            Request your stay
          </h3>
          <p className="mt-3 text-sm text-charcoal/65 leading-relaxed">
            {site.booking.note}
          </p>
        </div>
      ) : (
        <p className="label-caps text-sage mb-5">Quick enquiry</p>
      )}

      <div
        className={cn(
          "grid gap-4",
          compact ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2",
        )}
      >
        <Field label="Check-in" error={errors.checkIn} htmlFor="checkIn">
          <input
            id="checkIn"
            type="date"
            className={field}
            value={form.checkIn}
            onChange={(e) => update("checkIn", e.target.value)}
            required
          />
        </Field>
        <Field label="Check-out" error={errors.checkOut} htmlFor="checkOut">
          <input
            id="checkOut"
            type="date"
            className={field}
            value={form.checkOut}
            onChange={(e) => update("checkOut", e.target.value)}
            required
          />
        </Field>
        <Field label="Guests" error={errors.guests} htmlFor="guests">
          <input
            id="guests"
            type="number"
            min={1}
            max={12}
            className={field}
            value={form.guests}
            onChange={(e) => update("guests", e.target.value)}
            required
          />
        </Field>
        <Field
          label="Room preference"
          error={errors.roomPreference}
          htmlFor="roomPreference"
        >
          <select
            id="roomPreference"
            className={field}
            value={form.roomPreference}
            onChange={(e) => update("roomPreference", e.target.value)}
          >
            <option value="">No preference</option>
            {rooms.map((r) => (
              <option key={r.slug} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </Field>

        {!compact ? (
          <>
            <Field label="Full name" error={errors.name} htmlFor="name">
              <input
                id="name"
                type="text"
                autoComplete="name"
                className={field}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </Field>
            <Field label="Email" error={errors.email} htmlFor="email">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={field}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </Field>
            <Field
              label="Phone / WhatsApp"
              error={errors.phone}
              htmlFor="phone"
              className="md:col-span-2"
            >
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className={field}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                required
              />
            </Field>
            <Field
              label="Special requests"
              error={errors.specialRequests}
              htmlFor="specialRequests"
              className="md:col-span-2"
            >
              <textarea
                id="specialRequests"
                rows={4}
                className={cn(field, "resize-y min-h-[6rem]")}
                value={form.specialRequests}
                onChange={(e) => update("specialRequests", e.target.value)}
                placeholder="Arrival time, accessibility needs, celebrations…"
              />
            </Field>
          </>
        ) : null}
      </div>

      {compact ? (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Field label="Name" error={errors.name} htmlFor="c-name">
            <input
              id="c-name"
              type="text"
              className={field}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </Field>
          <Field label="Email" error={errors.email} htmlFor="c-email">
            <input
              id="c-email"
              type="email"
              className={field}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </Field>
          <Field label="Phone" error={errors.phone} htmlFor="c-phone">
            <input
              id="c-phone"
              type="tel"
              className={field}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              required
            />
          </Field>
        </div>
      ) : null}

      {status === "error" ? (
        <p className="mt-4 text-sm text-terra" role="alert">
          {message}
        </p>
      ) : null}

      <div className={cn("mt-6", compact && "flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between")}>
        <Button type="submit" disabled={status === "loading"} className="min-w-[12rem]">
          {status === "loading" ? "Sending…" : "Send enquiry"}
        </Button>
        {compact ? (
          <p className="text-xs text-charcoal/50 max-w-xs">
            Awaiting confirmation — not an instant booking.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="block text-xs font-medium text-charcoal/70 mb-1.5">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs text-terra" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
