'use client'

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    event_id: z.string().optional(),
    title: z.string(),
    venue: z.string(),
    start_date: z.date().min(new Date()),
    end_date: z.date().min(new Date()),
    desc: z.string(),
    image: z.any()
})

import { Form } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import { Button } from "../../components/ui/button"
import Field from "../../components/field_input"
import DatePicker from '../../components/datepicker_field'

const EventForm = (props) => {
    const form = useForm({
        resolver: zodResolver(formSchema), defaultValues: props.event ?? null
    })
    const [image, setImage] = useState(props.event?.image)

    const onSubmit = (values) => {
        // TODO: Upload image to cloudinary and insert values in db
        console.log(values)
    }

    useEffect(() => {
        form.setValue(fields.image.name, image)
    }, [image])

    return (
        <Form {...form}>
            <form autoComplete="off" action="" onSubmit={form.handleSubmit(onSubmit)} method="post">
                <Field form={form} {...fields.title} />
                <Field form={form} {...fields.venue} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <DatePicker form={form} {...fields.startDate} />
                    <DatePicker form={form} min={form.getValues(fields.startDate.name)} {...fields.endDate} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <Field form={form} {...fields.startTime} />
                    <Field form={form} {...fields.endTime} />
                </div>

                <h2 className="my-8 text-3xl text-white text-center">Event Description</h2>

                <Field form={form} {...fields.image}>
                    <Input onChange={(event) => { 
                        const reader = new FileReader()
                        reader.onload = () => {
                            setImage(reader.result)
                        }
                        reader.readAsDataURL(event.target.files[0])
                    }} {...fields.image} accept="image/jpeg,image/jpg,image/png,image/webp" />
                </Field>

                {image ?
                    <img src={image} alt='Event Image'
                        className='w-full h-[250px] object-cover rounded-lg' width={500} height={500} /> :
                    <div className="w-full h-[250px] bg-teal-900 rounded-lg"></div>
                }

                <Field type={props.event} form={form} {...fields.desc} textarea />
                <input type="hidden" name="event_id" value={props.event?.id ?? ''} />

                <Button className='w-full' type="submit">{props.event ? 'Update' : 'Create'} Event</Button>

            </form>
        </Form>
    )
}

const fields = {
    title: {
        name: 'title',
        label: 'Event Title',
        type: 'text',
    },
    venue: {
        name: 'venue',
        label: 'Event Venue',
        type: 'text',
    },
    startDate: {
        name: 'start_date',
        label: 'Start Date',
        type: 'date',
    },
    endDate: {
        name: 'end_date',
        label: 'End Date',
        type: 'date',
    },
    startTime: {
        name: 'start_time',
        label: 'Start Time',
        type: 'time',
    },
    endTime: {
        name: 'end_time',
        label: 'End Time',
        type: 'time',
    },
    desc: {
        name: 'desc',
        label: 'Event Description',
        type: 'textarea',
    },
    image: {
        name: 'image',
        label: 'Event Image',
        type: 'file',
    }
}

export default EventForm