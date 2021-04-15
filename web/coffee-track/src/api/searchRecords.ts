import axios from "axios"

import {Record} from '../types/Record'

const searchRecords = async (barcode: string) => {
    const response = await axios.get<Record[]>('/search-by-barcode', {
        params: {
            barcode
        }
    })

    return response.data
}
export default searchRecords;