import { useEffect, useState } from "react";

function parts(target: number) {
  const d = Math.max(0, target - Date.now());
  return {
    days: Math.floor(d / 864e5),
    hours: Math.floor((d / 36e5) % 24),
    minutes: Math.floor((d / 6e4) % 60),
    seconds: Math.floor((d / 1e3) % 60),
    over: d === 0,
  };
}

export default function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [t, setT] = useState(() => parts(target));
  useEffect(() => {
    const id = setInterval(() => setT(parts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.over) return <p className="font-display font-semibold text-white">The conclave is underway.</p>;
  const cells: [number, string][] = [[t.days, "Days"], [t.hours, "Hours"], [t.minutes, "Minutes"], [t.seconds, "Seconds"]];
  return (
    <div className="grid grid-cols-4 gap-2" aria-label="Countdown to the event" role="timer">
      {cells.map(([n, l]) => (
        <div key={l} className="border border-white/15 px-2 py-3 text-center">
          <div className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-white">{String(n).padStart(2, "0")}</div>
          <div className="mt-1 text-[8.5px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-lavender">{l}</div>
        </div>
      ))}
    </div>
  );
}
