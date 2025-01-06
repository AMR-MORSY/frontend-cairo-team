import allInstances from "./Api";
export default{
    getSiteTxIssues(siteCode)
    {
        return allInstances.Api.get(`/Transmission/getSiteTXIssues/${siteCode}`)
    },
    searchTxIssues(fromDate,toDate,issue)
    {
        return allInstances.Api.get(`/Transmission/searchTxIssues/${fromDate}/${toDate}/${issue}`);

    },
    updateSiteWAN(data)
    {
        return allInstances.Api.post("/Transmission/updateSiteWAN",data)

    },
    updateSiteXPIC(data)
    {
        return allInstances.Api.post("/Transmission/updateSiteXPICs",data)

    },
    updateSiteIPTraffic(data)
    {
        return allInstances.Api.post("/Transmission/updateSiteIP_trafics",data) 

    },
    addNewXPIC(data)
    {
        return allInstances.Api.post("/Transmission/storeSiteXPICs",data)

    },
    addNewWAN(data)
    {
        return allInstances.Api.post("/Transmission/storeSiteWAN",data)

    },
    addNewIPTraffic(data)
    {
        return allInstances.Api.post("/Transmission/storeSiteIP_trafic",data)

    }
  
}