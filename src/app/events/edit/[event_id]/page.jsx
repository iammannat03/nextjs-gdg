import EventForm from "@/components/event_form";

const UpdateEvent = async ({ params }) => {
  // TODO: Get event details
  const event_id = await params; // If params is a promise
  console.log(event_id.event_id); // Access the event_id after awaiting

  // try {
  const response = await fetch(
    `http://localhost:3000/api/getEvent?id=${event_id.event_id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }
  // } catch (error) {
  //   console.error(error);
  // }

  const event = await response.json();
  console.log(event);

  return (
    <main className="px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
      <h1 className="text-4xl text-center text-white">Update Event</h1>

      <EventForm event={event} />
    </main>
  );
};

export default UpdateEvent;
