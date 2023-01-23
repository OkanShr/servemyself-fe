import React from "react";

export const UserDetailsComponent = (props) => {
  const { username, name, surname, mail, role } = props.user;

  return (
    <div className="card mb-2 mt-2 p-2 bg-dark">
      <h3 className="font-weight-bold text-white"> {`${role} - ${username}`} </h3>

    </div>
  );
};
