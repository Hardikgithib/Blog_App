import mongoose from "mongoose";
//schema for user
const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    uname: {
      type: String,
    },
    pname: {
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

const patientModel = mongoose.model("patient", patientSchema);

export default patientModel;