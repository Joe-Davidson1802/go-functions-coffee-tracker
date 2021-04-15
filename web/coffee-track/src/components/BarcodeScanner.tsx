import { useState } from "react";

import Result from "./Result";
import Scanner from "./Scanner";

interface ScannerProps {
  onScanned: (results: string) => void;
  scan: boolean;
}

const BarcodeScanner = (props: ScannerProps) => {
  const { onScanned, scan } = props;
  const [result, setResult] = useState("");

  const detected = (r: any) => {
    console.log(result);
    setResult(r.codeResult.code);
    onScanned(r.codeResult.code);
  };

  const close = () => {
    setResult("");
    onScanned("");
  };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Scanner</p>
          <button
            className="delete"
            aria-label="close"
            onClick={close}
          ></button>
        </header>
        <section className="modal-card-body">
          {scan ? <Scanner onDetected={detected} /> : ""}
        </section>
      </div>
    </div>
  );
};

export default BarcodeScanner;
