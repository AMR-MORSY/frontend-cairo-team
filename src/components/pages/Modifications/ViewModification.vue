<template>
<ModificationViewORUpdate needed_action="view" :id="modification_id"/>
</template>

<script setup>

import { onMounted } from 'vue';
import ModificationViewORUpdate from '../../helpers/Modification/ModificationViewORUpdate.vue';
import { ref } from 'vue';
import { computed } from 'vue';

const props=defineProps(['id']);
const modification_id=computed(()=>props.id);
</script>