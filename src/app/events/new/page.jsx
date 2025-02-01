import EventForm from "@/components/event_form";

const NewEvent = () => {
  return (
    <main className="px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
      <h1 className="text-4xl text-center text-white">Create Event</h1>

      <EventForm />
    </main>
  );
};

export default NewEvent;
