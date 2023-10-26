import React, { Component, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import profBanImg from "../../../../../assets/profile-banner.png";
import profThumImg from "../../../../../assets/nft-img2.png";
import { BsFileEarmarkImage, BsTwitter } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import Axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const NftTabs1 = (props) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instaUrl, setInstaUrl] = useState("");
  const [profileImg, setProfileImg] = useState();
  const [coverImg, setCoverImg] = useState();
  const [profileImg1, setProfileImg1] = useState();
  const [coverImg1, setCoverImg1] = useState();
  // const [image, setImage] = useState(null);

  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = () => {
    Axios.get("user/userInfo", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        // setLoading(false)

        setFirstName(response.data.userInfo[0].name);
        setEmail(response.data.userInfo[0].email);
        setUserName(response.data.userInfo[0].userName);
        setShortBio(response.data.userInfo[0].shortBio);
        setWebUrl(response.data.userInfo[0].websiteUrl);
        setTwitterUrl(response.data.userInfo[0].twitterUrl);
        setInstaUrl(response.data.userInfo[0].InstagramUrl);
        setProfileImg(response.data.userInfo[0].profilePicture);
        setCoverImg(response.data.userInfo[0].coverPhoto);
        setProfileImg1(response.data.userInfo[0].profilePicture);
        setCoverImg1(response.data.userInfo[0].coverPhoto);

        // if(response.data.status=="success"){
        //     toast.success("New NFT Created", {
        //         position: "top-right"

        //       });
        // }else{
        //     toast.error("No NFT Created", {
        //         position: "top-right"

        //       });
        // }
      })
      .catch((error) => {});
  };

  // console.log(profileImg, "profileImg");
  // console.log(coverImg, "coverImg");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "shortBio":
        setShortBio(value);
        break;
      case "webUrl":
        setWebUrl(value);
        break;
      case "twitterUrl":
        setTwitterUrl(value);
        break;
      case "instaUrl":
        setInstaUrl(value);
        break;
      default:
        break;
    }
  };

  const handleOnSubmit = () => {
    //valida url
    console.log(webUrl, "webUrl");
    try {
      const url = new URL(webUrl);
      console.log(url, "url");
    } catch (_) {
      toast.error("Invalid URL", {
        position: "top-right",
      });
      return;
    }

    // Validate the twitterUrl
    const twitterUrlPattern =
      /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/;
    if (twitterUrl && !twitterUrl.match(twitterUrlPattern)) {
      toast.error("Invalid Twitter URL", {
        position: "top-right",
      });
      return; // Prevent further execution if the URL is invalid
    }

    // Validate the instaUrl
    const instaUrlPattern =
      /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?$/;
    if (instaUrl && !instaUrl.match(instaUrlPattern)) {
      toast.error("Invalid Instagram URL", {
        position: "top-right",
      });
      return; // Prevent further execution if the URL is invalid
    }

    const formData = new FormData();
    // Append the user information fields to the FormData
    formData.append("name", firstName);
    formData.append("email", email);
    formData.append("userName", userName);
    formData.append("shortBio", shortBio);
    formData.append("websiteUrl", webUrl);
    formData.append("twitterUrl", twitterUrl);
    formData.append("InstagramUrl", instaUrl);

    // Append the profileImg and coverImg as coverPhoto and profilePicture
    if (profileImg) {
      formData.append("profilePicture", profileImg);
    }
    if (coverImg) {
      formData.append("coverPhoto", coverImg);
    }

    // const formdata = {
    //   name: firstName,
    //   email,
    //   userName,
    //   shortBio,
    //   websiteUrl: webUrl,
    //   twitterUrl,
    //   InstagramUrl: instaUrl,
    //   profileImg,
    //   coverImg,
    // };

    Axios.patch("/user/updateUser", formData, {
      headers: {
        authorization: localStorage.getItem("accessJWT"),
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response.data.status === "success") {
          toast.success("User has been Updated", {
            position: "top-right",
          });
        } else {
          toast.error("User can't be Updated", {
            position: "top-right",
          });
        }
        // navigate("/marketplace/create-owned");
        // toast.success("User has been Updated", {
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

  const handleImageChangeCover = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      // Add validation for image size (in bytes)
      const maxSize = 5 * 1024 * 1024; // 5MB maximum size
      if (selectedImage.size > maxSize) {
        alert("Image size is too large. Please choose a smaller image.");
        return;
      }

      // Additional validation for image dimensions
      const maxWidth = 1200;
      const maxHeight = 600;
      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = () => {
        if (img.width > maxWidth || img.height > maxHeight) {
          alert(
            "Image dimensions are too large. Please choose a smaller image."
          );
        } else {
          setCoverImg(selectedImage);
          setCoverImg1(URL.createObjectURL(selectedImage));
        }
      };
    }
  };
  const handleImageChangeProfile = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      // Add validation for image size (in bytes)
      const maxSize = 5 * 1024 * 1024; // 5MB maximum size for a profile picture
      if (selectedImage.size > maxSize) {
        // alert(
        //   "Profile picture size is too large. Please choose a smaller image."
        // );
        toast.error(
          "Profile picture size is too large. Please choose a smaller image.",
          {
            position: "top-right",
          }
        );

        return;
      }

      // Additional validation for image dimensions (e.g., 200x200 pixels for a square profile picture)
      const requiredWidth = 650;
      const requiredHeight = 650;

      const img = new Image();
      img.src = URL.createObjectURL(selectedImage);
      img.onload = () => {
        console.log(
          img.width,
          img.height,
          requiredWidth,
          requiredHeight,
          "img"
        );
        if (img.width > requiredWidth || img.height > requiredHeight) {
          // alert(
          //   "Profile picture dimensions are incorrect. Please choose an image with dimensions 650x650 pixels."
          // );
          toast.error(
            "Profile picture dimensions are incorrect. Please choose an image with dimensions 650x650 pixels.",
            {
              position: "top-right",
            }
          );

        } else {
          setProfileImg(selectedImage);
          setProfileImg1(URL.createObjectURL(selectedImage));
        }
      };
    }
  };

  return (
    <>
      <div className="accHd bold">Account Settings</div>
      <div className="profileBannerBx">
        <div className="profBanner">
          {coverImg && <img src={coverImg1 ? coverImg1 : profBanImg} alt="" />}

          <span>
            {nightModeStatus ? (
              <BsFileEarmarkImage style={{ color: "#000000" }} />
            ) : (
              <BsFileEarmarkImage />
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChangeCover}
            />
          </span>
          <i>
            <img src={profileImg1 ? profileImg1 : profThumImg} alt="" />
            <span>
              {nightModeStatus ? (
                <BsFileEarmarkImage style={{ color: "#000000" }} />
              ) : (
                <BsFileEarmarkImage />
              )}
              <Input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleImageChangeProfile}
              />
            </span>
          </i>
        </div>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Display Name</Label>
          <Input
            type="text"
            name="firstName"
            id="exampleEmail"
            value={firstName}
            onChange={handleOnChange}
          />
        </FormGroup>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Username</Label>
          <Input
            type="text"
            name="userName"
            id="exampleEmail"
            value={userName}
            onChange={handleOnChange}
          />
        </FormGroup>
        <span>Your profile will be available on rarible.com/[username]</span>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Short Bio</Label>
          <Input
            type="text"
            name="shortBio"
            value={shortBio}
            onChange={handleOnChange}
            id="exampleText"
          />
        </FormGroup>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            value={email}
            onChange={handleOnChange}
          />
        </FormGroup>
        <button>Confirm</button>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Website URL</Label>
          <Input
            type="text"
            name="webUrl"
            value={webUrl}
            onChange={handleOnChange}
            id="exampleEmail"
            placeholder="https://"
          />
        </FormGroup>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Twitter</Label>
          <Input
            type="text"
            name="twitterUrl"
            value={twitterUrl}
            onChange={handleOnChange}
            id="exampleEmail"
            className="iconInp"
            placeholder="Enter your Twitter username"
          />
        </FormGroup>
        <i>
          {nightModeStatus ? (
            <BsTwitter style={{ color: "#000000" }} />
          ) : (
            <BsTwitter />
          )}
        </i>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Instagram</Label>
          <Input
            type="text"
            name="instaUrl"
            value={instaUrl}
            onChange={handleOnChange}
            id="exampleEmail"
            className="iconInp"
            placeholder="Enter your Twitter username"
          />
        </FormGroup>
        <i>
          {nightModeStatus ? (
            <FaInstagram style={{ color: "#000000" }} />
          ) : (
            <FaInstagram />
          )}
        </i>
      </div>
      <div
        className={
          props.nightModeStatus ? "savesettingNightMode" : "savesetting"
        }
      >
        <button onClick={handleOnSubmit}>Save Settings</button>
      </div>
    </>
  );
};

export default NftTabs1;
