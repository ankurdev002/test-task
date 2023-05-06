import React from "react";
import Navigation from "./Navigation";
import Form from "./Form";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Form />
      <Outlet />
    </>
  );
};

export default HomePage;
