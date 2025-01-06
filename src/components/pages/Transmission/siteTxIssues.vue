<template>
    <div v-if="noTxIssues" class="d-flex justify-content-center flex-column align-items-center py-5">
        <p>No Tx. issues</p>
        <p @click="$router.go(-1)" style="color:red; text-decoration: underline; cursor: pointer;">Back</p>
        <div class="button-container">

            <Button label="WAN" @click="addSiteWAN()" icon="pi pi-plus-circle" severity="success" raised />
            <Button label="IP traffic" @click="addSiteIPTraffic()" icon="pi pi-plus-circle" severity="info" raised />
            <Button label="XPIC" icon="pi pi-plus-circle" @click="addSiteXPIC()" severity="warning" raised />

        </div>

    </div>
    <template v-if="WANSAvailable">
        <TransmissionDetails topic="WAN" :statestics="WANS"></TransmissionDetails>

        <div class="button-container">

            <Button label="WAN" @click="addSiteWAN()" icon="pi pi-plus-circle" severity="success" raised />
            <Button label="IP traffic" @click="addSiteIPTraffic()" icon="pi pi-plus-circle" severity="info" raised />
            <Button label="XPIC" icon="pi pi-plus-circle" @click="addSiteXPIC()" severity="warning" raised />

        </div>
    </template>
    <template v-if="XPICSAvailable">
        <TransmissionDetails topic="XPICS" :statestics="XPICS"></TransmissionDetails>
        <div class="button-container">

            <Button label="WAN" @click="addSiteWAN()" icon="pi pi-plus-circle" severity="success" raised />
            <Button label="IP traffic" @click="addSiteIPTraffic()" icon="pi pi-plus-circle" severity="info" raised />
            <Button label="XPIC" icon="pi pi-plus-circle" @click="addSiteXPIC()" severity="warning" raised />

        </div>
    </template>
    <template v-if="ip_trafficsAvailable">
        <TransmissionDetails topic="ip traffics" :statestics="ip_traffics"></TransmissionDetails>
        <div class="button-container">

            <Button label="WAN" @click="addSiteWAN()" icon="pi pi-plus-circle" severity="success" raised />
            <Button label="IP traffic" @click="addSiteIPTraffic()" icon="pi pi-plus-circle" severity="info" raised />
            <Button label="XPIC" icon="pi pi-plus-circle" @click="addSiteXPIC()" severity="warning" raised />

        </div>
    </template>
</template>

<script>
import TransmissionDetails from '../../helpers/Transmission/TransmissionDetails.vue';
import Transmission from "../../../apis/Transmission";
import TransmissionUpdate from '../../helpers/Transmission/TransmissionUpdate.vue';
export default {
    data() {


        return {
            WANSAvailable: false,
            WANS: null,
            XPICSAvailable: false,
            XPICS: null,
            ip_trafficsAvailable: false,
            ip_traffics: null,
            noTxIssues: false,

            form: {
                "reporting_date": null,
                "clearance_date": null,
                "network_element": null,
                "far_end": null,
                "status": null,
                "office": null,
                "ATST_feedback": null,
                "maintenance_feedback": null,
                "site_code":null,
            }
        }
    },
    name: "siteTxIssues",
    props: ["site_code"],
    components: {
        TransmissionDetails,
        TransmissionUpdate,

    },
    watch: {
        site_code() {
            this.getSiteTxIssues();
        },

    },
    mounted() {
        this.form.site_code=this.site_code,
        this.getSiteTxIssues();

    },

    methods: {
        getSiteTxIssues() {
            Transmission.getSiteTxIssues(this.site_code).then((response) => {
                console.log(response);
                if (response.data.messages.WANS == "data found") {
                    this.WANSAvailable = true;
                    this.WANS = response.data.issues.WANS
                }
                if (response.data.messages.ip_traffics == "data found") {
                    this.ip_trafficsAvailable = true;
                    this.ip_traffics = response.data.issues.ip_traffics
                }
                if (response.data.messages.XPICS == "data found") {
                    this.XPICSAvailable = true;
                    this.XPICS = response.data.issues.XPICS
                }
                if (response.data.messages.XPICS == "data not found" && response.data.messages.ip_traffics == "data not found" && response.data.messages.WANS == "data not found") {


                    this.noTxIssues = true;
                }
            })

        },
        addSiteWAN() {
            this.$dialog.open(TransmissionUpdate, {
                props: {
                    style: {
                        width: "90vw",
                    },

                    modal: true,
                },

                data: {
                    rowData: this.form,

                    topic: "New WAN",
                    purpos: "New",

                },

            })

        },
        addSiteIPTraffic() {
            this.$dialog.open(TransmissionUpdate, {
                props: {
                    style: {
                        width: "90vw",
                    },

                    modal: true,
                },

                data: {
                    rowData: this.form,

                    topic: "New IP traffic",
                    purpos: "New",

                },

            })

        },
        addSiteXPIC() {
            this.$dialog.open(TransmissionUpdate, {
                props: {
                    style: {
                        width: "90vw",
                    },

                    modal: true,
                },

                data: {
                    rowData: this.form,

                    topic: "New XPIC",
                    purpos: "New",

                },

            })

        }


    }

}
</script>

<style lang="scss" scoped>
p {
    font-size: 2vw;
    font-weight: 600;
}

.button-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    font-size: clamp(12px, 1vw, 14px);
    padding-top: 50px;
    padding-bottom: 50px;
    border-top: 1px solid gray;

}




@media screen and (min-width:320px) and (max-width: 480px) {
    p {
        font-size: 5vw;
        font-weight: 600;
    }


    /* smartphones, iPhone, portrait 480x320 phones */

}

@media screen and (min-width:481px) and (max-width: 640px) {
    p {
        font-size: 5vw;
        font-weight: 600;
    }

    /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */


}

@media screen and (min-width:641px) and (max-width: 960) {
    p {
        font-size: 4vw;
        font-weight: 600;
    }

    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */

}
</style>