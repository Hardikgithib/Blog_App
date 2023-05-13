import React, { useEffect, useState } from "react";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import Accordion from "react-bootstrap/Accordion";

import swal from 'sweetalert';
export default function AddBlog() {
  const [show3, setShow3] = useState(false);
  const token = localStorage.getItem("token");
 

  //error messages
  const [titleErr,setTitleErr] = useState(false)
  const [bodyErr,setBodyErr] = useState(false)
  const [tagsErr,setTagsErr] = useState(false)

  const [titleErr1,setTitleErr1] = useState(false)
  const [bodyErr1,setBodyErr1] = useState(false)
  const [tagsErr1,setTagsErr1] = useState(false)



  const headers = {
    headers : {
      Authorization : `Bearer ${token}`
    }
  }

  const data = JSON.parse(localStorage.getItem("user")); //  get userdetaols from local storage
  const userId = data._id; // acess id coming from data
  const uname = data.uname
  const [flag, setFlag] = useState(0);
  const [show, setShow] = useState(false);
  // const [showComp, setShowComp] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    blog.title = "";
    blog.body = "";
    setShow(true);
  };

  const [showe, setShowe] = useState(false);

  const handleClose1 = () => setShowe(false);
  const handleShow1 = (el) => {
    blog.userId = userId;
    blog.uname=uname;
    blog.title = el.title;
    blog.body = el.body;
    blog.tags = el.tags;
    setBlogId(el._id);
    
    setShowe(true);
  };
  const [blogData, setBlogData] = useState();
  const [blog, setBlog] = useState({
    userId: userId,
    uname: uname,
    title: "",
    body: "",
    tags: "",
  });
  const [blogId, setBlogId] = useState("");
 

 

  const handleChange = (e,editor) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,   
      [name]: value,
    });
    setTitleErr(false)
    setBodyErr(false)
    setTagsErr(false)
  };

  

  const handleAddBlog = () => {
 //const { userId, uname, title, body, tags } = blog;
 let regexp = /(?!^$)([^\s])/;
 if (blog.title === "" || !regexp.test(blog.title) ) {
  setTitleErr(true)
}
else if (blog.body === "" || !regexp.test(blog.body)) {
  setBodyErr(true)       
}
else if(blog.tags ==="" || !regexp.test(blog.tags) ){
  setTagsErr(true)
}
else{
    axios
      .post("http://localhost:8081/addBlog", blog, { validateStatus: false })
      .then((res) => {
        if (res.data.statusCode === 201) {
          swal(res.data.message)
          setShow(false);
          setFlag(flag + 1);
        } else {
          swal(res.data);
        }
      })
      .catch((err) => {
        swal(err);
      });
    }  
  };




  useEffect(() => {
  
    axios.get(`http://localhost:8081/getMyBlog/${userId}`).then((res) => {
      setBlogData(res.data.data);
    });
  }, [flag]);

 

  const handleDelete = async(el) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this file?",
      icon: "warning",
      dangerMode: true,
    });
     
    if (willDelete) {
      axios.delete(`http://localhost:8081/deleteMyBlog/${el._id}`, headers).then((res) => {
        swal("Deleted!", "Your imaginary file has been deleted!", "success");
      axios.get(`http://localhost:8081/getMyBlog/${userId}`).then((res) => {
        setBlogData(res.data.data);
      });
    }, []);
    }
    
  };
  

  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
    setTitleErr1(false)
    setBodyErr1(false)       
    setTagsErr1(false)
  };

  const handleUpdate = (e) => {
  e.preventDefault();
  let regexp = /(?!^$)([^\s])/;
    const token = localStorage.getItem("token");
 if (blog.title === "" || !regexp.test(blog.title) ) {
  setTitleErr1(true)
}
else if (blog.body === "" || !regexp.test(blog.body)) {
  setBodyErr1(true)       
}
else if(blog.tags ==="" || !regexp.test(blog.tags) ){
  setTagsErr1(true)
}
else{
    
    axios
      .put(`http://localhost:8081/updateMyBlog/${blogId}`,blog)
      .then((res) => {
        if (res.data.statusCode === 200) {
          swal(res.data.message);
          axios.get(`http://localhost:8081/getMyBlog/${userId}`).then((res) => {
            setBlogData(res.data.data);
            setShowe(false);
          });
        } else {
          swal(res.data.message);
        }
      })
      .catch((err) => {
        swal("Please dont take empty input");
      });
    
  };
}

  const liftingHeaderState = (data) => {
    
    setBlogData(data);
  };

 

  return (
    <>
      <Header data={liftingHeaderState} value={blogData} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hey! Add Your Blog Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Title</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={blog.title}
                name="title"
                required
                //autoFocus
              />
              
            </Form.Group>
            {titleErr? <p style={{color:"red"}}>***Do not take empty title***</p>:false}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Start Writing Here</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={blog.body}
                name="body"
                onChange={handleChange}
              />
             
             
              
            </Form.Group>
            {bodyErr?<p style={{color:"red"}}>***Do not take empty field***</p>:false}
            <input
              type="radio"
              id="id1"
              name="tags"
              value="Food"
              onChange={handleChange}
            />{" "}
            &nbsp;
            <label for="html">Food</label> &nbsp;
            <input
              type="radio"
              id="id2"
              name="tags"
              value="Educations"
              onChange={handleChange}
            />{" "}
            &nbsp;
            <label for="html">Educations</label> &nbsp;
            <input
              type="radio"
              id="id3"
              name="tags"
              value="Businessmen"
              onChange={handleChange}
            />{" "}
            &nbsp;
            <label for="html">Businessmen</label> &nbsp;
            <input
              type="radio"
              id="id4"
              name="tags"
              value="Positions"
              onChange={handleChange}
            />{" "}
            &nbsp;
            <label for="html">Positions</label> &nbsp;
            <input
              type="radio"
              id="id5"
              name="tags"
              value="Other"
              onChange={handleChange}
            />{" "}
            &nbsp;
            <label for="html">Other</label>
            <br />
           {tagsErr? <p style={{color:"red"}}>***Please Enter Valid Input***</p>:false}
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setShow(false)
          setShow3(true)
        }}>
            Preview
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddBlog}>
            Add Blog
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        <div className="pb-3 text-right">
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={handleShow}
          >
            Add Blog
          </button>
        </div>
      </div>

      {blogData?.length > 0 ? (
        <div className="row">
            {blogData?.map((el) => (
          <Accordion defaultActiveKey="1">
          
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="col-3">Date:{el.updatedAt.slice(0, 10)}</div>
                  <div className="col-3 ml-2"><b>Written By:</b> {el.uname}</div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-6">{el.title}</div>

                       {el.uname===uname? 
                      <div className="col-6 d-inline-flex justify-content-end">
                        <button 
                          className="btn btn-sm btn-primary "
                          onClick={() => handleShow1(el)}
                        >
                          Edit
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(el)}
                        >
                          Delete
                        </button>
                      </div>
                       : null
                 
                     } 
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {el.body}

                  <div className="row pt-2">
                    <div className="col-12 d-inline-flex main-tag">
                      <div className="mt-2">
                        <b>Tags:</b>
                      </div>
                      <span className="w-auto tags">{el.tags}</span>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>

              
          </Accordion>
            ))}
        </div>
      ) : (
        <div className="row text-center">
          <h3>No Blogs to display! Click on Add blog to add your first blog.</h3>
        </div>
      )}

      <Modal show={showe} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Update your Blog here!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tiltle:</Form.Label>
              <Form.Control
                type="text"
                value={blog.title}
                onChange={handleUpdateInput}
                name="title"
              />
            </Form.Group>
            {titleErr1 ?<p style={{color:"red"}}>***Please Enter Valid Input***</p>:false}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Body:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="body"
                value={blog.body}
                onChange={handleUpdateInput}
              />
            </Form.Group>
            {bodyErr1?<p style={{color:"red"}}>***Please Enter Valid Input***</p>:false}
            <input
              type="radio"
              id="html"
              name="tags"
              value="Food"
              checked={blog.tags === "Food"}
              onChange={handleUpdateInput}
            />{" "}
            &nbsp;
            <label for="html">Food</label> &nbsp;
            <input
              type="radio"
              id="html"
              name="tags"
              value="Educations"
              checked={blog.tags === "Educations"}
              onChange={handleUpdateInput}
            />{" "}
            &nbsp;
            <label for="html">Educations</label> &nbsp;
            <input
              type="radio"
              id="html"
              name="tags"
              value="Businessmen"
              checked={blog.tags === "Businessmen"}
              onChange={handleUpdateInput}
            />{" "}
            &nbsp;
            <label for="html">Businessmen</label> &nbsp;
            <input
              type="radio"
              id="html"
              name="tags"
              value="Positions"
              checked={blog.tags === "Positions"}
              onChange={handleUpdateInput}
            />{" "}
            &nbsp;
            <label for="html">Technology</label> &nbsp;
            <input
              type="radio"
              id="html"
              name="tags"
              value="Other"
              checked={blog.tags === "Other"}
              onChange={handleUpdateInput}
            />{" "}
            &nbsp;
            <label for="html">Other</label>
            <br />
            {tagsErr1?<p style={{color:"red"}}>***Please Enter Valid Input***</p>:false}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Blog
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={show3}
        onHide={() =>{ setShow3(false)
          setShow(true)
        }}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Preview Of New Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header><h3>{blog.title}</h3></Accordion.Header>
        <Accordion.Body>
          <b>{blog.body}</b>
          <br/>
          <br/>
          <b>Tags : </b><span style={{color:"red"}}><b>{blog.tags}</b></span>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
          <Button onClick={()=>{
            setShow3(false)
            setShow(true)}}>Go back..</Button>
        </Modal.Body>
      </Modal>
        
    
     
    </>
  );
}
