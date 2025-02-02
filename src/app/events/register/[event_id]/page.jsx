import RegForm from "./register_form";

const Register = async ({ params }) => {
  const { event_id } = await params;

  const fetchEvent = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/event?id=${event_id}`
    );
    const data = await res.json();
    return data.title;
  };

  return (
    <main className="px-12 py-5 mt-24 md:py-12 md:px-24 lg:px-72">
      <h1 className="text-4xl text-center text-white">
        Register for {fetchEvent()}
      </h1>
      <RegForm />
    </main>
  );
};

export default Register;
