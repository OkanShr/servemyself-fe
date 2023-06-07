import { ListGroup } from "react-bootstrap";
import { OrderListItemComponent } from "./OrderListItemComponent";

export const OrderListComponent = (props) => {
  const {
    loginDetails,
    updateOrderList,
    orders,
    update,
    setUpdate,
    showSelf,
    searchInput,
  } = props;

  return (
    <ListGroup className="gap-1" id="orderdiv">
      {orders
        ? orders
            .slice(0)
            .reverse()
            .map((x) => {
              if (x.ordertable.startsWith(searchInput))
                return (
                  <OrderListItemComponent
                    key={x.orderdate}
                    showSelf={showSelf}
                    loginDetails={loginDetails}
                    item={x}
                    update={update}
                    setUpdate={setUpdate}
                    updateOrderList={updateOrderList}
                  />
                );
              if (searchInput === "" || searchInput === undefined)
                return (
                  <OrderListItemComponent
                    key={x.orderdate}
                    showSelf={showSelf}
                    loginDetails={loginDetails}
                    item={x}
                    update={update}
                    setUpdate={setUpdate}
                    updateOrderList={updateOrderList}
                  />
                );
            })
        : ""}
    </ListGroup>
  );
};
