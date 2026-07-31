import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password? : string;
  createdAt: Date;
  updatedAt: Date;
  role: "user" | "admin" | "partner";
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String,  },
    role: { type: String, enum: ["user", "admin" , "partner"], default: "user" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;