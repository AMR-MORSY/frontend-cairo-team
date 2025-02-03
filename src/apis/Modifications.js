import allInstances from "./Api";

export default {

    getModificationAnalysis()
    {
        return allInstances.Api.get("/modifications/analysis");
    },
    getModificationIndex(data)
    {
        return allInstances.Api.get(`/modifications/index/${data.columnName}/${data.columnValue}`);
    },
    getSiteModifications(siteCode)
    {
        return allInstances.Api.get(`/modifications/siteModifications/${siteCode}`);

    },
    insertNewModification(modification)
    {
        return allInstances.Api.post("/modifications/new",modification)
    },
    getModificationDetails(id)
    {
        return allInstances.Api.get(`/modifications/details/${id}`)

    },
    getModificationsFilteredByDate(date_type,from_date,to_date)
    {
        return allInstances.Api.get(`/modifications/filterdates/${date_type}/${from_date}/${to_date}`);

    },
    getModificationsFilteredByWO(wo)
    {
        return allInstances.Api.get(`/modifications/wo/${wo}`);

    },
    updateModification(data,id)
    {
        return allInstances.Api.put(`/modifications/update/${id}`,data);

    },
    deleteModification(data)
    {
        return allInstances.Api.post("/modifications/delete",data);

    },
    downloadModifications(data)
    {
        return allInstances.downloadApi.post("/modifications/download",data);

    },
    reportModifications(data)
    {
        return allInstances.Api.post('/modifications/report',data);
    },

    searchPriceList(data)
    {
        return allInstances.Api.post('/priceList/search',data)
    },

    getModificationQuotation(id)
    {
        return allInstances.Api.get(`/quotation/modification/${id}`);
    }

    
};