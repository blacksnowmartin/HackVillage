import Link from "next/link";

export const metadata = {
  title: "Events",
};

async function getEvents() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/events?page=1&limit=6`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return { events: [] as Array<{ slug: string; title: string; problemStatement: string; status: string; prizePoolKes: number }> };
  }

  return response.json();
}

export default async function EventsPage() {
  const payload = await getEvents();

  return (
    <main className="shell">
      <p className="brand">HackVillage</p>
      <h1>Public events</h1>
      <p className="lede">
        Drafts stay private. Prize-verified and live events are listed here for public discovery.
      </p>
      <div className="actions">
        <Link className="btn" href="/">
          Back home
        </Link>
      </div>
      <div className="card-list">
        {payload.events.length === 0 ? (
          <p>No public events are available yet.</p>
        ) : (
          payload.events.map((event: { slug: string; title: string; problemStatement: string; status: string; prizePoolKes: number }) => (
            <article key={event.slug} className="card">
              <h2>{event.title}</h2>
              <p>{event.problemStatement}</p>
              <p>
                <strong>Status:</strong> {event.status}
              </p>
              <p>
                <strong>Prize:</strong> KES {event.prizePoolKes.toLocaleString()}
              </p>
              <Link className="btn" href={`/events/${event.slug}`}>
                View details
              </Link>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
