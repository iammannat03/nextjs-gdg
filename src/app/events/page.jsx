import Image from "next/image";
import Link from "next/link";
import { MongoClient } from "mongodb";

async function fetchEvents() {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    const eventsCollection = db.collection("events");

    const events = await eventsCollection.find({}).toArray();
    client.close();
    return JSON.parse(JSON.stringify(events));
  } catch (err) {
    throw new Error("Failed to fetch events from the database");
  }
}

export default async function EventsPage() {
  let events = [];
  let error = null;

  try {
    events = await fetchEvents();
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="flex justify-center">
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <li key={event._id}>
                <h2>{event.title}</h2>
                <p>{event.venue}</p>
                <p>{new Date(event.start_date).toLocaleDateString()}</p>
                <p>{new Date(event.end_date).toLocaleDateString()}</p>
                <p>{event.start_time}</p>
                <p>{event.end_time}</p>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={200}
                  height={200}
                />
                <p>{event.desc}</p>
                <div className="flex justify-between">
                  <Link href={`/events/edit/${event._id}/`}>Edit</Link>
                  <button>Register</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
