import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBNavbarNav,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddBlog from "./AddBlog";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from "react";

export default function Header(props) {
  const [showNavNoTogglerThird, setShowNavNoTogglerThird] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  const userId = data._id;
  const navigate = useNavigate();
  // const [tags, setTags] = useState("");
  // const [blog, setBlog] = useState([]);
  // const [flag, setFlag] = useState(false);
  const [blogData,setBlogData] = useState([])
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    swal("loged out");
  };

  

  

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   axios.get(`http://localhost:8081/search/${tags}`).then((res) => {
  //     props.data(res.data.data);
  //   });
  // };

  const handleAllBlogs = () => {
    axios.get(`http://localhost:8081/getAllBlog`).then((res) => {
      props.data(res.data.data);
      setBlogData(res.data.data)
    });
  };

 

  const handleInput = (e) =>{
    const item = e.target.value
    const search_res = blogData.filter((itm) => {
      return (
        itm.title?.toLowerCase().includes(item.toLowerCase()) ||
        itm.tags?.toLowerCase().includes(item.toLowerCase()) ||
        itm.uname?.toLowerCase().includes(item.toLowerCase())
      );
    });  
    props.data(search_res);
  }

  return (
    <div className="ml-n1 mr-n1">
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavNoTogglerThird(!showNavNoTogglerThird)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBNavbarBrand href="#">Blogee</MDBNavbarBrand>
          <MDBCollapse navbar show={showNavNoTogglerThird}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink href="/AddBlog">My Bolgs</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink  onClick={handleAllBlogs}>
                  All Blogs
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBInputGroup tag="form" className="d-flex w-auto">
              <input
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                type="Search"
                onChange={handleInput}
              />
              {/* <MDBBtn outline onClick={handleSearch}>
                Search
              </MDBBtn> */}
            </MDBInputGroup>

            <MDBNavbarItem className="d-flex w-auto">
              <MDBBtn
                outline
                color="primary"
                className="me-2 ms-2 pc-1"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </MDBBtn>

              {/* <MDBNavbarLink href='/Login' onClick={handleLogout}>Log out</MDBNavbarLink> */}
            </MDBNavbarItem>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      {/* {flag ? <AddBlog data={blog} /> : false} */}
    </div>
  );
}
