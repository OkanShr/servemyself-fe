import React from "react";
import { Modal } from "react-bootstrap";

export const OrderPeekComponent = (props) => {
  const { showPeek, setShowPeek, order, ordertable, orderdate } = props;
  const handleClose = () => setShowPeek(false);

  function getTotal() {
    let totalprice = 0;
    order.forEach((x) => {
      totalprice = totalprice + x.quantity * x.price;
    });
    return totalprice;
  }

  return (
    <Modal
      show={showPeek}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Order of : {ordertable}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {order.map(({ id, quantity, name, price, description }) => (
          <div key={id}>
            <p id="itemname">
              {quantity} x {name} Notes: {description}
            </p>
            <p id="itemprice">{price * quantity}$</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <div id="itemname">
          Date: {orderdate.substring(0, orderdate.length - 29)}
        </div>

        <div id="itemname">Total: {getTotal()}$</div>
      </Modal.Footer>
    </Modal>
  );
};
