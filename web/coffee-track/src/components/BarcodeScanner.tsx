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

  return <div>{scan ? <Scanner onDetected={detected} /> : ""}</div>;
};

export default BarcodeScanner;
