import { ListGroup} from "react-bootstrap";
import { MenuListItemComponent } from "./MenuListItemComponent";
import {useState} from 'react'

export const MenuListComponent = (props) => {
  const { loginDetails, updateItemList, items,trayitems,setTrayItem, page , categories ,selectedcategory} = props;

  //this is just a usestate to rerender- fixes the bug where numbers didnt change
  const [update,setUpdate] = useState(false)

  return (
   
    <ListGroup className="gap-1" >
      {
        
      items?
      items
      .slice(0).reverse().map((x) => {
        if(selectedcategory === "")
          return(
          <MenuListItemComponent key={x.id}
            updateItemList={updateItemList}
            loginDetails={loginDetails}
            item={x}
            trayitems={trayitems}
            page={page}
            setTrayItem={setTrayItem}
            update={update}
            setUpdate={setUpdate}
            categories={categories}
          />)
        if(selectedcategory === x.category  )
          return(
            <MenuListItemComponent key={x.id}
              updateItemList={updateItemList}
              loginDetails={loginDetails}
              item={x}
              trayitems={trayitems}
              page={page}
              setTrayItem={setTrayItem}
              update={update}
              setUpdate={setUpdate}
              categories={categories}
            />
          )
        
        if(loginDetails.user.role==="ADMIN")
        return(
          <MenuListItemComponent key={x.id}
              updateItemList={updateItemList}
              loginDetails={loginDetails}
              item={x}
              trayitems={trayitems}
              page={page}
              setTrayItem={setTrayItem}
              update={update}
              setUpdate={setUpdate}
              categories={categories}
            />
        )
      }
      ): ""}
    </ListGroup>
  );
};
