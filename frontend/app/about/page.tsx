import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="shell">
      <p className="brand">HackVillage</p>
      <h1>About the platform</h1>
      <p className="lede">
        HackVillage turns hackathons into trusted, transparent, and career-relevant experiences through escrow, proof of work, and structured outcomes.
      </p>
      <div className="actions">
        <Link className="btn primary" href="/events">
          Explore events
        </Link>
        <Link className="btn" href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
