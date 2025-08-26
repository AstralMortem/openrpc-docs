<template>
    <UApp>
        <RPCDocs :spec="spec"/>
    </UApp>  
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeMount } from 'vue';


const spec = ref('')


onBeforeMount(()=> {
    spec.value = window.OpenRPCSpec
})

</script>