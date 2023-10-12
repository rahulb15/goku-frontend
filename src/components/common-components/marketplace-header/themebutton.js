import React, { Component } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import Switch from "react-switch";
import { Button } from "reactstrap";

class ThemeButton extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }
  componentDidUpdate() {
    if (this.state.checked) {
      document.body.classList.add("darkTheme");
    } else {
      document.body.classList.remove("darkTheme");
    }
  }

  render() {
    return (
      <div className="darkmodeBtn modeBtnMP">
        <Button className="webModeBtn lightMode onChange={this.handleChange}">
          <BsFillSunFill className="sunIcon" />
          <BsFillMoonFill className="moonIcon" />
        </Button>
        <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
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
  }
}

export default ThemeButton;
