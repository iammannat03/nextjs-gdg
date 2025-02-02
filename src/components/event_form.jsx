"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string(),
  venue: z.string(),
  start_date: z.date().min(new Date(), "Start date must be in the future"),
  end_date: z.date(),
  start_time: z.string(),
  end_time: z.string(),
  desc: z.string(),
  image: z.any(),
});

import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Field from "./field_input";
import DatePicker from "./datepicker_field";

const EventForm = (props) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: props.event ?? {
      event_id: "",
      title: "",
      venue: "",
      start_date: new Date(),
      end_date: new Date(),
      startTime: "",
      endTime: "",
      desc: "",
      image: "",
    },
  });
  const [image, setImage] = useState(props.event?.image);

  useEffect(() => {
    form.setValue(fields.image.name, image);
  }, [image]);

  const onSubmit = async (values) => {
    // const uploadedImageUrl = await uploadImageToCloudinary(values.image[0]);

    const eventData = {
      ...values,
      // image: uploadedImageUrl,
    };

    if (!props.event) {
      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          throw new Error("Event creation failed");
        }

        const data = await response.json();
        console.log("Event created successfully:", data);
      } catch (error) {
        console.error("Error creating event:", error);
      }
    } else {
      try {
        const response = await fetch(`/api/events?id=${props.event._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) {
          throw new Error("Event updation failed");
        }

        const data = await response.json();
        console.log("Event upadted successfully:", data);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  // Function to handle image upload to Cloudinary
  // const uploadImageToCloudinary = async (file) => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", "YOUR_CLOUDINARY_UPLOAD_PRESET"); // Replace with your Cloudinary preset
  //   const cloudinaryUrl =
  //     "https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/image/upload"; // Replace with your Cloudinary URL

  //   const response = await fetch(cloudinaryUrl, {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await response.json();
  //   return data.secure_url; // Returns the image URL from Cloudinary
  // };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        method="post">
        {/* Title field */}
        <Field form={form} {...fields.title} />

        {/* Venue field */}
        <Field form={form} {...fields.venue} />

        {/* Date fields */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <DatePicker form={form} {...fields.startDate} />
          <DatePicker
            form={form}
            min={form.getValues(fields.startDate.name)}
            {...fields.endDate}
          />
        </div>

        {/* Time fields */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Field form={form} {...fields.startTime} />
          <Field form={form} {...fields.endTime} />
        </div>

        {/* Event Description */}
        <h2 className="my-8 text-3xl text-center text-white">
          Event Description
        </h2>

        {/* Image field */}
        <Field form={form} {...fields.image}>
          <Input
            onChange={(event) => {
              const reader = new FileReader();
              reader.onload = () => {
                setImage(reader.result);
              };
              reader.readAsDataURL(event.target.files[0]);
            }}
            {...fields.image}
            accept="image/jpeg,image/jpg,image/png,image/webp"
          />
        </Field>

        {/* Image preview */}
        {image ? (
          <img
            src={image}
            alt="Event Image"
            className="w-full h-[250px] object-cover rounded-lg"
            width={500}
            height={500}
          />
        ) : (
          <div className="w-full h-[250px] bg-teal-800 rounded-lg"></div>
        )}

        {/* Description field */}
        <Field type={props.event} form={form} {...fields.desc} textarea />

        {/* Hidden input for event ID (if updating an existing event) */}
        <input type="hidden" name="event_id" value={props.event?.id ?? ""} />

        {/* Submit button */}
        <Button className="w-full" type="submit">
          {props.event ? "Update" : "Create"} Event
        </Button>
      </form>
    </Form>
  );
};

const fields = {
  title: {
    name: "title",
    label: "Event Title",
    type: "text",
  },
  venue: {
    name: "venue",
    label: "Event Venue",
    type: "text",
  },
  startDate: {
    name: "start_date",
    label: "Start Date",
    type: "date",
  },
  endDate: {
    name: "end_date",
    label: "End Date",
    type: "date",
  },
  startTime: {
    name: "start_time",
    label: "Start Time",
    type: "time",
  },
  endTime: {
    name: "end_time",
    label: "End Time",
    type: "time",
  },
  desc: {
    name: "desc",
    label: "Event Description",
    type: "textarea",
  },
  image: {
    name: "image",
    label: "Event Image",
    type: "file",
  },
};

export default EventForm;
