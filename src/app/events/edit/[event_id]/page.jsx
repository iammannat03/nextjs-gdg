import EventForm from "@/components/event_form";

const UpdateEvent = async ({ params }) => {
  const event_id = await params;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/event?id=${event_id.event_id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }

    const event = await response.json();

    return (
      <main className="px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
        <h1 className="text-4xl text-center text-white">Update Event</h1>

        <EventForm event={event} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching event: ", error.message);
    return (
      <main className="px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
        <h1 className="text-4xl text-center text-white">
          Error fetching event details
        </h1>
      </main>
    );
  }
};

export default UpdateEvent;
