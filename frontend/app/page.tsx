import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <p className="brand">HackVillage</p>
      <h1>Trust-as-a-Service for high-impact tech events</h1>
      <p className="lede">
        Prize escrow, Proof of Work profiles, and career pathing — built for the
        African developer ecosystem.
      </p>
      <div className="actions">
        <Link className="btn primary" href="/events">
          Browse public events
        </Link>
        <Link className="btn" href="/developers">
          For developers
        </Link>
        <Link className="btn" href="/organizers">
          For organizers
        </Link>
      </div>
      <div className="actions" style={{ marginTop: "0.75rem" }}>
        <Link className="btn" href="/about">
          About HackVillage
        </Link>
        <Link className="btn" href="/offline">
          Offline fallback
        </Link>
      </div>
    </main>
  );
}
