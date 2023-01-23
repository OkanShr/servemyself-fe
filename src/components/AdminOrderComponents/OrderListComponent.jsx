import { ListGroup} from "react-bootstrap";
import {useState} from 'react'
import {OrderListItemComponent} from './OrderListItemComponent'

export const OrderListComponent = (props) => {
  const { loginDetails, updateOrderList,orders,update,setUpdate,showSelf} = props;
  

  return (
   
    <ListGroup className="gap-1" id="orderdiv">
      
      {
        orders?
        orders
        .map((x) => (
          
            <OrderListItemComponent key={x.id}
              showSelf={showSelf}
              loginDetails={loginDetails}
              item={x}
              update={update}
              setUpdate={setUpdate}
              updateOrderList={updateOrderList}

            />
          
        )): ""}
    </ListGroup>
  );
};
