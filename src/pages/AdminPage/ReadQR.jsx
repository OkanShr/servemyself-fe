import React , {useState} from 'react'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import '../../App.css';
import { QrReader } from 'react-qr-reader';


export const ReadQR = () => {
  
  const navigate = useNavigate(); 

  const [qrcode,setQrcode] = useState('Waiting for Scan..');

  return(
    <div className="m-3" id='body'>
      <div>
      <Button id="Lgbtn" onClick={() => navigate("../home")}>Back To Admin Menu</Button>
      <h1 className='mt-2'>QR READER</h1>

      <QrReader
      facingMode={"environment"}
      scanDelay={300}
        onResult={(result, error) => {
          if (!!result) {
            setQrcode(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '300px' }}
      />
        <p id='qrtextresult'>{qrcode}</p>
      </div>
      
    </div>
  );
};
