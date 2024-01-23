import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import { userRegisterSuccess } from "../../pages/home/connect-wallet-popup/connectWalletSlice";

export const RegisterationModal = (props) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [updateMessage, setUpdatedMessage] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setUpdatedMessage("");
    }, 3000);
  }, [updateMessage]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name == "email") {
      //validate email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(value)) {
        toast.error("Please enter a valid email address", {
          position: "top-right",
        });

        return;
      }
    }

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;

      case "email":
        setEmail(value);
        break;

      default:
        break;
    }
  };

  const checkUserRegisteration = () => {
    Axios.get("/user/checkUser", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          const firstName = response.data.userName;
          const email = response.data.userEmail;
          setUserRegistered(true);
          dispatch(userRegisterSuccess({ firstName, email }));
        } else {
          setUserRegistered(false);
        }
        // toast.success("We have received your Enquiry and will get get back to you in next 24 hours", {
        //     position: "top-right"
        // })
        // setMessage(data.message);
        // setEmail("");
        // setEnquiryTitle("");
        // setBokkingId("");
        // setEnquiry("");s
      })
      .catch((error) => {
        setUserRegistered(false);
        //setLoading(false);
        // setMessage('Something went wrong while creating Enquiry! Please try again');
        // setErrorStatus(true);
      });
  };

  const userRegisteration = () => {
    const params = {
      name: firstName,
      email: email,
    };
    Axios.patch("/user/updateUser", params, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        const {
          data: { data },
        } = response;
        setUpdatedMessage(response.data.message);
        checkUserRegisteration();
        dispatch(userRegisterSuccess({ firstName, email }));
        window.location.href = `${process.env.REACT_APP_URL}marketplace/my-profile-owned`;
        // navigate("/marketplace/create-owned");
        // toast.success("We have received your Enquiry and will get get back to you in next 24 hours", {
        //     position: "top-right"
        // })
        // setMessage(data.message);
        // setEmail("");
        // setEnquiryTitle("");
        // setBokkingId("");
        // setEnquiry("");s
      })
      .catch((error) => {
        
        //setLoading(false);
        // setMessage('Something went wrong while creating Enquiry! Please try again');
        // setErrorStatus(true);
      });
  };

  return (
    <div>
      <Modal isOpen={props.modal2} toggle={props.toggle2} className="regModlBx">
        <Button onClick={props.toggle2} className="popclose">
          X
        </Button>
        <ModalBody className="regmodlOuter">
          <h2>You need to Register First</h2>
          <FormGroup>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              className="regInp"
              placeholder="Name"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="regInp"
              placeholder="Email Address"
            />
          </FormGroup>
          <Button className="regBtn" onClick={userRegisteration}>
            Register
          </Button>
          {updateMessage ? (
            <div style={{ marginTop: "11px" }}>{updateMessage}</div>
          ) : null}
        </ModalBody>
      </Modal>
    </div>
  );
};
