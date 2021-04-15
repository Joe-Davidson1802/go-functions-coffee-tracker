
import React from 'react';

interface ResultProps {
    result: string
}

const Result = (props: ResultProps) => {

    const {result} = props;

    if (!result) {
        return null;
    }
    return (
        <li>
        {result}
        </li>
    );
}

export default Result;