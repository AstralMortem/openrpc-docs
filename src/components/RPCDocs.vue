<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type {OpenrpcDocument} from '@open-rpc/meta-schema';
import { useOpenRPC } from '../composables/useOpenRPC';

const props = defineProps<{
    spec: OpenrpcDocument | string
}>()

const { schema, status, error, loadSchema } = useOpenRPC();

onMounted(async () => {
    await loadSchema(props.spec);
});


</script>

<template>
    <div class="w-full max-w-screen h-full">
        <div v-if="status === 'error'" class="flex items-center justify-center h-full">
            <p class="text-red-500">Error loading spec: {{ error }}</p>
        </div>
        <div v-else-if="status === 'success' && schema" class="w-full h-full relative">
            <NavHeader :info="schema.info" :servers="schema.servers" class="sticky w-full" />
            <UContainer class="flex flex-col gap-8 mt-8">
                <Methods :methods="schema.methods"/>
            </UContainer>
        </div>
        <div v-else class="flex items-center justify-center h-full">
            <p>Loading...</p>
        </div>
    </div>
</template>