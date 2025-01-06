import Csrf from "./Csrf";
import allInstances from "./Api";

export default {
    submitEnergySheet(sheet) {
     

        return allInstances.uploadApi.post("/energysheet/index", sheet);
    },
    getEnergySheetIndex() {
       
        return allInstances.Api.get("/energysheet/index");
    },
    getEnergyStatestics(data){
        return allInstances.Api.get(`/energysheet/statestics/${data.week}/${data.year}`);
    
    },
    getSitePowerAlarms(data){
        return allInstances.Api.post("energysheet/sitePowerAlarms",data);
    },
    getSiteBatteriesHealth(data)
    {
        return allInstances.Api.post("energysheet/siteBatteriesHealth",data);

    },
    getSiteHighTempAlarms(data){
        return allInstances.Api.post("energysheet/siteHighTempAlarms",data);
    },
    getSiteGenAlarms(data){
        return allInstances.Api.post("energysheet/siteGenAlarms",data);
    },
    getSiteDownAlarmsGroupedByWeek(data)
    {
        return allInstances.Api.post("energysheet/siteDownAlarmsGroupedByWeek",data);

    },
    downloadSitePowerAlarms(data)
    {
        return allInstances.downloadApi.post("energysheet/downloadSitePowerAlarms",data);
    },
    downloadSiteHighTempAlarms(data)
    {
        return allInstances.downloadApi.post("energysheet/downloadSiteHighTempAlarms",data);
    },
    downloadSiteGenAlarms(data)
    {
        return allInstances.downloadApi.post("energysheet/downloadSiteGenAlarms",data);
    },
    downloadZoneHTAlarms(data)
    {
        return allInstances.downloadApi.post("energysheet/downloadZoneHTAlarms",data);

    },
    getSitesReportedDownAlarms(data)
    {
        return allInstances.Api.get(`energysheet/zoneSitesReportedDownAlarms/${data.zone}/${data.week}/${data.year}`)
    },

    getZoneDownSitesAfterPowerAlarm(data)
    {
        return allInstances.Api.get(`energysheet/zoneDownSitesAfterPowerAlarm/${data.zone}/${data.week}/${data.year}`)
    },
    getZoneSitesDownWithoutPowerAlarms(data)
    {
        return allInstances.Api.get(`energysheet/zoneSitesDownWithoutPowerAlarms/${data.zone}/${data.week}/${data.year}`)
    }


   
};
