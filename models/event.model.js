import mongoose from "mongoose";

const castMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },     
    college: { type: String, required: true },  
    highlights: [{ type: String, required: true }],
    organizerName: { type: String, required: true },
    organizerLogo: { type: String, required: true },
    price: { type: Number, required: true },
    castMembers: [castMemberSchema],

    // ✅ Payment Section
    qrImage: { type: String, required: true },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian phone number"],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("event", eventSchema);
export default Event;
