import $ from "jquery";
import React, { Component } from "react";

export default class Home extends Component {
  componentDidMount() {
    redrawDotNav();
    $(window).bind("scroll", function (e) {
      redrawDotNav();
    });
    $(".bullet1").click(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        500
      );
      return false;
    });
    $(".bullet2").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#slide2").offset().top - 0,
        },
        500
      );
      return false;
    });
    $(".bullet3").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#slide3").offset().top - 0,
        },
        500
      );
      return false;
    });
    $(".bullet4").click(function () {
      $("html, body").animate(
        {
          scrollTop: $("#slide4").offset().top - 0,
        },
        500
      );
      return false;
    });

    /* Set navigation dots to an active state as the user scrolls */
    function redrawDotNav() {
      var section1Top = 0;
      // The top of each section is offset by half the distance to the previous section.
      // var section2Top =  $('#slide2').offset().top - (($('#slide3').offset().top - $('#slide2').offset().top) / 4);
      // var section3Top =  $('#slide3').offset().top - (($('#slide4').offset().top - $('#slide3').offset().top) / 4);
      // var section4Top =  $('#slide4').offset().top - (($(document).height() - $('#slide4').offset().top) / 4);
      var section1Top = 0;
      var section2Top = $("#slide2").length
        ? $("#slide2").offset()
          ? $("#slide2").offset().top -
            ($("#slide3").offset().top - $("#slide2").offset().top) / 4
          : null
        : null;
      var section3Top = $("#slide3").length
        ? $("#slide3").offset()
          ? $("#slide3").offset().top -
            ($("#slide4").offset().top - $("#slide3").offset().top) / 4
          : null
        : null;
      var section4Top = $("#slide4").length
        ? $("#slide4").offset()
          ? $("#slide4").offset().top -
            ($(document).height() - $("#slide4").offset().top) / 4
          : null
        : null;

      $(".bulletNav li a").removeClass("active");
      if (
        $(document).scrollTop() >= section1Top &&
        $(document).scrollTop() < section2Top
      ) {
        $(".bulletNav .bullet1").addClass("active");
      } else if (
        $(document).scrollTop() >= section2Top &&
        $(document).scrollTop() < section3Top
      ) {
        $(".bulletNav .bullet2").addClass("active");
      } else if (
        $(document).scrollTop() >= section3Top &&
        $(document).scrollTop() < section4Top
      ) {
        $(".bulletNav .bullet3").addClass("active");
      } else if ($(document).scrollTop() >= section4Top) {
        $(".bulletNav .bullet4").addClass("active");
      }
    }
  }

  render() {
    return (
      <div>
        <div className="bulletNav">
          <ul>
            <li>
              <a className="bullet1" href="#slide1">
                0
              </a>
            </li>
            <li>
              <a className="bullet2" href="#slide2">
                1
              </a>
            </li>
            <li>
              <a className="bullet3" href="#slide3">
                2
              </a>
            </li>
            <li>
              <a className="bullet4" href="#slide4">
                3
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
