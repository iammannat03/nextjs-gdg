"use server";

import { connectToDb } from "@/db/dbConnect";
import { Events } from "@/models/events";
import { revalidatePath } from "next/cache";

export const fetchEvent = async (id) => {
  try {
    connectToDb();
    const event = await Events.findById(id);

    // Serialize the MongoDB document to plain JavaScript object
    const serializedEvent = {
      ...JSON.parse(JSON.stringify(event._doc)),
      _id: event._id.toString(),
      start_date: event.start_date?.toISOString(),
      end_date: event.end_date?.toISOString(),
      createdAt: event.createdAt?.toISOString(),
      updatedAt: event.updatedAt?.toISOString(),
      register_status: Boolean(event.register_status),
    };

    return serializedEvent;
  } catch (err) {
    throw new Error("Failed to fetch event details");
  }
};

export const fetchEvents = async () => {
  try {
    connectToDb();
    const events = await Events.find();
    return events;
  } catch (err) {
    throw new Error(
      "Failed to fetch events from the database"
    );
  }
};

export const deleteEvent = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    connectToDb();
    await Events.findByIdAndDelete(id);
    revalidatePath("/events");
  } catch (err) {
    throw new Error("Failed to delete the event");
  }
};

export const updateEvent = async (id, newData) => {
  try {
    connectToDb();
    const event = await Events.findById(id);
    Object.assign(event, newData);
    await event.save();
    revalidatePath("/console/events/");
  } catch (err) {
    throw new Error("Failed to fetch event details");
  }
};

export const addEvent = async (data) => {
  try {
    connectToDb();
    const newEvent = new Events(data);
    await newEvent.save();
    revalidatePath("/console/events/");

    // Serialize the Mongoose document before returning
    const serializedEvent = {
      ...JSON.parse(JSON.stringify(newEvent._doc)),
      _id: newEvent._id.toString(),
      start_date: newEvent.start_date?.toISOString(),
      end_date: newEvent.end_date?.toISOString(),
      createdAt: newEvent.createdAt?.toISOString(),
      updatedAt: newEvent.updatedAt?.toISOString(),
      register_status: Boolean(newEvent.register_status),
    };

    return serializedEvent;
  } catch (err) {
    throw new Error("Failed to add event");
  }
};

export const updateRegisterStatus = async (id, status) => {
  try {
    connectToDb();
    const event = await Events.findById(id);
    event.register_status = status;
    await event.save();
    revalidatePath("/console/events/");
  } catch (err) {
    throw new Error("Failed to update register status");
  }
};
