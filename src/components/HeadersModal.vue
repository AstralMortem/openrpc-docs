<script setup lang="ts">
import { computed } from 'vue';
import { useHeaders } from '../composables/useHeaders';


const {headers, setHeader, removeHeader} = useHeaders()
const headersCount = computed(() => Object.keys(headers.value).length)

const changeHeader = (oldKey: string, newKey: string) => {
  if (oldKey !== newKey) {
    headers.value[newKey] = headers.value[oldKey];
    delete headers.value[oldKey];
  }
};

</script>


<template>
    <UModal title="Custom Headers" description="Set custom headers for all requests" >
        <UButton>Headers ({{ headersCount }})</UButton>
        <template #body>
            <div class="flex flex-col space-y-4">
                <div v-for="(value, key) in headers" :key="key" class="flex flex-row gap-2">
                    <UFormField label="Header Key">
                        <UInput :value="key" @change="changeHeader(key as string, $event.target.value)"/>
                    </UFormField>
                    <UFormField label="Header Value">
                        <div class="flex flex-row gap-3 items-center">
                            <UInput v-model="headers[key]"/>
                            <UButton color="error" icon="mdi:close" size="xs" variant="soft" @click="() => removeHeader(key)"/>
                        </div>
                    </UFormField>                    
                </div>
                <div class="flex w-full items-center justify-center">
                    <UButton color="neutral" icon="mdi:plus" @click="() => setHeader('','')">Add Header</UButton>
                </div>
            </div>
        </template>
    </UModal>
</template>