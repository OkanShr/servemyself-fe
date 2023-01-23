import { ListGroup} from "react-bootstrap";
import { MenuListItemComponent } from "./MenuListItemComponent";
import {useState} from 'react'

export const MenuListComponent = (props) => {
  const { loginDetails, updateItemList, items,trayitems,setTrayItem,page} = props;

  //this is just a usestate to rerender- fixes the bug where numbers didnt change
  const [update,setUpdate] = useState(false)

  return (
   
    <ListGroup className="gap-1" >
      {
        
      items?
      items
        .map((x) => (
          
            <MenuListItemComponent key={x.id}
              updateItemList={updateItemList}
              loginDetails={loginDetails}
              item={x}
              trayitems={trayitems}
              page={page}
              setTrayItem={setTrayItem}
              // getIndex={getIndex}
              update={update}
              setUpdate={setUpdate}
            />
          
        )): ""}
    </ListGroup>
  );
};
