<script setup lang="ts">
import type { JSONSchemaObject } from "@open-rpc/meta-schema";
import { ref, computed } from "vue";


const props = defineProps<{
  schema: JSONSchemaObject;
  name?: string;
}>();

const isObject = computed(() => props.schema.type === "object" && props.schema.properties);
const isArray = computed(() => props.schema.type === "array" && props.schema.items);
</script>

<template>
  <div class="border rounded-2xl p-2 my-2 shadow-sm">
    <!-- Schema title/name -->
    <div class="flex items-center justify-between">
      <h3 class="font-semibold text-lg">
        {{ props.name || props.schema.title || "Schema" }}
      </h3>
      <span v-if="props.schema.type" class="text-xs px-2 py-0.5 rounded">
        {{ Array.isArray(props.schema.type) ? props.schema.type.join(" | ") : props.schema.type }}
      </span>
    </div>

    <!-- Description -->
    <p v-if="props.schema.description" class="text-gray-600 text-sm mt-1">
      {{ props.schema.description }}
    </p>

    <!-- Enum -->
    <div v-if="props.schema.enum" class="mt-2">
      <span class="font-medium text-sm">Enum:</span>
      <span class="text-xs text-blue-600 ml-2">{{ props.schema.enum.join(", ") }}</span>
    </div>

    <!-- Object properties -->
    <div v-if="isObject" class="mt-3">
      <span class="font-medium text-sm">Properties:</span>
      <div class="ml-4 border-l pl-3 space-y-2">
        <TypeViewer
          v-for="(sub, key) in props.schema.properties"
          :key="key"
          :name="key"
          :schema="sub"
        />
      </div>
    </div>

    <!-- Array items -->
    <div v-if="isArray" class="mt-3">
      <span class="font-medium text-sm">Items:</span>
      <div class="ml-4 border-l pl-3">
        <TypeViewer :schema="props.schema.items!" />
      </div>
    </div>
  </div>
</template>
