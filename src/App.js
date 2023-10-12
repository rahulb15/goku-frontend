import axios from 'axios';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.scss";
import Layout from './layout/layout';

axios.defaults.baseURL = process.env.REACT_APP_NODE_URL;
export default class App extends Component {

  render() {
    return (
      <div>
        <Layout />
        <ToastContainer />
      </div>
    )
  }
}


