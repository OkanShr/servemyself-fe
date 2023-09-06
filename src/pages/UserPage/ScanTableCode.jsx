import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import "../../App.css";
import { QrReader } from "react-qr-reader";

export const ScanTableCode = () => {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [qrcode, setQrcode] = useState("Waiting for Scan..");

  useEffect(() => {
    window.localStorage.setItem("tablecode", JSON.stringify("Table Is Not Scanned"));
  }, []);

  const handleConfirmClick = () => {
    if (!confirm) {
      setConfirm(true);
    } else {
      window.localStorage.setItem("tablecode", JSON.stringify(qrcode));
      navigate("../menu/usermenu");
      window.location.reload();
    }
  };

  const handleBackToMainMenuClick = () => {
    navigate("../../userhomepage");
  };

  const handleScanResult = (result, error) => {
    if (result) {
      setQrcode(result?.text);
      setShowConfirm(true);
    }
  };

  return (
    <div id="body">
      <div>
        <div id="banner">
          <Button id="Lgbtn" onClick={handleBackToMainMenuClick}>
            Back to Main Menu
          </Button>
          <h1 className="mt-2">Scan Table QR-Code</h1>
        </div>

        <QrReader
          key="environment"
          constraints={{ facingMode: "environment" }}
          scanDelay={300}
          onResult={handleScanResult}
          containerStyle={{ height: 500 }}
        />
        <p className="mt-10" id="qrtextresult">
          {"Table : " + qrcode.substring(qrcode.indexOf(":") + 1)}
        </p>
        <p className="mt-10" id="qrtextresult">
          {"Restaurant : " + qrcode.substring(0, qrcode.indexOf(":"))}
        </p>
        {showConfirm && (
          <Button id="Lgbtn" className="m-2" onClick={handleConfirmClick}>
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
};
