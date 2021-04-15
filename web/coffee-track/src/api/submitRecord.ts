import axios from 'axios';

import {Record} from '../types/Record'

const submitRecord = async (rec: Record) => {
    await axios.post('/submit-data', rec);
}

export default submitRecord