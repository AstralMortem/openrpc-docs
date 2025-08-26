<template>

<UCard>
    <template #header>
        <div class="flex flex-row justify-between items-center gap-10">
            <div class="flex flex-col gap-1">
                <p class="font-bold text-xl">{{  $props.method.name }}</p>
                <p class="text-xs font-gray-400">{{ $props.method.description }}</p>
            </div>
            
            <UButton label="Try It" class="cursor-pointer" icon="mdi:web" :variant="isTryStart?'solid':'subtle'" @click="isTryStart = !isTryStart"/>
        </div>
    </template>
    <div v-if="!isTryStart" class="p-4 flex flex-col gap-4">
        <div class="flex flex-row gap-2">
            <p class="font-bold text-lg">Parameters</p>
            <UBadge v-if="$props.method.paramStructure">{{ $props.method.paramStructure }}</UBadge>
        </div>  
        <ContentTable :content="$props.method.params"/>
        <USeparator label="Responses"/>
        <p class="font-bold text-lg">Results</p>
        <ContentTable :content="$props.method.result"/>
        <p v-if="$props.method.errors" class="font-bold text-lg">Errors</p>
        <ErrorsTable v-if="$props.method.errors" :errors="$props.method.errors || []"/>
        <USeparator label="Examples"/>
        <UAccordion :items="groupExamples($props.method.examples || [])" :ui="{label: 'text-lg font-bold'}">
            <template #content="{item}">
                <div class="flex flex-row gap-2 justify-between items-center mx-2 my-2">
                    <UCard class="flex flex-col gap-2">
                        <p class="font-bold">Request</p>
                        <pre>
                            <code>
                                {{ JSON.stringify(createExampleRequest(item.content), null, 1) }}
                            </code>
                        </pre>
                    </UCard>
                    <UCard class="flex flex-col gap-2">
                        <p class="font-bold">Response</p>
                        <pre>
                            <code>
                                {{ JSON.stringify(createExampleResponse(item.content), null, 1) }}
                            </code>
                        </pre>
                    </UCard>
                </div>
            </template>
        </UAccordion>
    </div>
    <div v-else class="p-4 flex flex-col gap-4">
        <MethodForm :method="$props.method" @success="onResponse"/>
        <UCard>
            <div v-if="status === 'error'" class="flex flex-col gap-2">
                <p  class="font-bold text-xl text-error-500">Error</p>
                <p>{{ error }}</p>
            </div>
            <div v-else-if="status === 'success'">
                <p class="font-bold text-xl">Response</p>
                <pre>
                    <code>
                        {{ JSON.stringify(response) }}
                    </code>
                </pre>
            </div>
            <div v-else-if="status === 'loading'">
                <USkeleton class="w-full h-10"/>
            </div>
        </UCard>
    </div>
</UCard>

</template>


<script setup lang="ts">
import type { MethodObject, MethodObjectExamples, ExamplePairingObject, JSONSchemaObject } from '@open-rpc/meta-schema';
import { h, ref, resolveComponent, type Ref } from 'vue';
import ErrorsTable from './ErrorsTable.vue';
import { useRpcClient } from '../composables/useClient';

const isTryStart = ref(false)

const {status, error} = useRpcClient()
const response = ref({})
const onResponse = (value) => {
    response.value = value
}

const props = defineProps<{
    method: MethodObject
}>()

const groupExamples = (examples: MethodObjectExamples) => {
    return examples.map((ex, index) => ({
        label: ex.name,
        content: ex
    }))
}

const createExampleRequest = (example: ExamplePairingObject) => {
    return {
        jsonrpc: "2.0",
        method: props.method.name,
        params: example.params.map(p => {
            return p.value;
        }),
        id: 1
    }
}

const createExampleResponse = (example: ExamplePairingObject) => {
    return {
        jsonrpc: '2.0',
        id: 1,
        result: example.result
    }
}





</script>