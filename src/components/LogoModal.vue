<template>
    <UModal :title="props.info.title || 'OpenRPC Docs'" :description="props.info.version">
        <div class="flex flex-row gap-2 items-center cursor-pointer">
            <p class="font-bold text-3xl">{{ $props.info.title || 'OpenRPC Docs' }}</p>
            <UBadge class="font-bold">{{ $props.info.version }}</UBadge>
        </div>
        <template #body>
            <div class="flex flex-col gap-4">
                <div v-if="$props.info.description" class="flex flex-col gap-2">
                    <p class="font-bold text-xl">Description</p>
                    <p>{{ $props.info.description }}</p>
                </div>
                <div v-if="$props.info.license" class="flex flex-col gap-2">
                    <p class="font-bold text-xl">License</p>
                    <UButton :to="$props.info.license.url" icon="mdi:license" :label="$props.info.license.name" block class="w-fit"/>
                </div>
                <div v-if="$props.info.contact" class="flex flex-col gap-2">
                    <p class="font-bold text-xl">Contact</p>
                    <div class="flex flex-row flex-wrap gap-2">
                        <UButton v-if="$props.info.contact.url" icon="mdi:web" :to="$props.info.contact.url" :label="$props.info.contact.url" block class="w-fit"/>
                        <UButton v-if="$props.info.contact.email" icon="mdi:email" :to="`mailto:${$props.info.contact.email}`" :label="$props.info.contact.email" block class="w-fit"/>
                        <UButton v-if="$props.info.contact.name" icon="mdi:search" :to="`https://www.google.com/search?q=${$props.info.contact.name}`" :label="$props.info.contact.name" block class="w-fit"/>
                    </div>
                </div>
                <div v-if="$props.info.termsOfService" class="flex flex-col gap-2">
                    <p class="font-bold text-xl">Terms of Service</p>
                    <UButton :to="$props.info.termsOfService" icon="mdi:file-document" :label="$props.info.termsOfService" block class="w-fit"/>
                </div>
            </div>

        </template>
    </UModal>
</template>

<script setup lang="ts">
import type { InfoObject } from '@open-rpc/meta-schema';


const props = defineProps<{
    info: InfoObject
}>()

</script>