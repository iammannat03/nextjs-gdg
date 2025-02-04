"use server";

import { connectToDb } from "@/db/dbConnect";
import { Events } from "@/models/events";
import { revalidatePath } from "next/cache";

export const fetchEvent = async (id) => {
  try {
    connectToDb();
    const event = await Events.findById(id);
    return event._doc;
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
    throw new Error("Failed to fetch events from the database");
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
  } catch (err) {
    throw new Error("Failed to add event");
  }
};
