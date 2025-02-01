import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
      type: String,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Events || mongoose.model("Events", EventSchema);
// check if user model is already created or not
