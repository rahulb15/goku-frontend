import React, { Component } from "react";
// import Slider from 'react-range';
import { Range, getTrackBackground } from "react-range";

class RangeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 0,
    };
  }

  handleChangeStart = () => {
    
  };

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  handleChangeComplete = () => {
    
  };

  render() {
    const { value } = this.state;
    return (
      <div className="slider">
        {/* <Slider
          min={0}
          max={100000}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        /> */}

        <Range
          values={[value]}
          step={1}
          min={0}
          max={100000}
          onChange={this.handleChange}
          onFinalChange={this.handleChangeComplete}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  background: getTrackBackground({
                    values: [value],
                    colors: ["#FF0000", "#ccc"],
                    min: 0,
                    max: 100000,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              // style={{
              //   ...props.style,
              //   height: "42px",
              //   width: "42px",
              //   borderRadius: "4px",
              //   backgroundColor: "#FFF",
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   boxShadow: "0px 2px 6px #AAA"
              // }}
            >
              <div
              // style={{
              //   height: "16px",
              //   width: "5px",
              //   backgroundColor: "#FF0000"
              // }}
              />
            </div>
          )}
        />

        <div className="value">{value} KDM</div>
        <div className="fixvalue">100k KDM</div>
      </div>
    );
  }
}

export default RangeSlider;
