import '../../App.css';
import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import QRCode from 'qrcode'


export const GenerateQR = () => {
  
  const [url,setUrl] = useState('');
  const [qrcode, setQrcode] = useState('');

  const GenerateQRCode = () => {
    QRCode.toDataURL(url,{
      width: 200,
      margin: 1,
      color:{ light:'#f8f8f805'}
    },(err,url)=>{
      if (err) return console.error(err)

      console.log(url)
      setQrcode(url)
    })
  } 

  const navigate = useNavigate(); 


  return(
    <div className="m-3" id='body'>
      <div>
      <Button id="Lgbtn" onClick={() => navigate("../home")}>Back To Admin Menu</Button>
      <h1 className='mt-2'>QR GENERATOR</h1>
      
      </div>
      

      <div id='navbuttons'>
          <input className='mt-2 mb-2' 
            type='text'
            placeholder='Masa Numarasi Girin'
            value={url}
            onChange={(evt)=> setUrl(evt.target.value)}/>
          <Button onClick={GenerateQRCode}>Generate</Button>
          {qrcode && <>
              <img src={qrcode} alt=''/>
              <a href={qrcode} download={url + '.png'} className='text-decoration-none text-black text h4'><strong>Download</strong></a>
          </>}
          
      </div>{/* divbuttons */}

      
      
    </div>
  );
};
