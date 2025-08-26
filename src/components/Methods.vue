<template>

<section>
    <p class="font-bold text-3xl">Methods</p>
    <UAccordion :items="groupedMethods" :ui="{label: 'text-2xl font-bold'}">
        <template #content="{item}">
            <UAccordion :items="groupContent(item.content)">
                <template #content="{item}">
                    <MethodCard :method="item.content" class="m-2"/>
                </template>
            </UAccordion>
        </template>
    </UAccordion>
</section>

</template>


<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';
import type {Methods, Components, MethodObject} from '@open-rpc/meta-schema'
import { computed } from 'vue';
import MethodCard from './MethodCard.vue';

const props = defineProps<{
    methods: Methods
}>()

const groupedMethods = computed<AccordionItem[]>(()=> {
    const map = new Map();

    for (const item of props.methods) {
        for (const tag of item.tags || [{name: 'default'}]) {
        if (!map.has(tag.name)) {
            map.set(tag.name, []);
        }
        map.get(tag.name).push(item);
        }
    }

    return Array.from(map.entries()).map(([label, content]) => ({
        label,
        content
    }));
})

const groupContent = (methods: MethodObject[]) => {
    return methods.map(m => {
        return {
            label: m.name,
            content: m
        }
    })
}


</script>