import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import "../../App.css";
import { QrReader } from "react-qr-reader";

export const ScanTableCode = () => {
  const navigate = useNavigate();
  const [showconfirm, setShowConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [qrcode, setQrcode] = useState("Waiting for Scan..");

  function handleConfirmed() {
    if (showconfirm === true) {
      if (confirm === false) {
        return (
          <Button id="Lgbtn" className="m-2" onClick={() => setConfirm(true)}>
            Confirm
          </Button>
        );
      }
      if (confirm === true) {
        window.localStorage.setItem("tablecode", JSON.stringify(qrcode));
        navigate("../menu/usermenu");
        window.location.reload();
      }
    } else {
      return null;
    }
  }

  window.localStorage.setItem(
    "tablecode",
    JSON.stringify("Table Is Not Scanned")
  );

  return (
    <div  id="body">
      <div>
        <div id="banner">
          <Button id="Lgbtn" onClick={() => navigate("../../userhomepage")}>
            Back to Main Menu
          </Button>
          <h1 className="mt-2">Scan Table QR-Code</h1>
        </div>

        <QrReader
          key="environment"
          constraints={{ facingMode: "environment" }}
          scanDelay={300}
          onResult={(result, error) => {
            if (!!result) {
              setQrcode(result?.text);
              setShowConfirm(true);
            }
            if (!!error) {
              console.info(error);
            }
          }}
          containerStyle={{ height: 500 }}
        />
        <p className="mt-10" id="qrtextresult">
          {"Table : " + qrcode.substring(qrcode.indexOf(":") + 1)}
        </p>
        <p className="mt-10" id="qrtextresult">
          {"Restaurant : " + qrcode.substring(0, qrcode.indexOf(":"))}
        </p>
        {handleConfirmed()}
      </div>
    </div>
  );
};
