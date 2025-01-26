import EventForm from '../../event_form'

const UpdateEvent = async () => {

    // TODO: Get event details
    const event = {
        id: 1,
        title: 'Test Event',
        venue: 'Test Venue',
        start_date: new Date(),
        end_date: new Date(),
        desc: 'Test Description',
        image: 'https://res.cloudinary.com/startup-grind/image/upload/dpr_2.0,fl_sanitize/v1/gcs/platform-data-goog/contentbuilder/logo_dark_QmPdj9K.svg'
    }

    return (
        <main className='mt-24 py-5 md:py-12 px-12 md:px-24 lg:px-72'>
            <h1 className="text-4xl text-white text-center">Update Event</h1>

            <EventForm event={event} />
        </main>
    )
}

export default UpdateEvent