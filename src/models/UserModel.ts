import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter the username"],
    },
    email: {
      type: String,
      required: [true, "Please enter the email"],
    },
    password: {
      type: String,
      required: [true, "Enter the password"],
    },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
