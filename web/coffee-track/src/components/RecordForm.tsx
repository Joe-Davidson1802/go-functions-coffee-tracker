import React from "react";
import { useState } from "react";
import submitRecord from "../api/submitRecord";
import { Record } from "../types/Record";
import BarcodeScanner from "./BarcodeScanner";

const RecordForm = () => {
  const [barcode, setBarcode] = useState("");
  const [grind, setGrind] = useState("");
  const [out, setOut] = useState("");
  const [weightIn, setIn] = useState("");
  const [seconds, setSeconds] = useState("");
  const [scanning, setScan] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitRecord({
      barcode,
      grind: +grind,
      out: +out,
      in: +weightIn,
      seconds: +seconds,
      created: undefined,
    });
  };

  const scanned = (result: string) => {
    console.log(result);
    setScan(false);
    setBarcode(result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Barcode:
          <input value={barcode} onChange={(e) => setBarcode(e.target.value)} />
        </label>
        <button onClick={() => setScan(true)}>Scan</button>
        {scanning ? <BarcodeScanner onScanned={scanned} scan={scanning} /> : ""}
      </div>
      <div>
        <label>
          Grind Size:
          <input value={grind} onChange={(e) => setGrind(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          In:
          <input value={weightIn} onChange={(e) => setIn(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Out:
          <input value={out} onChange={(e) => setOut(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Seconds:
          <input value={seconds} onChange={(e) => setSeconds(e.target.value)} />
        </label>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default RecordForm;
