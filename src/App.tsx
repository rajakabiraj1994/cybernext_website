import { useEffect, useState } from "react";
import { EVENT, EXTERNAL_REGISTRATION_URL, CONTACTS, SPEAKERS, ANNOUNCEMENT } from "./config";
import Countdown from "./components/Countdown";
import Register from "./components/Register";

const REGISTER_HREF = EXTERNAL_REGISTRATION_URL || "#register";
const REGISTER_PROPS = EXTERNAL_REGISTRATION_URL ? { target: "_blank", rel: "noopener" } : {};

const NAV = [
  ["About", "#about"],
  ["Themes", "#themes"],
  ["Audience", "#audience"],
  ["Speakers", "#speakers"],
];

const NARRATIVE = ["Compliance", "Privacy", "Security", "Cyber Resilience", "Digital Trust"];

const THEMES = [
  ["Cybersecurity and emerging threats", "How the threat landscape is shifting, and what it now demands of leadership."],
  ["Data privacy and regulatory preparedness", "Moving from policy on paper to privacy that works in practice."],
  ["Cyber resilience and incident readiness", "Preparing people, process and technology for the day something breaks."],
  ["Digital risk and business continuity", "Treating cyber risk as business risk, owned in the boardroom."],
  ["Building trust in a connected ecosystem", "Earning and keeping trust across partners, customers and supply chains."],
];

const AUDIENCE = [
  "CEOs and Managing Directors",
  "CIOs, CTOs and CISOs",
  "Information Security Heads",
  "Data Protection and Privacy Leaders",
  "Risk and Compliance Leaders",
  "IT and Digital Transformation Heads",
  "Legal and General Counsel",
  "Selected ecosystem leaders",
];

function Logo({ src, alt, h, blend = true }: { src: string; alt: string; h: string; blend?: boolean }) {
  return <img src={src} alt={alt} className={`${h} w-auto ${blend ? "logo-blend" : ""}`} />;
}

