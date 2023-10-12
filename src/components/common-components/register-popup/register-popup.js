import React, { useEffect, useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  Modal,
  ModalBody
} from "reactstrap";
// import Axios from 'axios';

const RegisterPopup = () => {
  const [modal, setModal] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

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

  useEffect(() => {
    if (modal) {
      checkConnection();
    }
  }, [modal]);

  const checkConnection = async () => {
    try {
      var checkConnection = await window.kadena.request({
        method: "kda_checkStatus",
        networkId: "testnet04",
      });
      if ((checkConnection.status = "fail")) {
        setWalletConnected(false);
      }

      if ((checkConnection.status = "success")) {
        setWalletConnected(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggle = () => {
    setModal(!modal);
  };

  const userRegisteration = () => {
    if (walletConnected) {
      const params = {
        walletAddress: walletAddress,
        name: firstName,
        email: email,
      };
      Axios.post("/user", params)
        .then((response) => {
          setLoading(false);
          // const { data: { data } } = response;
          // toast.success("We have received your Enquiry and will get get back to you in next 24 hours", {
          //     position: "top-right"
          // })
          // setMessage(data.message);
          // setEmail("");
          // setEnquiryTitle("");
          // setBokkingId("");
          // setEnquiry("");
        })
        .catch((error) => {
          setLoading(false);
          setMessage(
            "Something went wrong while creating Enquiry! Please try again"
          );
          // setErrorStatus(true);
        });
    }
  };

  return (
    <div>
      <Button className="buytoken" onClick={toggle}>
        Buy Token
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="regModlBx">
        <Button onClick={toggle} className="popclose">
          X
        </Button>
        <ModalBody className="regmodlOuter">
          <h2>Register</h2>
          <FormGroup>
            <Input
              type="text"
              name="firstName"
              className="regInp"
              placeholder="Name"
              onChange={handleOnChange}
              value={firstName}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              className="regInp"
              placeholder="Email Address"
              onChange={handleOnChange}
              value={EMAIL}
            />
          </FormGroup>
          <Button className="regBtn">Register</Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterPopup;
