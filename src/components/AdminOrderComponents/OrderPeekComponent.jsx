import React, {useState} from "react";
import { Button, Form, Modal } from "react-bootstrap";

export const OrderPeekComponent = (props) => {
  const { showPeek, setShowPeek,order,ordertable,orderdate } = props;
  const handleClose = () => setShowPeek(false);
  const [totalprice,setTotalPrice] = useState(0)
  
  function getTotal(){
    let totalprice = 0;
    order.forEach(x => {
      totalprice = totalprice + x.quantity * x.price
      
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
      <Modal.Title>Order of Table {ordertable}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {order.map(({id,quantity, name ,price})=>(
        
        <div key={id}>
          <p id="itemname">{quantity}x {name}</p>
          <p id="itemprice">{price*quantity}$</p>
        </div>

      ))}
    </Modal.Body>
    <Modal.Footer>
    <div id="itemname">Total: {getTotal()}$</div>
    </Modal.Footer>
  </Modal>
);
};