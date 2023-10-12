import React from "react";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import "./my-wishlist.scss";
import WishlistTable from "./wishlisttable";
//import { Link } from "react-router-dom";

const MyWishlist = () => {
  return (
    <div>
      <Header />
      <div className="faqOuter">
        <div className="container">
          <div className="wishlistHd">
            <h2 className="bold">My Watchlist</h2>
          </div>
          <div className="wishlistOuter">
            <WishlistTable />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyWishlist;
