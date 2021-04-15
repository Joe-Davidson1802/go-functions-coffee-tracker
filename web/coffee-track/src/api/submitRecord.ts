import {Record} from '../types/Record'
import api from './api';

const submitRecord = async (rec: Record) => {
    await api.post('/submit-data', rec);
}

export default submitRecord