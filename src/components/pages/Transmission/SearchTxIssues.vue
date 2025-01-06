
<template>
    <div v-if="noTxIssues" class="d-flex justify-content-center flex-column align-items-center py-5">
        <p>No Tx. issues</p>
        <p @click="$router.go(-1)" style="color:red; text-decoration: underline; cursor: pointer;">Back</p>

    </div>
    <template v-if="WANSAvailable">
        <TransmissionDetails topic="WAN" :statestics="WANS"></TransmissionDetails>
    </template>
    <template v-if="XPICSAvailable">
        <TransmissionDetails topic="XPICS" :statestics="XPICS"></TransmissionDetails>
    </template>
    <template v-if="ip_trafficsAvailable">
        <TransmissionDetails topic="ip traffics" :statestics="ip_traffics"></TransmissionDetails>
    </template>
</template>

<script>
import Transmission from '../../../apis/Transmission';
import TransmissionDetails from "../../helpers/Transmission/TransmissionDetails.vue";
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

        };
    },
    name: "SearchTxIssues",
    props: ["fromDate", "toDate", "issue"],
    components: {
        TransmissionDetails,
    },

    watch: {
        fromDate() {
            this.searchTxIssues()

        },
        toDate() {
            this.searchTxIssues()

        },
        issue() {
            this.searchTxIssues()

        }
    },
    mounted() {
        this.searchTxIssues()

    },
    methods: {

        searchTxIssues() {
            Transmission.searchTxIssues(this.fromDate, this.toDate, this.issue).then((response) => {
                console.log(response)
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

        }

    },

}
</script>

<style lang="scss" scoped>


p{
    font-size: 2vw;
    font-weight: 600;
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