import $ from "jquery";
import React, { useEffect } from "react";
import { Col, Row } from "reactstrap";
import ToknoImg from "../../../../assets/circle-img.png";
import ToknoImg1 from "../../../../assets/circle-img1.png";
import ToknoImg10 from "../../../../assets/circle-img10.png";
import ToknoImg2 from "../../../../assets/circle-img2.png";
import ToknoImg3 from "../../../../assets/circle-img3.png";
import ToknoImg4 from "../../../../assets/circle-img4.png";
import ToknoImg5 from "../../../../assets/circle-img5.png";
import ToknoImg6 from "../../../../assets/circle-img6.png";
import ToknoImg7 from "../../../../assets/circle-img7.png";
import ToknoImg8 from "../../../../assets/circle-img8.png";
import ToknoImg9 from "../../../../assets/circle-img9.png";
import Tooltip1 from "./tooltip1";
import Tooltip2 from "./tooltip2";

const Toknomics = () => {
  useEffect(() => {
    $(".toknoBtn1").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape1").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn2").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape2").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn3").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape3").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn4").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape4").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn5").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape5").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn6").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape6").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn7").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape7").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn8").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape8").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn9").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape9").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn10").click(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape10").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn1").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape1").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn2").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape2").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn3").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape3").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn4").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape4").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn5").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape5").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn6").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape6").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn7").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape7").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn8").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape8").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn9").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape9").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
    $(".toknoBtn10").hover(function () {
      $(".toknoIcon").css("display", "none");
      $(".shape10").css("display", "inline-block");
      $(".toknLst").removeClass("active");
      $(this).addClass("active");
    });
  });

  return (
    <div>
      <div className="toknomics_Outer" id="slide6">
        <div className="container">
          <div className="stepBx">
            <i></i>
            <span>5</span>
          </div>
          <div className="mainHd">
            <h3 className="bold">Tokens</h3>
            <h2 className="extrabold">Tokenomics</h2>
          </div>
          <div className="toknolistOuter">
            <Row className="toknoOuter">
              <Col md="4" lg="3">
                <Tooltip1 />
              </Col>
              <Col md="4" lg="6" className="toknoImg">
                <img
                  src={ToknoImg}
                  className="toknoIcon"
                  style={{ display: "inline-block" }}
                  alt=""
                />
                <img src={ToknoImg1} className="toknoIcon shape1" alt="" />
                <img src={ToknoImg2} className="toknoIcon shape2" alt="" />
                <img src={ToknoImg3} className="toknoIcon shape3" alt="" />
                <img src={ToknoImg4} className="toknoIcon shape4" alt="" />
                <img src={ToknoImg5} className="toknoIcon shape5" alt="" />
                <img src={ToknoImg6} className="toknoIcon shape6" alt="" />
                <img src={ToknoImg7} className="toknoIcon shape7" alt="" />
                <img src={ToknoImg8} className="toknoIcon shape8" alt="" />
                <img src={ToknoImg9} className="toknoIcon shape9" alt="" />
                <img src={ToknoImg10} className="toknoIcon shape10" alt="" />

                <div className="totalCoin">
                  <span className="medium">Total Supply</span>
                  <strong className="bold">100 million KDM</strong>
                </div>
              </Col>
              <Col md="4" lg="3">
                <Tooltip2 />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toknomics;
