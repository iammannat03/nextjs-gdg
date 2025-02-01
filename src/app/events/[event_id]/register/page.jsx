import RegForm from './register_form'

const Register = () => {
    return (
        <main className='mx-auto xl:max-w-[80vw] mt-24 py-5 md:py-12 px-12 md:px-24 lg:px-72'>
            <h1 className="text-4xl text-white text-center">Create Event</h1>
            <RegForm />
        </main>
    )
}

export default Register