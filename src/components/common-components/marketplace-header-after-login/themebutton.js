import React, { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { Button } from "reactstrap";
import { nightModeStatusUpdate } from "../../common-components/header/nightModeAction";

const ThemeButton = () => {
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

  return (
    <div className="darkmodeBtn modeBtnMP">
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
  );
};

export default ThemeButton;
