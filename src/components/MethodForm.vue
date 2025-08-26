<template>
    <UForm :state="state" :schema="schema" class="space-y-4" @submit.prevent="submit">
        <UFormField v-for="field in $props.method.params" :label="field?.name" :name="field?.name">
            <component :is="getComponent(field)"/>
        </UFormField>
        <UButton type="submit" label="Call method"/>
    </UForm>
</template>


<script setup lang="ts">
import { useRpcClient } from '../composables/useClient';
import type { FormSubmitEvent } from '@nuxt/ui';
import type { MethodObject, ContentDescriptorObject, JSONSchemaObject, Type, JSONSchema} from '@open-rpc/meta-schema';
import { h, ref, resolveComponent } from 'vue';
import z from 'zod';

const props = defineProps<{method: MethodObject}>()
const state = ref(Object.fromEntries(props.method.params.map(item => [item.name, undefined])))


const getComponent = (field: ContentDescriptorObject) => {    
    let component
    switch(field.schema.type as Type){
        case 'number':
            component = resolveComponent('UInput')
        case 'integer':
            component = resolveComponent('UInput')
        case 'string':
            component = resolveComponent('UInput')
        case 'boolean':
            component = resolveComponent('USwitch')
        case 'array':
            component = resolveComponent('USelectMenu')
        case 'object':
            component = resolveComponent('UTextarea')
        default:
            component = resolveComponent('UInput')   
    }

    return h(
        component,
        {
            placeholder: field.name,
            modelValue: state.value[field.name],
            'onUpdate:modelValue': (value) => state.value[field.name] = value
        }
    )


}

const getZodType = (field: JSONSchemaObject) => {
    let type: z.ZodString | z.ZodAny | z.ZodBoolean | z.ZodArray | z.ZodNumber | z.ZodObject
    switch(field.type as Type){
        case "string":
            type = z.string();
        case "number":
            type =  z.number();
        case "boolean":
            type = z.boolean();
        case "array":
            type = z.array(z.any());
        case "object":
            type = z.object({});
        default:
            type = z.any();
    }
    if(field.maxLength){
        type = type.max(field.maxLength)
    }
    if(field.minLength){
        type = type.min(field.minLength)
    }
    return type
}

const getFullZod = (field: JSONSchema) => {
    const t = getZodType(field)
    
    return t
}



const schema = z.object(Object.fromEntries(props.method.params.map(item => {
        const zType = getFullZod(item.schema)
        return [item.name, zType]
    })
))

type Schema = z.output<typeof schema>

const client = useRpcClient()
const emit = defineEmits(['success'])

const submit = async (e: FormSubmitEvent<Schema>) => {
    let response
    if(props.method.paramStructure === 'by-name'){
        response = await client.call(props.method.name, e.data)
    }else{
        response = await client.call(props.method.name, Object.values(e.data))
    }
    emit('success', response)
    
}



</script>