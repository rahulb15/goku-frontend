import React, { useEffect, useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import EmailerHelper from "../../common-components/mailerSendinBlue/mailer";
import "./contact.scss";
//import { Phone } from '@mui/icons-material';

const Toknomics = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const emailValidation = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) === false) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [errorMessage]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "message":
        setMessage(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNo":
        setPhoneNo(value);
        break;
      default:
        break;
    }
  };

  const submitContactForm = async () => {
    if (!email || !message || !firstName || !lastName) {
      setErrorMessage("Fill all Required Feilds");
    } else {
      if (emailValidation()) {
        const emailObj = {
          content: "Your query has been received",
          receiver: email,
        };
        const emailObj2 = {
          content: `Your received an query "${message}" from ${firstName} ${lastName}`,
          receiver: "kryptomerch.io@gmail.com",
        };
        await EmailerHelper(emailObj);
        await EmailerHelper(emailObj2);
        setErrorMessage("Your Query has been Received");
        setEmail("");
        setMessage("");
        setFirstName("");
        setLastName("");
        setPhoneNo("");
      } else {
        setErrorMessage("Email is not Valid");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="faqOuter">
        <div className="container">
          <div className="contactHd">
            <h2 className="bold">Talk To Our Expert</h2>
            <span className="bold">
              Please leave your message and we will get back to you!
            </span>
          </div>
          <div className="contfrmOuter">
            <div className="contfrmBx">
              <div className="contfrm">
                <FormGroup>
                  <Label for="exampleEmail">First name*</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="exampleEmail"
                    placeholder="enter your first name"
                    onChange={handleOnChange}
                    value={firstName}
                  />
                </FormGroup>
              </div>
              <div className="contfrm">
                <FormGroup>
                  <Label for="exampleEmail">Last name*</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="exampleEmail"
                    placeholder="enter your last name"
                    onChange={handleOnChange}
                    value={lastName}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="contfrmBx">
              <div className="contfrm">
                <FormGroup>
                  <Label for="exampleEmail">Email address*</Label>
                  <Input
                    type="text"
                    name="email"
                    id="exampleEmail"
                    placeholder="Email address"
                    onChange={handleOnChange}
                    value={email}
                  />
                </FormGroup>
              </div>
              <div className="contfrm">
                <FormGroup>
                  <Label for="exampleEmail">Phone number</Label>
                  <Input
                    type="text"
                    name="phoneNo"
                    id="exampleEmail"
                    placeholder="enter your phone numnber"
                    onChange={handleOnChange}
                    value={phoneNo}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="contfrmBx">
              <div className="contTxtarea">
                <FormGroup>
                  <Label for="exampleEmail">Message*</Label>
                  <Input
                    type="textarea"
                    name="message"
                    id="exampleText"
                    placeholder="write your message"
                    onChange={handleOnChange}
                    value={message}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="sendBtnBx">
              <button onClick={submitContactForm}>Send</button>
            </div>
            {errorMessage ? <div>{errorMessage}</div> : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Toknomics;
