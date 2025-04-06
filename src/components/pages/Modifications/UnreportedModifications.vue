<template>

    <FilteredModificationsTable :modificationsData="modifications"/>
</template>

<script setup>

import FilteredModificationsTable from '../../helpers/Modification/FilteredModificationsTable.vue';
import Modifications from '../../../apis/Modifications';
import { onMounted,ref } from 'vue';

const modifications=ref([]);
const props=defineProps(['oz','action_owner']);


const getUnreportedModifications=()=>{
    Modifications.unreportedModifications(props.oz,props.action_owner).then((response)=>{
        console.log(response)
        modifications.value=response.data.modifications
    })

}
onMounted(()=>{
    getUnreportedModifications();
})
</script>