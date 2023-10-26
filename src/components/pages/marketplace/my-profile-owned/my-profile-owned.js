import React, { useEffect,useState } from 'react'
import HeaderafterLogin from '../../../common-components/marketplace-header-after-login/marketplace-header-after-login'
import { MarketplaceFooter } from '../../../common-components/marketplace-footer/marketplace-footer'
import ProfileListingTab from './profile-listing-tab'
import { FaDiscord, FaKickstarterK } from "react-icons/fa";
import { BsFillShareFill, BsGlobe, BsTwitter, BsInstagram } from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link } from "react-router-dom"
import CreatorImg from '../../../../assets/nft-img2.png'
import "./my-profile-owned.scss"
import Background from '../../../../assets/profile-banner.png'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Axios from "axios";

const CommunityMarketplace = () => {
    const { walletAddress, userName } = useSelector(
        (state) => state.walletStatus
    );
    const [userDetails, setUserDetails] = useState([])


    useEffect(() => {
        Axios.get("user/userInfo", {
            headers: { authorization: localStorage.getItem("accessJWT") },
          })
            .then((response) => {
                setUserDetails(response.data.userInfo[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    console.log(userDetails, "userDetails")
    


    const copyToClipboard = () => {
        navigator.clipboard.writeText(walletAddress)
        toast.success("Copied to clipboard")
    }

    const shareToClipboard = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Copied to clipboard")
    }

    const shareToTwitter = () => {
        window.open("https://twitter.com/intent/tweet?text=" + window.location.href)
    }
    const shareToInstagram = () => {
        window.open("https://www.instagram.com/")
    }
    const shareToDiscord = () => {
        window.open("https://discord.com/")
    }

    
        

    return (
        <div>
            {/* <MarketplaceHeader /> */}
            <HeaderafterLogin />
            <div className='creatorOuterBx' style={{ background: `url(${userDetails?.coverPhoto ? userDetails?.coverPhoto : Background})`, }}>
                <div className='container'>
                    <div className='creatorDetBx'>
                        <div className='creatorImg'>
                            <img src={userDetails?.profilePicture ? userDetails?.profilePicture : CreatorImg} alt="" />
                        </div>
                        <div className='creatorDet'>
                            <div className='creatorNameOuter'>
                                <div className='creatorName'>{userName}</div>
                                <div className='wishlist'>
                                    <span>
                                        <BsGlobe style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={()=>{window.open(window.location.href)}}/>
                                        <BsTwitter style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToTwitter}/>
                                        <BsInstagram style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToInstagram}/>
                                        <FaDiscord style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToDiscord}/>
                                    </span>
                                    <button onClick={shareToClipboard}
                                    ><BsFillShareFill /></button>
                                </div>
                            </div>

                            <div className='kryptoCont'>
                                {/* {userDetails?.shortBio}  if length is > 100 word then show read more button */}
                                {userDetails?.shortBio && userDetails?.shortBio.length > 500 ? userDetails?.shortBio.slice(0, 100) + '...' : userDetails?.shortBio}
                            </div>
                            <div className='editProf_Outer' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Link to='/marketplace/profile-setting'>Edit Profile</Link>
                                <span>
                                    <FaKickstarterK /> &nbsp;
                                    {walletAddress.slice(0, 8) + '...' + walletAddress.slice(34, 42)}  &nbsp;
                                    <MdOutlineContentCopy onClick={copyToClipboard} style={{ cursor: 'pointer' }} />
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='creatortabOuter'>
                    <div className='container'>
                        <ProfileListingTab />
                    </div>
                </div>
            </div>
            <MarketplaceFooter />
        </div>
    )
}

export default CommunityMarketplace