import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="nav">
      <Link className="navlist" to="/">
        Home
      </Link>
      <Link className="navlist" to="/users_data">
        User List
      </Link>
    </div>
  );
};

export default Navigation;
