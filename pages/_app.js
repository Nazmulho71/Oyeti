// import '../styles/globals.css'
import React from "react";
import App from "next/app";
import "../styles/global.css";
import "../styles/bill.css";
import "../styles/coupon.css";
import "../styles/home.css";
import "../styles/my-order.css";
import "../styles/manageaddress.css";
import "../styles/add-address.css";
import "../styles/shop-list.css";
import "../styles/profile.css";
import "../styles/myOrder.css";
import "../styles/payBill.css";
import "../styles/paymentOptuins.css";
import "../styles/prod-details-customisation.css";
import "../styles/prod-details.css";
import "../styles/payWithcard.css";
import "../styles/SwipeableButton.css";
import storeData from "../store";
import withRedux from "next-redux-wrapper";
import { Provider, connect } from "react-redux";
import "../styles/getStarted.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

import { _intiatDataBase } from "../lib/helpers/db";
import Loader from "../components/loader/loader";

class Index extends App {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    _intiatDataBase();

    if (process.browser) {
      function bordNav() {
        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll(".showCat a");

        sections.forEach((section) => {
          section.addEventListener("touchend", () => {
            const id = this.getAttribute("id");
            const navActive = document.querySelector(`a[href="#${id}"]`);
            navLinks.forEach((link) => link.classList.remove("activeCat"));
            navActive.classList.add("activeCat");
            navActive.scrollIntoView({
              behavior: "smooth",
              inline: "center",
            });
          });
        });
        console.log("navLinks -->", navLinks);
      }

      bordNav();
    }
  }

  // componentWillMount() {

  // }

  componentWillMount() {
    if (process.browser) {
      const theme = localStorage.getItem("theme");
      const root = document.getElementsByTagName("body")[0];

      root.className = "";

      if (theme === "dark") root.className = "dark";
      else root.className = "light";
    }
  }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps: pageProps };
  }

  render() {
    let isLoading = storeData.getState().isLoading;
    isLoading = true;
    const { Component, pageProps } = this.props;

    return (
      <Provider store={storeData}>
        <Loader isLoading={isLoading} store={storeData} />
        <Component {...pageProps} store={storeData} />
      </Provider>
    );
  }
}

const makeStore = () => storeData;

export default withRedux(makeStore)(Index);
