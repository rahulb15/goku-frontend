//import React, { Component } from 'react'
import { FormGroup, Input, Label } from "reactstrap";

const SubmitRequestTab1 = () => {
  return (
    <div className="subReqBx">
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Your email address*</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Enter your email address"
          />
        </FormGroup>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">My Account has an issue*</Label>
          <Input type="select" name="select" id="exampleSelect" disabled>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Subject*</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="Select or search for a vulnerability type"
          />
        </FormGroup>
      </div>
      <div className="dispBx">
        <FormGroup>
          <Label for="exampleEmail">Description*</Label>
          <Input type="textarea" name="text" placeholder="Discription" />
        </FormGroup>
      </div>
      <div className="dispBx">
        <div className="attactBtn">
          <button>Add attachments</button>
          <FormGroup>
            <Input type="file" name="file" id="exampleFile" />
          </FormGroup>
        </div>
      </div>

      <div className="savesetting">
        <button>Submit</button>
      </div>
    </div>
  );
};

export default SubmitRequestTab1;
