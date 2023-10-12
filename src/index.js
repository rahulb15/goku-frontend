import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// let persistor = persistStore(store);
// root.render(

//   <React.StrictMode>

//     <BrowserRouter>
//     <Provider store={store}>
//     <PersistGate persistor={persistor}>
//       <App />
//       </PersistGate>
//       </Provider>
//     </BrowserRouter>

//   </React.StrictMode>
// );

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
