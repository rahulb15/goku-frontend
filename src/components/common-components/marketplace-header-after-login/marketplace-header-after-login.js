import React, { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { Button } from "reactstrap";
import Moblogo from "../../../assets/LogoIcon.png";
import DarkLogo from "../../../assets/logo-white.png";
import LightLogo from "../../../assets/logo.png";
import ConnectPopup from "../../pages/home/connect-wallet-popup/connect-wallet-popup";
import Menu from "../header-inner/menu";
import { nightModeStatusUpdate } from "../header/nightModeAction";
import "./marketplace-header-after-login.scss";

const HeaderAfterLogin = () => {
  const dispatch = useDispatch();
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      myFunction();
    };
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    setChecked(nightModeStatus);
  }, []);

  useEffect(() => {
    if (checked) {
      document.body.classList.add("darkTheme");
      dispatch(nightModeStatusUpdate(checked));
    } else {
      document.body.classList.remove("darkTheme");
      dispatch(nightModeStatusUpdate(checked));
    }
  }, [checked]);
  // componentDidMount(){
  //     window.onscroll = function() {myFunction()};
  //     var header = document.getElementById("myHeader");
  //     var sticky = header.offsetTop;
  //     function myFunction() {
  //         if (window.pageYOffset > sticky) {
  //             header.classList.add("sticky");
  //         } else {
  //             header.classList.remove("sticky");
  //         }
  //     }
  // }

  const handleChange = (checked) => {
    setChecked(checked);
  };

  // return (
  //   <>
  //     <header id="myHeader" className="marketplaceHeader">
  //       <div className="container" style={{ marginTop: "20px" }}>
  //         <div className="hdrInn mktplcHdr">
  //           <div className="logoBx">
  //             <Link to="/">
  //               <img src={Logo} alt="" className="webLogo logoblack" />
  //               <img src={Moblogo} alt="" className="MobLogo" />
  //               <img className="logowhite" src={LogoWhite} alt="" />
  //             </Link>
  //           </div>
  //           <div className="menuBx">
  //           <div className='Nav bold'>
  //                                 <Menu />
  //                               </div>
  //             <div className="hdrtokenBx">
  //               {/* <div className='butoknBx'><Link to='/marketplace/create-nft' className='buytoken'>Create</Link></div> */}
  //               {/* <div className='butoknBx'><a href='/marketplace/create-nft' className='buytoken'>Create</a> </div> */}
  //               <div className="cartBx">
  //                 <a href="/" className="CartBtn">
  //                   <MdNotifications />
  //                 </a>
  //               </div>
  //               <div className="cartBx">
  //                 <a href="/marketplace/cart" className="CartBtn">
  //                   <BsFillCartFill />
  //                 </a>
  //               </div>
  //               <div className="myaccountBx">
  //                 <MarketplaceAccount />
  //               </div>
  //               <div className="menuBtn">
  //                 <MarketplaceNav />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </header>
  //   </>
  // );
  return (
    <>
      <header id="myHeader">
        <div className="container">
          <div className="hdrInn">
            {/* <div className='logoBx'><Link to='/'><img src={Logo} alt='' className='webLogo logoblack' /><img src={Moblogo} alt='' className='MobLogo' /><img className='logowhite' src={LogoWhite} alt='' /></Link></div> */}
            <div className="logoBx">
              <Link to="/">
                <img src={LightLogo} alt="" className="webLogo logoblack" />
                <img src={Moblogo} alt="" className="MobLogo" />
                <img className="logowhite" src={DarkLogo} alt="" />
              </Link>
            </div>
            <div className="menuBx">
              <div className="Nav bold">
                <Menu />
              </div>
              <div className="hdrtokenBx">
                {/* <div className='butoknBx'><Link className='buytoken' to="/toknomics">Buy Token</Link></div> */}
                <div className="conPopupBtn">
                  <ConnectPopup />
                </div>
                {/* <div className='conPopupBtn'>
                      <FormGroup>
                          <Input type="select" name="select" id="exampleSelect">
                              <option>Connect</option>
                              <option>Disconnect</option>
                          </Input>
                      </FormGroup>
                      <i><MdKeyboardArrowDown /></i>
                  </div> */}

                {/* <div className='myaccountBx'><MarketplaceAccount /></div> */}
                <div className="darkmodeBtn">
                  <Button className="webModeBtn lightMode onChange={handleChange}">
                    <BsFillSunFill className="sunIcon" />
                    <BsFillMoonFill className="moonIcon" />
                  </Button>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    onColor="#fa457c"
                    onHandleColor="#cc285a"
                    handleDiameter={0}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={10}
                    width={10}
                    className="react-switch"
                    id="material-switch"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderAfterLogin;

// import React, { Component, useEffect } from "react";
// import { Button } from "reactstrap";
// import { BsFillCartFill } from "react-icons/bs";
// import { MdNotifications } from "react-icons/md";
// import Logo from "../../../assets/logo.png";
// import LogoWhite from "../../../assets/logo-white.png";
// import Moblogo from "../../../assets/LogoIcon.png";
// import MarketplaceNav from "../marketplace-header/marketplacenav";
// import MarketplaceAccount from "./marketplace-account";
// import { Link } from "react-router-dom";
// import Menu from '../header-inner/menu'

// import "./marketplace-header-after-login.scss";

// const HeaderAfterLogin = () => {
//   useEffect(() => {
//     window.onscroll = function () {
//       myFunction();
//     };
//     var header = document.getElementById("myHeader");
//     var sticky = header.offsetTop;
//     function myFunction() {
//       if (window.pageYOffset > sticky) {
//         header.classList.add("sticky");
//       } else {
//         header.classList.remove("sticky");
//       }
//     }
//   }, []);

//   return (
//     <>
//       <header id="myHeader" className="marketplaceHeader">
//         <div className="container">
//           <div className="hdrInn mktplcHdr">
//             <div className="logoBx">
//               <Link to="/">
//                 <img src={Logo} alt="" className="webLogo logoblack" />
//                 <img src={Moblogo} alt="" className="MobLogo" />
//                 <img className="logowhite" src={LogoWhite} alt="" />
//               </Link>
//             </div>
//             <div className="menuBx">
//               <div className="hdrtokenBx">

//               {/* <div className='menuBx'> */}
//                                 <div className='Nav bold'>
//                                     <Menu />
//                                 </div>
//                             {/* </div> */}
//                 {/* <div className='butoknBx'><Link to='/marketplace/create-nft' className='buytoken'>Create</Link></div> */}
//                 <div className="cartBx">
//                   <Link to="/" className="CartBtn">
//                     <MdNotifications />
//                   </Link>
//                 </div>
//                 <div className="cartBx">
//                   <Link to="/marketplace/cart" className="CartBtn">
//                     <BsFillCartFill />
//                   </Link>
//                 </div>
//                 <div className="myaccountBx">
//                   <MarketplaceAccount />
//                 </div>
//                 <div className="menuBtn">
//                   <MarketplaceNav />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// };

// export default HeaderAfterLogin;
