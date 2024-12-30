import mongoose, { Model, Schema, Types } from "mongoose";

interface Application {
  jobId: number;
  userId: Types.ObjectId;
  cvUrl: string;
  letter: string;
}

const ApplicationSchema: Schema<Application> = new Schema(
  {
    jobId: {
      type: Number,
      required: [true, "you ness a job"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    cvUrl: {
      type: String,
    },
    letter: {
      type: String,
    },
  },
  { timestamps: true }
);

const ApplicationModel: Model<Application> =
  mongoose.models.Application ||
  mongoose.model<Application>("Application", ApplicationSchema);

export default ApplicationModel;
