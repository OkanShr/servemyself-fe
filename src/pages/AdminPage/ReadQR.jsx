import React, {useState} from 'react'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import '../../App.css';
import { QrReader } from 'react-qr-reader';
import { useEffect } from 'react';


export const ReadQR = () => {
  
  const navigate = useNavigate(); 


  const [qrcode,setQrcode] = useState('No Result..');

  const handleScan = data => {
    if (data) {
      setQrcode(data)
    }
  }
  





  return(
    <div className="m-3" id='body'>
      <div>
      <Button id="Lgbtn" onClick={() => navigate("../home")}>Back To Admin Menu</Button>
      <h1 className='mt-2'>QR READER</h1>

      <QrReader
        delay={300}
        constraints={{
          facingMode: 'environment'
        }}
        style={{ width: '100%' }}
        onResult={(result,err) => {
          if (!!result){
            setQrcode(result?.text);
          }

          if (!!err){
            console.log(err);
          }
        }}
        

        />
        <p>{qrcode}</p>
      </div>
      
    </div>
  );
};
