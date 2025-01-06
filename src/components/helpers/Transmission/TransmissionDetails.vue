<template>
    <div class="container pb-5">
        <div class="row site-details gx-1">
            <div class="col-6"></div>

            <div class="col-12">
                <p>{{ topic }}<span>({{ statestics.length }})</span></p>
            </div>

            <DataTable :value="statestics" paginatorStyle="font-size:1vw;" responsiveLayout="scroll" :paginator="true"
                :rows="5" stripedRows v-model:selection="selectedRow" selectionMode="single"
                tableStyle="font-size: clamp(12px, 0.5rem + 1vw, 14px);" dataKey="id" @row-select="onRowSelect">
                <Column selectionMode="single"></Column>
                <Column field="reporting_date" sortable header="Reporting Date"></Column>
                <Column field="clearance_date" sortable header="Clearance Date"></Column>
                <Column field="network_element" header="Network Element"></Column>
                <Column field="far_end" header="Far End"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="office" header="Office"></Column>
                <Column field="ATST_feedback" header="ATST Feedback"></Column>
                <Column field="maintenance_feedback" header="Maintenance Feedback"></Column>
            </DataTable>

            <div class="col-6">

                <Button label="Update" :disabled="disabled" @click.prevent="openOverlayUpdate()" icon="pi pi-external-link"
                    severity="success" text raised />


            </div>
            <div class="col-6">
                <div class="d-flex w-100 justify-content-end ">
                    <download-excel :data="statestics" class="btn btn-danger" type="xlsx" :name="topic">

                        Export Excel

                    </download-excel>


                </div>


            </div>


        </div>

    </div>
</template>

<script>

import TransmissionUpdate from "./TransmissionUpdate.vue";



export default {
    data() {


        return {

            selectedRow: null,
            disabled: true,

        };
    },
    name: "TransmissionDetails",

    props: ["statestics", "topic"],
    components: {
        TransmissionUpdate,


    },



  
    methods: {


        onRowSelect() {
            this.disabled = false;


        },
        openOverlayUpdate() {


            this.$dialog.open(TransmissionUpdate, {
                props: {
                    style: {
                        width: "90vw",
                    },

                    modal: true,
                },

                data: {
                    rowData: this.selectedRow,

                    topic: this.topic,
                    purpos:"update",

                },
            });





        }

    },
}
</script>

<style lang="scss" scoped>
.button-container {

    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1em;

}

p {
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