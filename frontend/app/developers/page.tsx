import Link from "next/link";

export const metadata = {
  title: "Developers",
};

export default function DevelopersPage() {
  return (
    <main className="shell">
      <p className="brand">HackVillage</p>
      <h1>For developers</h1>
      <p className="lede">
        Build in public, earn verified proof of work, and turn great hackathon outcomes into internships, referrals, and portfolio momentum.
      </p>
      <div className="actions">
        <Link className="btn primary" href="/events">
          Browse events
        </Link>
        <Link className="btn" href="/">
          Back home
        </Link>
      </div>
      <div className="card-list" style={{ marginTop: "1.5rem", display: "grid", gap: "0.9rem" }}>
        <article className="card" style={{ border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Verified proof of work</h2>
          <p>Every event contribution becomes part of a portable developer profile with wins, feedback, and public evidence.</p>
        </article>
        <article className="card" style={{ border: "1px solid var(--line)", borderRadius: "0.75rem", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Career pathing</h2>
          <p>Use event outcomes to unlock internships and staking-style reputation signals that hiring partners can trust.</p>
        </article>
      </div>
    </main>
  );
}
