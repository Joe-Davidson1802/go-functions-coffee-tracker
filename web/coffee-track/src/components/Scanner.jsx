import React, {Component, useEffect} from 'react';
import Quagga from 'quagga';

const Scanner = (props) => {
    const {onDetected} = props;

    useEffect(() => {
        Quagga.init({
            inputStream: {
                type : "LiveStream"
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers : [ 
                    "code_128_reader",
                    "ean_reader",
                ]
            },
            locate: true
        }, function(err) {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(onDetected);

        return () => {
            Quagga.offDetected(onDetected);
        }
    })

    return (
        <div id="interactive" className="viewport"/>
    );
}

export default Scanner;