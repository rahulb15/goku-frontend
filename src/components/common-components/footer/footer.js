import React, { useEffect, useState } from "react";
import { BsInstagram, BsTelegram } from "react-icons/bs";
import { FaDiscord, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, FormGroup, Input, Nav } from "reactstrap";
import EmailerHelper from "../mailerSendinBlue/mailer";
import NewsletterHelper from "../newsletter/newsletter";

import "./footer.scss";

const Footer = () => {
  const emailValidation = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email) === false) {
      return false;
    }
    return true;
  };

  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setEmailMessage("");
    }, 3000);
  }, [emailMessage]);

  const newsletterMail = async (email) => {
    const emailObj = {
      content: "Your Email has been received",
      receiver: email,
    };
    // 
    if (emailValidation()) {
      await NewsletterHelper(email);
      await EmailerHelper(emailObj);
      setEmailMessage("Email has been Submitted");
      setEmail("");
    } else {
      
      setEmailMessage("Email is not Valid");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <footer>
        <div className="container">
          <div className="footerTop">
            <div className="foottopLeft">
              <h3>Subscribe</h3>
              <span>
                Get informed &amp; updated with kryptomerch newsletter.
              </span>
              <div className="subsBx">
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Your Email Address"
                    onChange={handleOnChange}
                    value={email}
                  />
                </FormGroup>
                {email ? (
                  <Button
                    color="primary bold"
                    onClick={() => newsletterMail(email)}
                  >
                    Subscribe
                  </Button>
                ) : (
                  <Button color="primary bold" disabled="true">
                    Subscribe
                  </Button>
                )}
              </div>
              {emailMessage ? <div>{emailMessage}</div> : null}
            </div>
            <div className="foottopRight">
              <h3 style={{ textAlign: "center" }}>Join Community</h3>
              <a
                href="https://www.facebook.com/people/kryptomerchio/100082978494721/"
                target="_blank"
              >
                <FaFacebook />
              </a>
              <a href="https://twitter.com/KRYPTOMERCH_IO" target="_blank">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/KRYPTOMERCH.IO/"
                target="_blank"
              >
                <BsInstagram />
              </a>
              <a
                href="https://www.youtube.com/channel/UC0QtNdjg9OIXIqSrAY52Wmw/"
                target="_blank"
              >
                <FaYoutube />
              </a>
              <a href="https://t.me/KRYPTOMERCHIO" target="_blank">
                <BsTelegram />
              </a>
              <a href="https://discord.com/invite/Zk7E4WKKSC" target="_blank">
                <FaDiscord />
              </a>
            </div>
          </div>
          <div className="footerBot">
            <div className="footBotLeft medium">
              &copy; 2023 Copyright Kryptomerch. All Rights Reserved.
            </div>
            <div className="footBotRight medium">
              <Nav>
                <Link to="/contact">Contact</Link>
                {/* <NavLink href="/contact">Contact</NavLink> */}
                <Link to="/faq">FAQ</Link>
                {/* <NavLink href="/faq">FAQ</NavLink> */}
                <Link to="/intellectual-property-policy">
                  Intellectual Property Policy
                </Link>
                {/* <NavLink href="/intellectual-property-policy">Intellectual Property Policy</NavLink> */}
                <Link to="/privacy-policy">Privacy Policy</Link>
                {/* <NavLink href="/privacy-policy">Privacy Policy</NavLink> */}
                <Link to="/terms-service">Terms of Services</Link>
                {/* <NavLink href="/terms-service">Terms of Services</NavLink> */}
              </Nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
