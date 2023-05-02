import mongoose from "mongoose";
//schema for user
const blogSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    uname: {
      type: String,
    },
    title: {
      type: String,
      required: true,
     
    },

    body: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;