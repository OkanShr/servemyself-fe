import React from "react";
import "../../App.css";
export const UserDetailsComponent = (props) => {
  const { username, role } = props.user;

  return (
    <div className="card mt-3  bg-transparent border-0">
      <h1 className="font-weight-bold"> {`Welcome ${username}`} </h1>
    </div>
  );
};
