import React, { Component, useState, useEffect } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import profBanImg from '../../../../../assets/profile-banner.png'
import profThumImg from '../../../../../assets/nft-img2.png'
import { BsFileEarmarkImage, BsTwitter } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import Axios from "axios"
import { toast } from 'react-toastify';

const NftTabs1 = (props) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState("")
    const [shortBio, setShortBio] = useState("")
    const [webUrl, setWebUrl] = useState("")
    const [twitterUrl, setTwitterUrl] = useState("")
    const [instaUrl, setInstaUrl] = useState("")
    const [profileImg, setProfileImg] = useState()
    const [bannerImg, setBannerImg] = useState()

    useEffect(() => {
        getUserInfo()
    }, [])
    const getUserInfo = () => {
        Axios.get("user/userInfo", { headers: { authorization: localStorage.getItem('accessJWT') } })
            .then((response) => {
                // setLoading(false)
                
                setFirstName(response.data.userInfo[0].name)
                setEmail(response.data.userInfo[0].email)
                setUserName(response.data.userInfo[0].userName)
                setShortBio(response.data.userInfo[0].shortBio)
                setWebUrl(response.data.userInfo[0].websiteUrl)
                setTwitterUrl(response.data.userInfo[0].twitterUrl)
                setInstaUrl(response.data.userInfo[0].InstagramUrl)

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
            .catch((error) => {
                
            })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'userName':
                setUserName(value);
                break;
            case 'shortBio':
                setShortBio(value);
                break;
            case 'webUrl':
                setWebUrl(value);
                break;
            case 'twitterUrl':
                setTwitterUrl(value);
                break;
            case 'instaUrl':
                setInstaUrl(value);
                break;
            default:
                break;
        }
    };

    const handleOnSubmit = () => {
        const formdata = {
            name: firstName,
            email,
            userName,
            shortBio,
            websiteUrl: webUrl,
            twitterUrl,
            InstagramUrl: instaUrl,
            profileImg,
            bannerImg
        }

        Axios.patch("/user/updateUser", formdata, { headers: { authorization: localStorage.getItem('accessJWT') } })
            .then((response) => {

                
                if (response.data.status === "success") {
                    toast.success("User has been Updated", {
                        position: "top-right"
                    })
                } else {
                    toast.error("User can't be Updated", {
                        position: "top-right"
                    })
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
            })
    }

    return (
        <>
            <div className='accHd bold'>Account Settings</div>
            <div className='profileBannerBx'>
                <div className='profBanner'>
                    <img src={bannerImg ? URL.createObjectURL(bannerImg) : profBanImg} alt='' />
                    <span>
                        <BsFileEarmarkImage />
                        <Input
                            type='file'
                            name='file'
                            onChange={(e) => setBannerImg(e.target.files[0])}
                        />

                    </span>
                    <i>
                        <img src={profileImg ? URL.createObjectURL(profileImg) : profThumImg} alt='' />
                        <span>
                            <BsFileEarmarkImage />
                            <Input type='file'
                                name='file'
                                onChange={(e) => setProfileImg(e.target.files[0])}
                            />

                        </span>
                    </i>
                </div>
            </div>
            <div className='dispBx'>
                <FormGroup>
                    <Label for="exampleEmail">Display Name</Label>
                    <Input type="text" name="firstName" id="exampleEmail" value={firstName} onChange={handleOnChange} />
                </FormGroup>
            </div>
            <div className='dispBx'>
                <FormGroup>
                    <Label for="exampleEmail">Username</Label>
                    <Input type="text" name="userName" id="exampleEmail" value={userName} onChange={handleOnChange} />
                </FormGroup>
                <span>Your profile will be available on rarible.com/[username]</span>
            </div>
            <div className='dispBx'>
                <FormGroup>
                    <Label for="exampleEmail">Short Bio</Label>
                    <Input type="text" name="shortBio" value={shortBio} onChange={handleOnChange} id="exampleText" />
                </FormGroup>
            </div>
            <div className='dispBx'>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" value={email} onChange={handleOnChange} />
                </FormGroup>
                <button>Confirm</button>
            </div>
            <div className='dispBx'>
                <FormGroup>
                    <Label for="exampleEmail">Website URL</Label>
                    <Input type="text" name="webUrl" value={webUrl} onChange={handleOnChange} id="exampleEmail" placeholder='https://' />
                </FormGroup>
            </div>
            <div className='dispBx'>
                <FormGroup>
                    <Label for="exampleEmail">Twitter</Label>
                    <Input type="text" name="twitterUrl" value={twitterUrl} onChange={handleOnChange} id="exampleEmail" className='iconInp' placeholder='Enter your Twitter username' />
                </FormGroup>
                <i><BsTwitter /></i>
            </div>
            <div className='dispBx'>
                <FormGroup>
                    <Label for="exampleEmail">Instagram</Label>
                    <Input type="text" name="instaUrl" value={instaUrl} onChange={handleOnChange} id="exampleEmail" className='iconInp' placeholder='Enter your Twitter username' />
                </FormGroup>
                <i><FaInstagram /></i>
            </div>
            <div className={props.nightModeStatus ? 'savesettingNightMode' : 'savesetting'}>
                <button onClick={handleOnSubmit}>Save Settings</button>
            </div>
        </>
    )


}

export default NftTabs1