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
    if (result) setBarcode(result);
  };

  const RecordInput = (props: {
    name: string;
    value: string;
    update: (val: string) => void;
  }) => {
    const { name, update, value } = props;
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{name}</label>
        </div>
        <div className="field-body is-expanded">
          <div className="field">
            <div className="control">
              <input
                className="input"
                value={value}
                onChange={(e) => update(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {scanning ? <BarcodeScanner onScanned={scanned} scan={scanning} /> : ""}
      <form onSubmit={handleSubmit}>
        <div className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">Barcode</label>
          </div>
          <div className="field-body is-expanded">
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                />
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
        <RecordInput name="Grind Size" update={setGrind} value={grind} />
        <RecordInput name="Dose In" update={setIn} value={weightIn} />
        <RecordInput name="Dose Out" update={setOut} value={out} />
        <RecordInput name="Brew Seconds" update={setSeconds} value={seconds} />
        <div className="field is-horizontal">
          <div className="field-label"></div>
          <div className="field-body">
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecordForm;
