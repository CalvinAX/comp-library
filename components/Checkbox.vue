<template>
  <div>
    <input :id="props.id" type="checkbox" hidden>
    <label
      :for="props.id"
      tabindex="-1"
      class="w-6 h-6 bg-gray-950 border-2 rounded-lg flex items-center justify-center p-1 outline-2 outline-transparent focus-visible:outline-brand-500 cursor-pointer transition"
      :class="props.modelValue ? 'border-brand-600' : 'border-gray-700 outline-brand-500'"
      @click="emit('update:modelValue', !props.modelValue)"
    >
      <Transition
        enter-active-class="transition duration-200"
        enter-from-class="opacity-0 scale-80"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition scale-100"
        leave-from-class="opacity-100 scale-80"
        leave-to-class="opacity-0"
      >
        <Icon v-if="props.modelValue" :name="props.icon" class="text-brand-500" />
      </Transition>
    </label>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  id: string
  icon?: string
}>(), {
  icon: 'lucide:check',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>
