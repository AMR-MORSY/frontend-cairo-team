import allInstances from "./Api";

export default {
  uploadQuotationSheet(data) {
    return allInstances.uploadApi.post(`/quotation/upload`, data);
  },

  getAllMailPrices() {
    return allInstances.Api.get("/quotation/mailprices/index");
  },

  insertQuotationMailPricesItems(data,modification_id,quotation_id)
  {
    return allInstances.Api.put(`/quotation/mailprices/${modification_id}/${quotation_id}`,data);
  },

  insertQuotationPriceListItems(data,modification_id,quotation_id)
  {
    return allInstances.Api.put(`/quotation/priceList/${modification_id}/${quotation_id}`,data);
  },
  deletePriceListItems(data,modification_id,quotation_id)
  {
    return allInstances.Api.put(`quotation/priceList/delete/items/${modification_id}/${quotation_id}`,data);
  },
  deleteMailListItems(data,modification_id,quotation_id)
  {
    return allInstances.Api.put(`quotation/mailList/delete/items/${modification_id}/${quotation_id}`,data);
  }
};
