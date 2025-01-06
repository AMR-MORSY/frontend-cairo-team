<template>

    <div class="flex justify-between items-center w-full">

        <h3 class=" text-font-main-color text-lg font-bold">{{ topic }}</h3>
        <Button :label="action" icon="pi pi-external-link" class="block" @click="openOverlayUpdate(event)"
            severity="success" text raised />



    </div>

    <div class="grid grid-cols-4 gap-4">



        <div class="col-span-4 md:col-span-2 lg:col-span-1  " v-for="statestic in statestics" :key="statestic">
            <div class="flex-auto">
                <label class="font-bold" :id="Object.keys(statestic)[0]">{{ Object.keys(statestic)[0]
                    }}</label>
                <InputText fluid disabled :value="Object.values(statestic)[0]"
                    :aria-describedby="Object.keys(statestic)[0]" />
            </div>
        </div>








    </div>


</template>

<script>
import BatteriesUpdate from './BatteriesUpdate.vue';
import SiteDataUpdate from './SiteDataUpdate.vue';
import RectifierDataUpdate from "./RectifierDataUpdate.vue";
import MWDataUpdate from './MWDataUpdate.vue';
import BTSDataUpdate from "./BTSDataUpdate.vue";
import PowerDataUpdate from './PowerDataUpdate.vue';

export default {
    data() {


        return {
            statestics: null,
            topic: null,

            action: null,
        };
    },
    name: "EquipmentDetails",
    inject: ["dialogRef"],
    components: {
        BatteriesUpdate,
        SiteDataUpdate,
        RectifierDataUpdate,
        MWDataUpdate,
        BTSDataUpdate,
        PowerDataUpdate,

    },


    mounted() {
        this.mountData()

    },
    methods: {
        mountData() {

            this.statestics = this.dialogRef.data.statestics;
            this.topic = this.dialogRef.data.topic;
            this.action = this.dialogRef.data.action;


        },
        openOverlayUpdate() {
            this.dialogRef.close();
            if (this.topic == "Site Data") {
                if (this.action == 'Update') {
                    this.$dialog.open(SiteDataUpdate, {
                        props: {
                            style: {
                                width: "90vw",
                            },

                            modal: true,
                        },

                        data: {
                            rowData: this.dialogRef.data.rowData,///////row data and the id of the data will be available in case of updating
                            id: this.dialogRef.data.id,
                            topic: this.topic,
                            action: this.action

                        },
                    });

                }
                else {
                    this.$dialog.open(SiteDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {

                            topic: this.topic,
                            action: this.action,
                            site_code: this.dialogRef.data.site_code

                        },
                    })
                }



            }

            else if (this.topic == "Rectifier Data") {
                if (this.action == 'Update') {
                    this.$dialog.open(RectifierDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {
                            rowData: this.dialogRef.data.rowData,
                            id: this.dialogRef.data.id,
                            topic: this.topic,
                            action: this.action

                        },
                    });
                }
                else {
                    this.$dialog.open(RectifierDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {

                            topic: this.topic,
                            action: this.action,
                            site_code: this.dialogRef.data.site_code

                        },
                    });

                }


            }
            else if (this.topic == "MW Data") {
                if (this.action == 'Update') {
                    this.$dialog.open(MWDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {
                            rowData: this.dialogRef.data.rowData,
                            id: this.dialogRef.data.id,
                            topic: this.topic,
                            action: this.action

                        },
                    });
                }
                else {
                    this.$dialog.open(MWDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {

                            topic: this.topic,
                            action: this.action,
                            site_code: this.dialogRef.data.site_code


                        },
                    });

                }


            }
            else if (this.topic == "BTS Data") {
                if (this.action == 'Update') {
                    this.$dialog.open(BTSDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {
                            rowData: this.dialogRef.data.rowData,
                            id: this.dialogRef.data.id,
                            topic: this.topic

                        },
                    });

                }
                else {
                    this.$dialog.open(BTSDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {
                            
                            topic: this.topic,
                            action: this.action,
                            site_code: this.dialogRef.data.site_code

                        },
                    });
                }



            }
            else if (this.topic == "Power Data") {
                if (this.action == 'Update') {
                    this.$dialog.open(PowerDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {
                            rowData: this.dialogRef.data.rowData,
                            id: this.dialogRef.data.id,
                            topic: this.topic

                        },
                    });
                }
                else {
                    this.$dialog.open(PowerDataUpdate, {
                        props: {
                            style: {
                                width: "75vw",
                            },
                            breakpoints: {
                                "960px": "75vw",
                                "640px": "90vw",
                            },

                            modal: true,
                        },

                        data: {

                            topic: this.topic,
                            action: this.action,
                            site_code: this.dialogRef.data.site_code

                        },
                    });

                }


            }





        }

    },
}
</script>

<style lang="scss" scoped>
.input-group {
    width: 100%;
    margin-bottom: 1rem;
}

.button-container {

    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1em;

}

@media screen and (min-width:320px) and (max-width: 480px) {

    /* smartphones, iPhone, portrait 480x320 phones */

}

@media screen and (min-width:481px) and (max-width: 640px) {

    /* portrait e-readers (Nook/Kindle), smaller tablets @ 600 or @ 640 wide. */


}

@media screen and (min-width:641px) and (max-width: 960) {

    /* portrait tablets, portrait iPad, landscape e-readers, landscape 800x480 or 854x480 phones */

}
</style>