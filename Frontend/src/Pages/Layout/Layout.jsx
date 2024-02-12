import "./Layout.scss";
import { Outlet } from "react-router-dom";
import { createContext, useState, useEffect } from "react";

import { getAllCountry } from "../../Services/Country.Service";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

export const globalContext = createContext(null)

export function Layout() {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    getAllCountry()
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <globalContext.Provider value={{countries, setCountries}}>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </globalContext.Provider>
  );
}
