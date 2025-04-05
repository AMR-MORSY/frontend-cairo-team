<template>
<!-- <a :href="invoice_url" class=" mt-10 block" target="_blank">invoice</a> -->

<div class=" w-1/2 mx-auto  mt-16">
    <VuePdfEmbed  :source="invoice_url" />

</div>

</template>

<script setup>
import { ref } from 'vue';
import Modifications from '../../../apis/Modifications';
import VuePdfEmbed from 'vue-pdf-embed';

// optional styles
// import 'vue-pdf-embed/dist/styles/annotationLayer.css';
// import 'vue-pdf-embed/dist/styles/textLayer.css';
import { onMounted } from 'vue';
const invoice=ref();
const invoice_url=ref();
const props=defineProps(['invoice_id']);

const getInvoiceDetails=()=>{

    Modifications.viewInvoice(props.invoice_id).then((response)=>{
      console.log(response)
      invoice.value=response.data.data
      invoice_url.value=invoice.value.file.path;
    })

}
onMounted(()=>{
    getInvoiceDetails();
})


</script>