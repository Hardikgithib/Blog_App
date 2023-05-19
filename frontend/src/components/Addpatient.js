import React, { useEffect, useState } from "react";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

import Accordion from "react-bootstrap/Accordion";

import swal from 'sweetalert';
export default function Addpatient() {
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
    patient.pname = "";
    patient.body = "";
    setShow(true);
  };

  const [showe, setShowe] = useState(false);

  const handleClose1 = () => setShowe(false);
  const handleShow1 = (el) => {
    patient.userId = userId;
    patient.uname=uname;
    patient.pname = el.pname;
    patient.body = el.body;
    patient.tags = el.tags;
    setpatientId(el._id);
    
    setShowe(true);
  };
  const [patientData, setpatientData] = useState();
  const [patient, setpatient] = useState({
    userId: userId,
    uname: uname,
    pname: "",
    body: "",
    tags: "",
  });
  const [patientId, setpatientId] = useState("");
 

 

  const handleChange = (e,editor) => {
    const { name, value } = e.target;
    setpatient({
      ...patient,   
      [name]: value,
    });
    setTitleErr(false)
    setBodyErr(false)
    setTagsErr(false)
  };

  

  const handleAddpatient = () => {
 
 let regexp = /(?!^$)([^\s])/;
 if (patient.pname === "" || !regexp.test(patient.pname) ) {
  setTitleErr(true)
}
else if (patient.body === "" || !regexp.test(patient.body)) {
  setBodyErr(true)       
}
else if(patient.tags ==="" || !regexp.test(patient.tags) ){
  setTagsErr(true)
}
else{
    axios
      .post("http://localhost:8081/addpatient", patient, { validateStatus: false })
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
  
    axios.get(`http://localhost:8081/getMypatient/${userId}`).then((res) => {
      setpatientData(res.data.data);
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
      axios.delete(`http://localhost:8081/deleteMypatient/${el._id}`, headers).then((res) => {
        swal("Deleted!", "Your imaginary file has been deleted!", "success");
      axios.get(`http://localhost:8081/getMypatient/${userId}`).then((res) => {
        setpatientData(res.data.data);
      });
    }, []);
    }
    
  };
  

  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setpatient({
      ...patient,
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
 if (patient.pname === "" || !regexp.test(patient.pname) ) {
  setTitleErr1(true)
}
else if (patient.body === "" || !regexp.test(patient.body)) {
  setBodyErr1(true)       
}
else if(patient.tags ==="" || !regexp.test(patient.tags) ){
  setTagsErr1(true)
}
else{
    
    axios
      .put(`http://localhost:8081/updateMypatient/${patientId}`,patient)
      .then((res) => {
        if (res.data.statusCode === 200) {
          swal(res.data.message);
          axios.get(`http://localhost:8081/getMypatient/${userId}`).then((res) => {
            setpatientData(res.data.data);
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
    
    setpatientData(data);
  };

 

  return (
    <>
      <Header data={liftingHeaderState} value={patientData} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hey! Add Patient Here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Patient Name</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                value={patient.pname}
                name="pname"
                required
                //autoFocus
              />
              
            </Form.Group>
            {titleErr? <p style={{color:"red"}}>***Do not take empty title***</p>:false}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Patient Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={patient.body}
                name="body"
                onChange={handleChange}
                placeholder="Age,Blood group and disease"
              />
             
             
              
            </Form.Group>
            {bodyErr?<p style={{color:"red"}}>***Do not take empty field***</p>:false}
            <input
              type="radio"
              id="id1"
              name="tags"
              value="Male"
              onChange={handleChange}
            />{" "}
            &nbsp;
            <label for="html">Male</label> &nbsp;
            <input
              type="radio"
              id="id2"
              name="tags"
              value="Female"
              onChange={handleChange}
            />{" "}
            &nbsp;
            <label for="html">Female</label> &nbsp;
            <input
              type="radio"
              id="id3"
              name="tags"
              value="Trans"
              onChange={handleChange}
            />{" "}
            &nbsp;
            <label for="html">Trans</label> &nbsp;
          
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
          <Button variant="primary" onClick={handleAddpatient}>
            Add Patient
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
            Add patient
          </button>
        </div>
      </div>

      {patientData?.length > 0 ? (
        <div className="row">
            {patientData?.map((el) => (
          <Accordion defaultActiveKey="1">
          
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="col-3">Date:{el.updatedAt.slice(0, 10)}</div>
                  <div className="col-3 ml-2"><b>Under Dr.</b> {el.uname}</div>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-6 ml-2"> <b>Patient Name :</b>{el.pname} </div>

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
          <h3>No patient to display! Click on Add patient to add your first patient.</h3>
        </div>
      )}

      <Modal show={showe} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Update your patient here!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tiltle:</Form.Label>
              <Form.Control
                type="text"
                value={patient.pname}
                onChange={handleUpdateInput}
                name="pname"
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
                value={patient.body}
                onChange={handleUpdateInput}
              />
            </Form.Group>
            {bodyErr1?<p style={{color:"red"}}>***Please Enter Valid Input***</p>:false}
            <input
              type="radio"
              id="html"
              name="tags"
              value="Male"
              checked={patient.tags === "Male"}
              onChange={handleUpdateInput}
            />{" "}
            &nbsp;
            <label for="html">Male</label> &nbsp;
            <input
              type="radio"
              id="html"
              name="tags"
              value="Female"
              checked={patient.tags === "Female"}
              onChange={handleUpdateInput}
            />{" "}
            &nbsp;
            <label for="html">Female</label> &nbsp;
            <input
              type="radio"
              id="html"
              name="tags"
              value="Trans"
              checked={patient.tags === "Trans"}
              onChange={handleUpdateInput}
            />{" "}
            &nbsp;
            <label for="html">Trans</label> &nbsp;
          
            <input
              type="radio"
              id="html"
              name="tags"
              value="Other"
              checked={patient.tags === "Other"}
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
            Update patient
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
            Preview Of New patient
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header><h3>{patient.pname}</h3></Accordion.Header>
        <Accordion.Body>
          <b>{patient.body}</b>
          <br/>
          <br/>
          <b>Tags : </b><span style={{color:"red"}}><b>{patient.tags}</b></span>
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
