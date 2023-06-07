import React, { useState } from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { deleteItem, updateItem } from "../../api/menuApi";
import { MenuUpdateComponent } from "./MenuUpdateComponent";
import { Button, Card, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const MenuListItemComponent = (props) => {
  const {
    loginDetails,
    updateItemList,
    trayitems,
    setTrayItem,
    confirmed,
    page,
    categories,
  } = props;
  const { name, description, price, id, imageurl } = props.item;
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(true);
  const [update, setUpdate] = useState(true);
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const navigate = useNavigate();

  const save = (e, values) => {
    e.preventDefault();
    updateItem(values, loginDetails.token)
      .then(() => {
        setShowUpdate(false);
        updateItemList();
      })
      .catch((e) => {
        alert(e);
        setShowUpdate(false);
      });
  };

  const deleteItemf = () => {
    deleteItem(id, loginDetails.token).then(() => {
      updateItemList();
    });
  };

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  useEffect(() => {
    if (page === "tray") {
      setShowAdd(false);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("trayitems", JSON.stringify(trayitems));
  }, [trayitems, update]);

  // >>>>>>>>>>>>>>>>>>>>>>>>Render Filters>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function filterQty() {
    if (page === "viewmenu" || page === "tray") {
      if (showAdd === false) {
        return (
          <Card.Text>
            {!trayitems
              ? price + +"$"
              : trayitems[trayitems.indexOf(props.item, 0)].quantity * price +
                "$"}
          </Card.Text>
        );
      } else {
        return <Card.Text>{price + "$"}</Card.Text>;
      }
    } else {
      return <Card.Text>{price + "$"}</Card.Text>;
    }
  }
  // if you're on tray page instead of description you will get to write a comment
  // for example take an ingredient out of the dish you want
  function swapCommentDescription() {
    if (page === "viewmenu" || page === "craftmenu") {
      return (
        <div className=" w-100 pt-0 pb-1 px-1 d-flex flex-row justify-content-between ">
          <Card.Text className="br-7px mb-0">{description}</Card.Text>
          {filterButtons()}
        </div>
      );
    }
    if (page === "tray") {
      let index = trayitems.indexOf(props.item);
      if (page === "tray" && confirmed === true && confirmed !== undefined) {
        return (
          <div className="w-100 pt-0 pb-1 px-1  ">
            {filterButtons()}

            <p>{trayitems[index].description}</p>
          </div>
        );
      } else {
        return (
          <div className="w-100 pt-0 pb-1 px-1  ">
            {filterButtons()}
            <textarea
              id="itemdesc"
              className="form-control w-100"
              onChange={(e) => (
                (trayitems[index].description = e.target.value),
                setUpdate(!update)
              )}
              value={trayitems[index].description}
              rows={3}
              type="text"
              placeholder="Buraya Yorum Ekleyebilirsiniz"
            ></textarea>
          </div>
        );
      }
    }
  }

  function filterButtons() {
    if (loginDetails.user.role !== "ADMIN" && showAdd === false) {
      if (confirmed === true && confirmed !== undefined) {
        return (
          <div id="qtydiv">
            <div id="qtynum" className="form-control text-center">
              {!trayitems
                ? ""
                : trayitems[trayitems.indexOf(props.item, 0)].quantity}
            </div>
          </div>
        );
      } else {
        return (
          <div id="qtydiv">
            <button
              type="button"
              id="inc-dec"
              onClick={() => handleDecrement(props.item)}
              className="input-group-text"
            >
              -
            </button>
            <div id="qtynum" className="form-control text-center">
              {!trayitems
                ? ""
                : trayitems[trayitems.indexOf(props.item, 0)].quantity}
            </div>
            <button
              type="button"
              id="inc-dec"
              onClick={() => handleIncrement(props.item)}
              className="input-group-text"
            >
              +
            </button>
          </div>
        );
      }
    }
    if (loginDetails.user.role !== "ADMIN" && showAdd === true) {
      return (
        <Button
          onClick={handleAdd}
          id="Lgbtn"
          className="align-self-end btn px-3 py-1"
        >
          Add
        </Button>
      );
    }

    if (loginDetails.user.role === "ADMIN") {
      return (
        <div className="float-end d-flex flex-column">
          <MdDelete onClick={deleteItemf} size={30} />
          <MdModeEditOutline
            onClick={() => {
              setShowUpdate(true);
            }}
            size={30}
          />
        </div>
      );
    }
  }
  // >>>>>>>>>>>>>>>>>>>>>>Add-Inc-Dec>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  function handleAdd() {
    setShowAdd(!showAdd);
    props.item.quantity = 1;
    setTrayItem((prevState) => [...prevState, props.item]);
  }

  const handleDecrement = (e) => {
    let index = trayitems.indexOf(e);
    trayitems[index].quantity = trayitems[index].quantity - 1;
    if (trayitems[index].quantity < 1 && page === "tray") {
      trayitems[index].quantity = 0;
      trayitems.splice(index, 1);
      localStorage.setItem("trayitems", JSON.stringify(trayitems));
      updateItemList();
      if (trayitems.length === 0) {
        alert("Tray Is Empty. You will be redirected to Menu");
        navigate("../menu/usermenu");
      }
    }
    if (trayitems[index].quantity < 1 && page !== "tray") {
      trayitems[index].quantity = 0;
      trayitems.splice(index, 1);
      localStorage.setItem("trayitems", JSON.stringify(trayitems));
      setShowAdd(true);
    }
    setUpdate(!update);
  };

  const handleIncrement = (e) => {
    let index = trayitems.indexOf(e);
    trayitems[index].quantity = trayitems[index].quantity + 1;
    setUpdate(!update);
  };

  function showImageUrl() {
    if (imageurl) {
      return "/Images/" + imageurl;
    } else {
      return "/Images/foodpicture.jpg";
    }
  }

  return (
    <div className="d-flex" id="listitemparent">
      <Card className="flex-fill d-flex flex-row card-horizontal" id="listitem">
        <Card.Img
          id="cardimg"
          variant="left"
          src={showImageUrl()}
          width="70px"
          height="100%"
          style={{ objectFit: "contain" }}
        />
        <Col>
          <Card.Body className="d-flex flex-row align-items-baseline justify-content-between pt-1 px-1 pb-0">
            <Card.Title>{name}</Card.Title>
            {filterQty()}
          </Card.Body>
          {swapCommentDescription()}
        </Col>
      </Card>
      {/* only for admin */}
      <MenuUpdateComponent
        save={save}
        item={props.item}
        showUpdate={showUpdate}
        setShowUpdate={setShowUpdate}
        categories={categories}
      />
    </div>
  );
};
