<template>

<table class="min-w-full border border-neutral-700 dark:border-neutral-200 text-left text-sm rounded-md">
    <thead>
        <tr>
            <th class="px-4 py-2 font-bold">Code</th>
            <th class="px-4 py-2 font-bold">Message</th>
            <th class="px-4 py-2 font-bold">Data</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="error in errors" :key="error.code" class="border-t ">
            <td class="px-4 py-2 font-mono text-error-600 dark:text-error-400">{{ error.code }}</td>
            <td class="px-4 py-2">{{ error.message }}</td>
            <td class="px-4 py-2">
                <UPopover>
                    {{ error.data?.type || 'N/A' }}
                    <template #content>
                        {{ error.data }}
                    </template>
                </UPopover>
            </td>
        </tr>
    </tbody>
</table>

</template>


<script setup lang="ts">
import type { MethodObjectErrors } from '@open-rpc/meta-schema';


const props = defineProps<{
    errors: MethodObjectErrors
}>()

</script>