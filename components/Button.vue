<template>
  <button
    type="button"
    class="px-4 py-2 rounded-lg transition outline-2 outline-transparent
    focus-visible:outline-2 focus-visible:outline-emerald-800"
    :class="classes"
    :disabled="props.state === 'disabled' || props.state === 'loading'"
    :aria-disabled="props.state === 'disabled' || props.state === 'loading' ? 'true' : undefined"
    :aria-busy="props.state === 'loading' ? 'true' : undefined"
  >
    <div v-if="props.state === 'loading'" class="animate-spin text-white flex">
      <Icon name="lucide:loader-circle" size="18px" />
    </div>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  state?: 'loading' | 'disabled' | 'none'
}>(), {
  state: 'none',
})

const classes = computed(() => {
  return {
    'bg-emerald-800 text-white/50 cursor-not-allowed': props.state === 'disabled',
    'bg-emerald-500 hover:bg-emerald-600 text-white cursor-wait': props.state === 'loading',
    'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer': props.state === 'none',
  }
})
</script>
