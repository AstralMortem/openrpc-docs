<template>

<table class="min-w-full border border-neutral-700 dark:border-neutral-200 text-left text-sm rounded-md">
        <thead>
            <tr>
                <th class="px-4 py-2 font-bold">Name</th>
                <th class="px-4 py-2 font-bold">Type</th>
                <th class="px-4 py-2 font-bold">Required</th>
                <th class="px-4 py-2 font-bold">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="param in items" :key="param.name" class="border-t ">
                <td class="px-4 py-2 font-mono text-primary-600 dark:text-primary-400">{{ param.name }}</td>
                <td class="px-4 py-2 cursor-pointer">
                    <UModal :title="`Type: ${param.schema.type}`">
                        <p>{{ param.schema.type || 'All of' }}</p>
                        <template #body>
                            <TypeViewer :schema="param.schema" :name="param.type"/>
                        </template>
                    </UModal>
                </td>
                <td class="px-4 py-2" :class="param.required?'text-error-500':''">{{ param.required ? 'yes' : 'no' }}</td>
                <td class="px-4 py-2">{{ param.description || '-' }}</td>
            </tr>
        </tbody>
    </table>


</template>


<script setup lang="ts">
import type { ContentDescriptorObject } from '@open-rpc/meta-schema';
import { computed } from 'vue';
import TypeViewer from './TypeViewer.vue';

const props = defineProps<{
    content: ContentDescriptorObject[] | ContentDescriptorObject
}>()


const items = computed(()=> {
    if(Array.isArray(props.content)){
        return props.content
    }
    return [props.content]
})

</script>