<template>
    <div class="flex flex-row justify-between items-center p-4 ring-1">
        <div class="flex flex-row items-center gap-6">
            <LogoModal :info="props.info"/>
            <div class="flex flex-row items-center gap-2">
                <USelectMenu placeholder="Server endpoint" :items="servers" v-model="selectedServer" />
                <ServerInfoModal v-if="selectedServer" :server="$props.servers?.find(x => x.url === selectedServer)"/>
            </div>
        </div>
        <div class="flex flex-row items-center gap-2 justify-end">
            <HeadersModal/>
            <ColorMode/>
        </div>
    </div>    
</template>


<script lang="ts" setup>
import { useServerEndpoint } from '../composables/useServerUrl';
import type { InfoObject, Servers } from '@open-rpc/meta-schema';
import { computed, onMounted, ref, watch } from 'vue';
import HeadersModal from './HeadersModal.vue';

const props = defineProps<{
    info: InfoObject;
    servers?: Servers;
}>()


const servers = computed(()=> props.servers?.map(s => {
    return {
        label: s.url,
        value: s.url,
    }
})) 

const selectedServer = ref<string>()
const endpoint = useServerEndpoint()

watch(selectedServer, ()=> {
    const obj = props.servers?.find(x => x.url === selectedServer.value)
    if(obj?.variables){
        endpoint.value = obj.url.replace(/\${(.*?)}/g, (_, key) => {
            return obj.variables[key]?.default ?? ""; // fallback to empty string if not found
            });
    }else{
        endpoint.value = selectedServer.value
    }
    
})



onMounted(() => {
    if(props.servers?.length){
        selectedServer.value = props.servers[0].url
    }
})

</script>