function Header({ offset = false }: { offset?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 ${offset ? "top-9" : "top-0"} z-40 bg-cloud transition-shadow ${scrolled || open ? "border-b border-rule shadow-[0_1px_12px_rgba(0,30,61,.06)]" : ""}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-18 flex items-center justify-between gap-6">
        <a href="#top" aria-label="CYBERNEXT 2026 home"><Logo src="/img/cybernext-logo.png" alt="CYBERNEXT 2026" h="h-5 sm:h-6" /></a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-violet-ink transition-colors">{l}</a>)}
          <a href={REGISTER_HREF} {...REGISTER_PROPS} className="btn-primary !h-10 !px-6 !text-[12px]">Request invite</a>
        </nav>
        <button className="md:hidden p-2 -mr-2" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-rule px-5 pb-6 pt-2 flex flex-col">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 border-b border-rule font-medium">{l}</a>)}
          <a href={REGISTER_HREF} {...REGISTER_PROPS} onClick={() => setOpen(false)} className="btn-primary mt-5">Request invite</a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* violet diagonal bands from the CYBERNEXT theme */}
      <svg aria-hidden className="absolute right-0 top-0 h-[520px] w-[520px] max-w-[70vw]" viewBox="0 0 520 520" preserveAspectRatio="xMaxYMin meet">
        <polygon points="300,0 380,0 520,165 520,260" fill="#7564F4" opacity=".9" />
        <polygon points="200,0 250,0 520,320 520,380" fill="#E6E3FD" />
      </svg>
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end gap-x-10 gap-y-6">
          <div>
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-steel">Presented by</p>
            <div className="mt-3 flex items-center gap-5">
              <Logo src="/img/int.png" alt="Indus Net Technologies" h="h-12 sm:h-14" blend={false} />
              <span className="h-10 w-px bg-rule" />
              <Logo src="/img/prime-infoserv.png" alt="Prime Infoserv" h="h-11 sm:h-13" />
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20 grid lg:grid-cols-[1.35fr_1fr] gap-12 items-center">
          <div>
            <h1><Logo src="/img/cybernext-logo.png" alt="CYBERNEXT 2026" h="h-auto w-full max-w-[640px]" /></h1>
            <div className="mt-9 flex items-center gap-5">
              <span className="h-[3px] w-11 bg-violet" />
              <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight">{EVENT.theme}</p>
            </div>
            <p className="mt-3 sm:ml-16 text-violet-ink font-medium tracking-wide">{EVENT.pillars.join("  •  ")}</p>
            <p className="mt-6 sm:ml-16 font-display text-[11px] font-semibold uppercase tracking-[0.2em] text-steel">{EVENT.campaign}</p>
            <div className="mt-10 sm:ml-16 flex flex-wrap gap-4">
              <a href={REGISTER_HREF} {...REGISTER_PROPS} className="btn-primary">Request an invitation →</a>
              <a href="#about" className="btn-ghost">About the conclave</a>
            </div>
            <div className="mt-8 sm:ml-16 flex items-center gap-3">
              <span className="font-display text-[9.5px] font-semibold uppercase tracking-[0.22em] text-steel">In association with</span>
              <img src="/img/pta.jpg" alt="Philanthropic Technical Association" className="h-6 w-auto" />
            </div>
          </div>

          <aside className="relative z-10 bg-midnight text-white p-7 sm:p-9 [clip-path:polygon(0_0,calc(100%-44px)_0,100%_44px,100%_100%,0_100%)]">
            {[["Date", EVENT.dateLabel], ["Time", EVENT.timeLabel], ["Venue", `${EVENT.venue}, ${EVENT.city}`]].map(([k, v], i) => (
              <div key={k} className={`py-4 ${i ? "border-t border-white/15" : ""}`}>
                <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-lavender">{k}</p>
                <p className={`mt-1 font-display font-bold ${i ? "text-xl" : "text-3xl"} tracking-tight`}>{v}</p>
              </div>
            ))}
            <div className="border-t border-white/15 pt-5">
              <Countdown to={EVENT.startsAt} />
            </div>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-lavender"><span className="slash !bg-lavender" />{EVENT.format}</p>
          </aside>
        </div>
      </div>
      <img src="/img/kolkata-skyline.jpg" alt="Kolkata riverfront with Victoria Memorial and Howrah Bridge"
        className="mt-10 lg:-mt-6 block w-full h-44 sm:h-60 object-cover object-[60%_100%] [mask-image:linear-gradient(to_bottom,transparent,#000_45%)]" />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28 grid lg:grid-cols-[1.4fr_1fr] gap-12">
        <div>
          <span className="eyebrow">An annual leadership platform</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">Beyond compliance, towards digital trust.</h2>
          <p className="mt-7 text-lg leading-relaxed text-midnight/85">
            CYBERNEXT is an invitation-only annual cybersecurity conclave designed to bring senior technology, cybersecurity and business
            leaders together for focused conversations on privacy, security, resilience and digital trust.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-midnight/85">
            Organised in celebration of Cybersecurity Awareness Month 2026, the inaugural edition will bring together more than 75 renowned
            CXOs, CIOs, CISOs, technology leaders and key decision-makers from diverse industries.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-rule self-start border border-rule">
          {[[EVENT.audience, "Senior leaders"], ["4 hrs", "Curated evening"], ["1", "Invitation-only room"], ["2026", "Inaugural edition"]].map(([n, l]) => (
            <div key={l} className="bg-cloud p-6 sm:p-8">
              <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-violet-ink">{n}</p>
              <p className="mt-2 text-sm text-steel">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pb-20 sm:pb-28">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-ink">The 2026 narrative</p>
        <ol className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-0">
          {NARRATIVE.map((n, i) => {
            const bg = ["#F7F9FC", "#E6E3FD", "#B9B0FF", "#7564F4", "#001E3D"][i];
            const fg = i > 2 ? "text-white" : "text-midnight";
            return (
              <li key={n} style={{ background: bg }}
                className={`${fg} font-display font-semibold h-14 flex items-center justify-center text-center px-6 sm:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%,22px_50%)] ${i === 0 ? "sm:[clip-path:polygon(0_0,calc(100%-22px)_0,100%_50%,calc(100%-22px)_100%,0_100%)]" : "sm:-ml-3"}`}>
                {n}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Themes() {
  return (
    <section id="themes" className="bg-cloud">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <span className="eyebrow">Key discussion areas</span>
        <h2 className="mt-5 max-w-2xl font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">Five conversations shaping the year ahead.</h2>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEMES.map(([t, d], i) => (
            <article key={t} className="bg-white border border-rule p-7 transition hover:border-violet/60 hover:-translate-y-0.5">
              <p className="font-display text-sm font-bold text-violet-ink flex items-center gap-3"><span className="slash" />{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-5 font-display text-xl font-bold leading-snug">{t}</h3>
              <p className="mt-3 text-steel leading-relaxed">{d}</p>
            </article>
          ))}
          <article className="bg-midnight text-white p-7 flex flex-col justify-between [clip-path:polygon(0_0,calc(100%-36px)_0,100%_36px,100%_100%,0_100%)]">
            <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-lavender">One evening</p>
            <p className="mt-6 font-display text-xl font-semibold leading-snug">More than 75 leaders. Focused conversations. One invitation-only room.</p>
            <a href={REGISTER_HREF} {...REGISTER_PROPS} className="mt-6 inline-flex items-center gap-2 font-display font-semibold text-lavender hover:text-white">Request an invitation →</a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section id="audience" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28 grid lg:grid-cols-[1fr_1.3fr] gap-12">
        <div>
          <span className="eyebrow">Who's in the room</span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">Curated for the people who decide.</h2>
          <p className="mt-6 text-lg text-steel leading-relaxed">
            CYBERNEXT brings together the leaders responsible for cybersecurity, privacy, governance, risk, compliance and digital transformation.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 gap-x-8">
          {AUDIENCE.map((a) => (
            <li key={a} className="flex items-center gap-4 py-4 border-b border-rule font-medium"><span className="slash" />{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Speakers() {
  return (
    <section id="speakers" className="relative overflow-hidden bg-midnight text-white">
      <svg aria-hidden className="absolute right-0 top-0 h-64 opacity-90" viewBox="0 0 300 260" preserveAspectRatio="xMaxYMin meet">
        <polygon points="140,0 200,0 300,110 300,176" fill="#7564F4" opacity=".45" />
      </svg>
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <span className="eyebrow on-dark">Speakers</span>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05] max-w-xl">
            {SPEAKERS.length ? "Voices at CYBERNEXT 2026." : "Speakers to be announced soon."}
          </h2>
          <p className="max-w-sm text-white/75 leading-relaxed">
            {SPEAKERS.length ? "Leaders sharing their perspective on security, privacy, resilience and digital trust." : "We're curating a line-up of leaders from across industries. Check back here for the first announcements."}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(SPEAKERS.length ? SPEAKERS : [null, null, null, null]).map((s, i) => (
            <div key={s ? s.name : i} className="relative bg-midnight border border-white/15 p-5">
              <div className="aspect-[4/5] bg-white/[0.04] border border-dashed border-white/20 flex items-center justify-center overflow-hidden">
                {s?.photo ? (
                  <img src={s.photo} alt={s.name} loading="lazy" className="h-full w-full object-cover" />
                ) : (
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#B9B0FF" strokeWidth="1.6" aria-hidden><circle cx="28" cy="21" r="10" /><path d="M9 50c3-10 10-15 19-15s16 5 19 15" /></svg>
                )}
              </div>
              <p className="mt-4 font-display font-semibold">{s ? s.name : "Coming soon"}</p>
              <p className="text-sm text-white/70">{s ? s.designation : "Speaker announcement"}</p>
              {s?.organisation && <p className="text-sm text-lavender">{s.organisation}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-cloud border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid md:grid-cols-[1.2fr_1fr_1fr] gap-12">
        <div>
          <Logo src="/img/cybernext-logo.png" alt="CYBERNEXT 2026" h="h-6" />
          <p className="mt-5 text-sm text-steel leading-relaxed max-w-xs">{EVENT.dateLabel} · {EVENT.timeLabel}<br />{EVENT.venue}, {EVENT.city} · {EVENT.format}</p>
        </div>
        <div>
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-steel">Presented by</p>
          <div className="mt-4 flex items-center gap-5">
            <Logo src="/img/int.png" alt="Indus Net Technologies" h="h-11" blend={false} />
            <span className="h-9 w-px bg-rule" />
            <Logo src="/img/prime-infoserv.png" alt="Prime Infoserv" h="h-10" />
          </div>
          <p className="mt-6 font-display text-[9.5px] font-semibold uppercase tracking-[0.22em] text-steel">In association with</p>
          <img src="/img/pta.jpg" alt="Philanthropic Technical Association" className="mt-3 h-7 w-auto" />
        </div>
        <div>
          <p className="font-display text-[10px] font-semibold uppercase tracking-[0.24em] text-steel">Contact</p>
          <ul className="mt-4 space-y-4 text-sm">
            {CONTACTS.map((c) => (
              <li key={c.email}>
                <p className="font-display font-semibold">{c.name}</p>
                <a className="block text-steel hover:text-violet-ink" href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</a>
                <a className="block text-steel hover:text-violet-ink" href={`mailto:${c.email}`}>{c.email}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <p className="mx-auto max-w-6xl px-5 sm:px-8 py-6 text-xs text-steel">© 2026 Indus Net Technologies &amp; Prime Infoserv. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 bg-white px-4 py-2">Skip to content</a>
      {ANNOUNCEMENT.show && ANNOUNCEMENT.text && (
        <div className="fixed inset-x-0 top-0 z-50 h-9 bg-midnight text-white text-[13px] flex items-center justify-center gap-3 px-4 text-center">
          <span className="slash !bg-lavender" />
          <span className="truncate">{ANNOUNCEMENT.text}</span>
          {ANNOUNCEMENT.link && (
            <a href={ANNOUNCEMENT.link} className="font-display font-semibold text-lavender hover:text-white whitespace-nowrap">{ANNOUNCEMENT.linkText || "Learn more"} →</a>
          )}
        </div>
      )}
      <Header offset={ANNOUNCEMENT.show && !!ANNOUNCEMENT.text} />
      <main>
        <Hero />
        <About />
        <Themes />
        <Audience />
        <Speakers />
        <Register />
      </main>
      <Footer />
    </>
  );
}
