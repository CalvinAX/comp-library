<template>
  <button
    type="button"
    class="px-4 py-2 rounded-lg transition outline-2 outline-transparent
    focus-visible:outline-2 focus-visible:outline-brand-800 flex items-center justify-center gap-2"
    :class="[classes, props.iconPosition === 'right' ? 'flex-row-reverse' : 'flex-row']"
    :disabled="props.state === 'disabled' || props.state === 'loading'"
    :aria-disabled="props.state === 'disabled' || props.state === 'loading' ? 'true' : undefined"
    :aria-busy="props.state === 'loading' ? 'true' : undefined"
  >
    <Icon v-if="props.icon && !(props.state == 'loading')" :name="props.icon" />
    <div v-if="props.state === 'loading'" class="animate-spin text-white flex">
      <Icon name="lucide:loader-circle" size="18px" />
    </div>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  state?: 'loading' | 'disabled' | 'none'
  icon?: string
  iconPosition?: 'left' | 'right'
}>(), {
  state: 'none',
})

const classes = computed(() => {
  return {
    'bg-brand-800 text-white/50 cursor-not-allowed': props.state === 'disabled',
    'bg-brand-500 hover:bg-brand-600 text-white cursor-wait': props.state === 'loading',
    'bg-brand-500 hover:bg-brand-600 text-white cursor-pointer': props.state === 'none',
  }
})
</script>
