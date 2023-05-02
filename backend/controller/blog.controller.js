//const blogSchema = require("../model/blog.schema");
import blogSchema from "../model/blog.schema.js";
//const User = require('../model/user.schema')

//const Blog = require('../model/blog.schema')

export const addBlog = async (req, res) => {
  console.log("hello world");
  let { userId, uname, title, body, tags } = req.body; // destruct  req. body
  try {
    const data = await blogSchema.create({ userId, uname, title, body, tags });
    if (data) {
      return res.status(201).send({
        message: "Blog created successfully",
        statusCode: 201,
      });
    } else {
      return res.status(400).send({
        message: "Blog is not created",
        statusCode: 400,
      });
    }
  } catch (e) {
    res.send("Something went wrong please update all fields");
  }
};

export const getMyBlog = async (req, res) => {
  // console.log("here is req body",req.params)
  try {
    const data = await blogSchema.find({ userId: req.params.userId });
    if (data) {
      return res.status(200).send({
        message: "OK",
        statusCode: 200,
        data: data,
      });
    } else {
      return res.status(400).send({
        message: "Blogs are not found",
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

export const deleteMyBlog = async (req, res) => {
  try {
    const _id = req.params;
    if (_id) {
      const blog = await blogSchema.findOneAndRemove({ _id });
      return res.status(200).send({
        message: "record deleted successfully",
        statusCode: 200,
        data: blog,
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

export const updateMyBlog = async (req, res) => {
  const data = req.body;
  console.log("====================", data);
  const _id = req.params._id;
  console.log("***************************", _id);
  try {
    if (!_id) {
      return res.status(400).send({
        message: "blog not found, please try again",
        statusCode: 400,
      });
    }
    if (data.userId && data.uname && data.title && data.body && data.tags) {
      const tempBlog = await blogSchema.findByIdAndUpdate(_id, data);

      if (!tempBlog) {
        return res.status(400).send({
          message: "Blog not found1, please try again",
          statusCode: 400,
        });
      }
      return res.status(200).send({
        message: "Blog updated successfully",
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

export const searBlog = async (req, res) => {
  const tags = req.params.tags;

  try {
    if (!tags) {
      return res.status(400).send({
        message: "Blogs not found, please try again",
        statusCode: 400,
      });
    }

    const tempBlog = await blogSchema.find({
      $or: [{ tags: { $regex: tags } }],
    });

    if (!tempBlog) {
      return res.status(400).send({
        message: "Blog not found, please try again",
        statusCode: 400,
      });
    }

    return res.status(200).send({
      message: "Blog found successfully",
      statusCode: 200,
      data: tempBlog,
    });
  } catch (e) {
    return res.status(400).send({
      message: "something went wrong, Please try again.",
      statusCode: 400,
    });
  }
};

export const getAllBlog = async (req, res) => {
  let data = await blogSchema.find({});
  if (data) {
    return res.status(200).send({
      message: "Blogs found successfully",
      statusCode: 200,
      data: data,
    });
  } else {
    return res.status(400).send({
      message: "Blogs are not found",
      statusCode: 400,
    });
  }
};
