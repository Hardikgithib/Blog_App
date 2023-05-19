
import patientSchema from "../model/patient.schema.js";


export const addpatient = async (req, res) => {
  console.log("hello world");
  let { userId, uname, pname, body, tags } = req.body; // destruct  req. body
  try {
    const data = await patientSchema.create({ userId, uname, pname, body, tags });
    if (data) {
      return res.status(201).send({
        message: "patient addedsuccessfully",
        statusCode: 201,
      });
    } else {
      return res.status(400).send({
        message: "patient is not created",
        statusCode: 400,
      });
    }
  } catch (e) {
    res.send("Something went wrong please update all fields");
  }
};

export const getMypatient = async (req, res) => {
  // console.log("here is req body",req.params)
  try {
    const data = await patientSchema.find({ userId: req.params.userId });
    if (data) {
      return res.status(200).send({
        message: "OK",
        statusCode: 200,
        data: data,
      });
    } else {
      return res.status(400).send({
        message: "patient are not found",
        statusCode: 400,
      });
    }
  } catch (e) {
    return res.status(400).send({
      message: "Something Went Wrong, Please Try Again",
      statusCode: 400,
    });
  }
};

export const deleteMypatient = async (req, res) => {
  try {
    const _id = req.params;
    if (_id) {
      const patient = await patientSchema.findOneAndRemove({ _id });
      return res.status(200).send({
        message: "record deleted successfully",
        statusCode: 200,
        data: patient,
      });
    } else {
      return res.status(400).send({
        message: "record not found",
        statusCode: 400,
      });
    }
  } catch (e) {
    return res.status(400).send({
      message: "something went wrong, please try again.",
      statusCode: 400,
    });
  }
};

export const updateMypatient = async (req, res) => {
  const data = req.body;
  console.log("====================", data);
  const _id = req.params._id;
  console.log("***************************", _id);
  try {
    if (!_id) {
      return res.status(400).send({
        message: "patient not found, please try again",
        statusCode: 400,
      });
    }
    if (data.userId && data.uname && data.pname && data.body && data.tags) {
      const temppatient = await patientSchema.findByIdAndUpdate(_id, data);

      if (!temppatient) {
        return res.status(400).send({
          message: "patient not found1, please try again",
          statusCode: 400,
        });
      }
      return res.status(200).send({
        message: "patientupdated successfully",
        statusCode: 200,
      });
    } else {
      return res.status(400).send({
        message: "Please dont take any input empty",
        statusCode: 400,
      });
    }
  } catch (e) {
    return res.status(400).send({
      message: "something went wrong, Please try again.",
      statusCode: 400,
    });
  }
};

export const searpatient = async (req, res) => {
  const tags = req.params.tags;

  try {
    if (!tags) {
      return res.status(400).send({
        message: "patient not found, please try again",
        statusCode: 400,
      });
    }

    const temppatient = await patientSchema.find({
      $or: [{ tags: { $regex: tags } }],
    });

    if (!temppatient) {
      return res.status(400).send({
        message: "patient not found, please try again",
        statusCode: 400,
      });
    }

    return res.status(200).send({
      message: "patient found successfully",
      statusCode: 200,
      data: temppatient,
    });
  } catch (e) {
    return res.status(400).send({
      message: "something went wrong, Please try again.",
      statusCode: 400,
    });
  }
};

export const getAllpatient = async (req, res) => {
  let data = await patientSchema.find({});
  if (data) {
    return res.status(200).send({
      message: "patient found successfully",
      statusCode: 200,
      data: data,
    });
  } else {
    return res.status(400).send({
      message: "patient are not found",
      statusCode: 400,
    });
  }
};
