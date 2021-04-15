
import {Record} from '../types/Record'
import api from './api';

const searchRecords = async (barcode: string) => {
    const response = await api.get<Record[]>('/search-by-barcode', {
        params: {
            barcode
        }
    })

    return response.data
}
export default searchRecords;