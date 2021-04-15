import { time } from "console";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { clearTimeout, setTimeout } from "timers";
import searchRecords from "../api/searchRecords";
import BarcodeScanner from "../components/BarcodeScanner";
import { Record } from "../types/Record";

const Search = () => {
  const [barcode, setBarcode] = useState("");
  const [timeout, setTimeoutState] = useState<NodeJS.Timeout>();
  const [records, setRecords] = useState<Record[]>([]);
  const [scanning, setScan] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value);
    if (timeout !== undefined) clearTimeout(timeout);
    setTimeoutState(
      setTimeout(() => {
        if (e.target.value !== "")
          searchRecords(e.target.value).then(setRecords);
      }, 500)
    );
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString();
  };

  const RenderRecord = (r: Record) => {
    return (
      <tr>
        <td>{r.created ? formatDate(new Date(r.created)) : ""}</td>
        <td>{r.grind}</td>
        <td>{r.in}</td>
        <td>{r.out}</td>
        <td>{r.seconds}</td>
      </tr>
    );
  };

  const scanned = (result: string) => {
    console.log(result);
    setScan(false);
    if (result) setBarcode(result);
  };

  return (
    <div className="container">
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Barcode</label>
        </div>
        <div className="field-body is-expanded">
          <div className="field has-addons">
            <div className="control">
              <input className="input" value={barcode} onChange={handleInput} />
            </div>
            <div className="control">
              <button
                className="button is-primary"
                onClick={() => setScan(!scanning)}
              >
                Scan
              </button>
            </div>
          </div>
        </div>
      </div>
      {scanning ? <BarcodeScanner onScanned={scanned} scan={scanning} /> : ""}
      {records ? (
        <table className="table">
          <tr>
            <th>Date</th>
            <th>Grind Size</th>
            <th>Dose In</th>
            <th>Dose Out</th>
            <th>Brew Time</th>
          </tr>

          {records.map(RenderRecord)}
        </table>
      ) : null}
    </div>
  );
};

export default Search;
