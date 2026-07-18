import Link from "next/link";

interface EventDetailPageProps {
  params: { slug: string };
}

async function getEvent(slug: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/events/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const event = await getEvent(params.slug);

  if (!event) {
    return (
      <main className="shell">
        <p className="brand">HackVillage</p>
        <h1>Event not found</h1>
        <p className="lede">The event you are looking for is not public yet.</p>
        <Link className="btn" href="/events">
          Back to events
        </Link>
      </main>
    );
  }

  return (
    <main className="shell">
      <p className="brand">HackVillage</p>
      <h1>{event.title}</h1>
      <p className="lede">{event.problemStatement}</p>
      <div className="actions">
        <span className="btn">{event.status}</span>
        <span className="btn">Prize: KES {event.prizePoolKes.toLocaleString()}</span>
      </div>
      <p>
        <strong>Starts:</strong> {event.startsAt ? new Date(event.startsAt).toLocaleString() : "TBD"}
      </p>
      <p>
        <strong>Ends:</strong> {event.endsAt ? new Date(event.endsAt).toLocaleString() : "TBD"}
      </p>
      <Link className="btn" href="/events">
        Back to events
      </Link>
    </main>
  );
}
