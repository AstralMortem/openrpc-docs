<template>
    <UModal :title="props.server.name || 'Server Info'" :description="props.server.url">
        <UButton size="xs" label="Info" icon="mdi:server" variant="soft" color="primary"/>
        <template #body>
            <div class="flex flex-col gap-4">
                <div v-if="props.server.description">
                    <p class="font-bold">Description</p>
                    <p>{{ props.server.description }}</p>
                </div>
                <div v-if="props.server.summary">
                    <p class="font-bold">Summary</p>
                    <p>{{ props.server.summary }}</p>
                </div>
                <div v-if="props.server.variables" class="flex flex-col gap-4">
                    <p class="font-bold">Variables</p>
                    <div class="flex flex-col gap-4">
                        <UCard v-for="(variable, name) in props.server.variables" :key="name">
                            <div class="flex flex-col gap-2">
                                <div class="flex flex-row items-center justify-between">
                                    <p class="font-bold text-xl underline">{{ name }}</p>
                                    <div class="flex flex-row gap-2 items-center">
                                        <p>Default:</p>
                                        <UBadge variant="soft" color="secondary">{{ variable.default }}</UBadge>
                                    </div>
                                </div>
                                <p v-if="variable.description">{{ variable.description }}</p>
                                <div v-if="variable.enum">
                                <p class="font-bold">Enum:</p>
                                <ul class="list-disc list-inside">
                                    <li v-for="val in variable.enum" :key="val">{{ val }}</li>
                                </ul>
                            </div>
                            </div>
                        </UCard>
                    </div>
                </div>

            </div>

        </template>
    </UModal>
</template>


<script setup lang="ts">
import type {ServerObject} from '@open-rpc/meta-schema';

const props = defineProps<{
    server: ServerObject
}>()


</script>