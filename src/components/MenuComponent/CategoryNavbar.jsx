import React from "react";
import { Button } from "react-bootstrap";
import "../../App.css";
import { MdAutorenew } from "react-icons/md";

export const CategoryNavbar = (props) => {
  const { categories, setSelectedCategory } = props;

  return (
    <nav className="nav" id="CategoryNavbar">
      <MdAutorenew
        className="mt-1 pt-1 "
        size="25px"
        onClick={() => {
          setSelectedCategory("");
        }}
        id="CategoryNavButton"
      ></MdAutorenew>
      {categories
        ? categories.map((x) => (
            <Button
              key={x.id}
              onClick={() => {
                setSelectedCategory(x.categoryname);
              }}
              id="CategoryNavButton"
            >
              {x.categoryname}
            </Button>
          ))
        : ""}
    </nav>
  );
};
