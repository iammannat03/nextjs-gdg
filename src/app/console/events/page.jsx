import Image from "next/image";
import Link from "next/link";
import { MongoClient } from "mongodb";

// SSF

async function fetchEvents() {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    const eventsCollection = db.collection("events");

    const events = await eventsCollection.find({}).toArray();
    client.close();
    return events.map((event) => ({
      ...event,
      _id: event._id.toString(), // Converting ObjectId to string for React compatibility
    }));
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
        <div className="flex justify-center p-10 ">
          <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <li
                key={event._id}
                className="p-5 space-y-2 border border-gray-200 rounded">
                <h2>{event.title}</h2>
                <p>{event.venue}</p>
                <div className="flex justify-between">
                  <p>{new Date(event.start_date).toLocaleDateString()}</p>
                  <p>{new Date(event.end_date).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between">
                  <p>{event.start_time}</p>
                  <p>{event.end_time}</p>
                </div>
                <Image
                  src={event.image}
                  alt={event.title}
                  width={200}
                  height={200}
                />
                <p>{event.desc}</p>
                <div className="flex justify-between">
                  <Link href={`/events/edit/${event._id}`}>Edit</Link>

                  <Link
                    href={`/events/delete/${event._id}`}
                    className="text-red-400">
                    Delete
                  </Link>
                  <Link href={`/events/register/${event._id}`}>Register</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
