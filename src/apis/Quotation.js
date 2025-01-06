import allInstances from "./Api";

export default {

     uploadQuotationSheet(data)
    {
        return allInstances.uploadApi.post(`/quotation/upload`,data);

    }



}