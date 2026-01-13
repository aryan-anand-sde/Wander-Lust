import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

userSchema.plugin(passportLocalMongoose.default);

// Will be saved as 'users' collection in db
export default mongoose.model("User", userSchema);
