import Image from "next/image";
import Link from "next/link";
import { fetchEvents } from "@/actions/actions";
import { deleteEvent } from "@/actions/actions";

async function EventsPage() {
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
                  <Link href={`/console/events/edit/${event._id}`}>Edit</Link>
                  {/* <Link
                    href={`/console/events/delete/${event._id}`}
                    className="text-red-400">
                    Delete
                  </Link> */}
                  <form action={deleteEvent}>
                    <input
                      type="hidden"
                      name="id"
                      value={event._id.toString()}
                    />
                    <button type="submit" className="text-red-500 ">
                      Delete
                    </button>
                  </form>
                  <Link href={`/console/events/register/${event._id}`}>
                    Register
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
