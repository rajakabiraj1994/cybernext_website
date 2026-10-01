import { useState, type FormEvent } from "react";
import { EVENT, REGISTRATION_ENDPOINT, EXTERNAL_REGISTRATION_URL, CONTACTS } from "../config";

type Status = "idle" | "sending" | "done" | "error" | "notice";

const INDUSTRIES = [
  "Banking & Financial Services", "Insurance", "Manufacturing", "Healthcare & Pharma", "IT & ITeS",
  "Energy & Utilities", "Government & PSU", "Retail & Consumer", "Education", "Telecom & Media", "Other",
];

export default function Register() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, consent: data.consent === "on", submittedAt: new Date().toISOString() };

    if (!REGISTRATION_ENDPOINT) {
      setStatus("notice");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(REGISTRATION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus("done");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <section id="register" className="relative bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28 grid lg:grid-cols-[1fr_1.25fr] gap-12 lg:gap-16">
        <div>
          <span className="eyebrow">Request an invitation</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
            Join the room where security leaders meet.
          </h2>
          <p className="mt-6 text-steel text-lg leading-relaxed max-w-md">
            CYBERNEXT is {EVENT.format.toLowerCase()}. Share your details and our team will confirm your participation.
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 max-w-md">
            {[["Date", EVENT.dateLabel], ["Time", EVENT.timeLabel], ["Venue", `${EVENT.venue}, ${EVENT.city}`], ["Format", EVENT.format]].map(([k, v]) => (
              <div key={k} className="border-t border-rule pt-3">
                <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-ink">{k}</dt>
                <dd className="mt-1 font-display font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="bg-cloud border border-rule p-6 sm:p-10">
          {EXTERNAL_REGISTRATION_URL ? (
            <div className="h-full grid sm:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <h3 className="font-display text-2xl font-bold">Request your invitation</h3>
                <p className="mt-3 text-steel leading-relaxed">The registration form takes about a minute. Our team will confirm your participation by email.</p>
                <a className="btn-primary mt-7" href={EXTERNAL_REGISTRATION_URL} target="_blank" rel="noopener">Register now →</a>
                <p className="mt-5 text-sm text-steel">Short link: <a className="font-medium text-violet-ink underline-offset-4 hover:underline" href="/register">cybernext.co.in/register</a></p>
              </div>
              <figure className="justify-self-center text-center">
                <img src="/img/register-qr.png" alt="QR code for the CYBERNEXT 2026 registration form" className="w-44 h-44 sm:w-48 sm:h-48 bg-white p-2 border border-rule" />
                <figcaption className="mt-3 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-steel">Scan on your phone</figcaption>
              </figure>
            </div>
          ) : status === "done" ? (
            <Message title="Thank you." body="Your request has been received. Our team will be in touch to confirm your invitation." />
          ) : status === "notice" ? (
            <Message
              title="Registrations open shortly."
              body={`Online registration is being set up. In the meantime, please reach ${CONTACTS.map((c) => c.name).join(" or ")} to request your invitation.`}
              onBack={() => setStatus("idle")}
            />
          ) : (
            <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5" noValidate={false}>
              <Field label="Full name" name="fullName" autoComplete="name" required />
              <Field label="Designation" name="designation" autoComplete="organization-title" required />
              <Field label="Organisation" name="organisation" autoComplete="organization" required full />
              <Field label="Work email" name="email" type="email" autoComplete="email" required />
              <Field label="Mobile number" name="phone" type="tel" autoComplete="tel" pattern="\+?[0-9 ]{8,}" title="Digits only, e.g. +91 98300 00000" required />
              <label className="sm:col-span-2 block">
                <span className="block mb-2 text-sm font-medium">Industry</span>
                <select name="industry" className="field appearance-none" required defaultValue="">
                  <option value="" disabled>Select your industry</option>
                  {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
                </select>
              </label>
              <label className="sm:col-span-2 flex gap-3 items-start text-sm text-steel leading-relaxed">
                <input type="checkbox" name="consent" required className="mt-1 size-4 accent-violet-ink" />
                I agree to be contacted by Indus Net Technologies and Prime Infoserv about CYBERNEXT 2026. My details will be used only for this event.
              </label>
              <div className="sm:col-span-2 flex flex-wrap items-center gap-5 pt-2">
                <button type="submit" className="btn-primary" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Request invitation"}
                </button>
                {status === "error" && <p role="alert" className="text-sm text-[#c2334a]">Could not submit ({error}). Please try again.</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, full, ...rest }: { label: string; full?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block mb-2 text-sm font-medium">{label}</span>
      <input className="field" {...rest} />
    </label>
  );
}

function Message({ title, body, onBack }: { title: string; body: string; onBack?: () => void }) {
  return (
    <div role="status" className="h-full flex flex-col justify-center gap-4 min-h-72">
      <span className="slash !w-3 !h-6" />
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <p className="text-steel leading-relaxed max-w-md">{body}</p>
      {onBack && <button onClick={onBack} className="btn-ghost self-start mt-2">Back to form</button>}
    </div>
  );
}
