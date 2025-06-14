import allInstances from "./Api";

export default {
    submitSitesSheet(sheet) {
        return allInstances.uploadApi.post("/sites/store", sheet);
    },
    index(){
      return allInstances.Api.get(`/sites/index`)

    },
    downloadAll() {
        return allInstances.downloadApi.post("sites/downloadAll");
    },
    getAllCascades() {
        return allInstances.downloadApi.get("sites/cascades");
    },
    importCascades(sheet)
    {
      return allInstances.Api.post("/sites/cascades", sheet);

    },
    importNodals(sheet)
    {
      return allInstances.Api.post("/sites/nodals", sheet);



    },
    downloadNodals()
    {
      return allInstances.downloadApi.post("sites/nodals/download");

    },
    searchSites(data)
    {
      return allInstances.Api.get(`/sites/search/${data}`)
    },
    getSiteDetails(siteCode)
    {
      return allInstances.Api.get(`/sites/details/${siteCode}`)
    },
    updateCascades(data)
    {
      return allInstances.Api.post("/sites/updateCascades",data)
    },
    createNewSite(data)
    {
      return allInstances.Api.post("/sites/create",data)

    },
    updateSite(data)
    {
      return allInstances.Api.put(`/sites/update/${data.site_code}`,data)


    },
    getBatteriesDetails(data)
    {
      return allInstances.Api.get(`/batteries/${data}`)

    },
    updateBatteriesData(id,data)
    {
      return allInstances.Api.put(`/batteries/${id}`,data)

    },
    deleteBatteryRecord(id)
    {
      return allInstances.Api.delete(`/batteries/${id}`)

    },
    insertNewBatterydata(data)
    {
      return allInstances.Api.post("/batteries/store",data)

    },
   
    getRectifierDetails(data)
    {
      return allInstances.Api.post("/instruments/siteRectifierData",data)

    },
    updateRectifierDetails(data)
    {
      return allInstances.Api.post("/instruments/updateRectifierData",data)
    },
    insertRectifierDetails(data)
    {
      return allInstances.Api.post("/instruments/insertRectifierData",data);

    },
    getSiteDeepDetails(data)
    {
      return allInstances.Api.post("/instruments/siteDeepData",data)

    },
    insertSiteDeepDetails(data)
    {
      return allInstances.Api.post("/instruments/insertSiteDeepData",data);

    },
    updatesiteDeepDetails(data)
    {
      return allInstances.Api.post("/instruments/updateSiteDeepData",data)

    },
    getSiteMWDetails(data)
    {
      return allInstances.Api.post("/instruments/siteMWData",data)

    },
    updateSiteMWDetails(data)
    {
      return allInstances.Api.post("/instruments/updateMWData",data)

    },
    insertSiteMWDetails(data)
    {
      return allInstances.Api.post("/instruments/insertMWData",data)

    },
    getSiteBTSDetails(data)
    {
      return allInstances.Api.post("/instruments/siteBTSData",data)

    },
    updateSiteBTSDetails(data)
    {
      return allInstances.Api.post("/instruments/updateSiteBTSData",data)

    },
    insertSiteBTSDetails(data)
    {
      return allInstances.Api.post("/instruments/insertSiteBTSData",data)

    },
   
    getSitePowerDetails(data)
    {
      return allInstances.Api.post("/instruments/sitePowerData",data)

    },
    updateSitePowerDetails(data)
    {
      return allInstances.Api.post("/instruments/updateSitePowerData",data)

    },
    insertSitePowerDetails(data)
    {
      return allInstances.Api.post("/instruments/insertSitePowerData",data)

    },


    viewMuxPlan(site_code)
    {
      return allInstances.Api.get(`/sites/muxPlans?site_code=${site_code}`)
    },

    siteNotices(site_code,page,per_page)
    {
      return allInstances.Api.get(`/site/notices?site_code=${site_code}&page=${page}&per_page=${per_page}`)
    },
    getNoticeTypes()
    {
      return allInstances.Api.get(`/site/noticeTypes`)
    },
    createSiteNotice(form)
    {
      return allInstances.Api.post('/site/notice/create',form)
    },
    updateSiteNotice(form)
    {
      return allInstances.Api.put('/site/notice/update',form)
    },
     allNotices()
    {
      return allInstances.Api.get('/site/notices/all')
    }
    
};
