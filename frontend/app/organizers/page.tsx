import Link from "next/link";

export const metadata = {
  title: "Organizers",
};

export default function OrganizersPage() {
  return (
    <main className="shell">
      <p className="brand">HackVillage</p>
      <h1>For organizers</h1>
      <p className="lede">
        Run better events with escrow-backed prize security, structured judging, and public evidence of outcomes for every cohort.
      </p>
      <div className="actions">
        <Link className="btn primary" href="/events">
          See public events
        </Link>
        <Link className="btn" href="/">
          Back home
        </Link>
      </div>
      <div className="card-list" style={{ marginTop: "1.5rem", display: "grid", gap: "0.9rem" }}>
        <article className="card" style={{ border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Prize verified events</h2>
          <p>Use escrow-backed prize pools so attendees only see events that have the trust guarantees behind them.</p>
        </article>
        <article className="card" style={{ border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Structured outcomes</h2>
          <p>Turn every event into reusable evidence for sponsors, judges, and future participants.</p>
        </article>
      </div>
    </main>
  );
}
