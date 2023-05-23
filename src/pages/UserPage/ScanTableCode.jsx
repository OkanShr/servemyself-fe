import React , {useState,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserDetailsComponent } from "../../components/UserDetailsComponent/UserDetailsComponent";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import '../../App.css';
import { QrReader } from 'react-qr-reader';
import { logout } from "../../store/authentication";


export const ScanTableCode = () => {
  const loginDetails = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirm,setConfirm] = useState(false)
  const [tablenumber,setTablenumber] = useState('');
  const [restaurantname,setRestaurantname] = useState('');


  const logoutFunction = (e) => {  
    e.preventDefault();
    dispatch(
      //Reset Reducers to initial state.
      logout()
    );
    navigate("../login")
  }
  function handleConfirmed (){
    if(confirm === false){
      return(
        <Button id="Lgbtn" className="m-2"  onClick={()=> setConfirm(true)}>Confirm Table Number</Button>
      )
    }
    if(confirm ===true){
      setTablenumber(qrcode.substring(qrcode.indexOf(":")+1))
      console.log(tablenumber)
      setRestaurantname(qrcode.substring(qrcode.indexOf(":"-1)))
      console.log(restaurantname)
            // window.localStorage.setItem('tablecode', JSON.stringify(qrcode))
            // navigate("../menu/usermenu");
            // window.location.reload()
    }
  }


  window.localStorage.setItem('tablecode', JSON.stringify("Table Is Not Scanned"))

  const [qrcode,setQrcode] = useState('Waiting for Scan..');
  
  return(
    <div className="m-3" id='body'>
      <div>
      <Button id="Lgbtn" onClick={logoutFunction}>Back To Admin Menu</Button>
      <h1 className='mt-2'>Scan Table QR-Code</h1>
      <QrReader
      key="environment"
      constraints={{ facingMode: 'environment' }}
      scanDelay={300}
        onResult={(result, error) => {
          if (!!result) {
            setQrcode(result?.text);
          }
          if (!!error) {
            console.info(error);
          }
        }}
        containerStyle={{height:500}}
      />
        {handleConfirmed()}

        <p className="mt-10" id='qrtextresult'>{qrcode}</p>
        
      </div>
    </div>
  );
}