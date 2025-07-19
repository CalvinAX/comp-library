<template>
  <div
    class="flex items-center justify-center bg-gray-950 border border-gray-700 text-white rounded-lg transition overflow-hidden outline-2"
    :class="[isFocused ? 'outline-brand-500' : 'outline-transparent']"
  >
    <Icon
      v-if="props.icon && iconPosition === 'left'"
      name="lucide:moon"
      size="18px"
      class="py-2 px-6"
    />
    <input
      :type="props.type"
      v-bind="$attrs"
      class="py-2 focus:outline-none"
      :class="inputPadding"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @input="onInput"
    >
    <Icon
      v-if="props.icon && iconPosition === 'right'"
      name="lucide:moon"
      size="18px"
      class="py-2 px-6"
    />
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: string
  type?: HTMLInputElement['type']
  icon?: string
  iconPosition?: 'left' | 'right'
}>(), {
  type: 'text',
  iconPosition: 'left',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isFocused = ref(false)

const inputPadding = computed(() => {
  if (props.icon && props.iconPosition === 'left') return 'pe-4'
  if (props.icon && props.iconPosition === 'right') return 'ps-4'
  return 'px-4'
})

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
