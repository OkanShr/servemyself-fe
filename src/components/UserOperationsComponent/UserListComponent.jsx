import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { UserListItemComponent } from "./UserListItemComponent";

export const UserListComponent = (props) => {
  const { loginDetails, updateUserList, users } = props;

  return (
    <ListGroup className="gap-1 p-2">
      {users
        .slice(1)
        .map((x) => (
          <ListGroupItem key={x.id}>
            <UserListItemComponent
              updateUserList={updateUserList}
              loginDetails={loginDetails}
              user={x}
            />
          </ListGroupItem>
        ))}
    </ListGroup>
  );
};
