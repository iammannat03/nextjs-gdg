import { redirect } from "next/navigation";

const DeleteEvent = async ({ params }) => {
  const event_id = await params;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/event?id=${event_id.event_id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    const event = await response.json();

    async function handleDelete(formData) {
      "use server";
      const id = formData.get("eventId");
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + `/events?id=${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          redirect("/events");
        } else {
          throw new Error("Failed to delete the event");
        }
      } catch (err) {
        console.error("Error during delete operation: ", err.message);
      }
    }

    return (
      <main className="flex justify-center gap-4 px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
        <h1 className="text-4xl text-center text-white">
          Delete Event {event.title}
        </h1>
        <form action={handleDelete}>
          <input type="hidden" name="eventId" value={event._id} />
          <button
            type="submit"
            className="px-2 py-1 text-2xl text-white bg-red-500 rounded-xl">
            Confirm
          </button>
        </form>
      </main>
    );
  } catch (error) {
    console.error("Error fetching event: ", error.message);
    return (
      <main className="flex justify-center gap-4 px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
        <h1 className="text-4xl text-center text-white">
          Error fetching event details
        </h1>
      </main>
    );
  }
};

export default DeleteEvent;
