<template>
  <Transition
    enter-active-class="transition duration-100"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-50"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="props.open" class="fixed inset-0 w-screen h-screen bg-black/50 z-190" />
  </Transition>

  <Transition
    enter-active-class="transition duration-200"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="props.open"
      class="fixed inset-0 w-screen h-screen flex justify-center items-center z-191"
      role="dialog"
      aria-modal="true"
    >
      <div class="bg-gray-950 border border-gray-700 rounded-lg p-5">
        <div class="flex justify-between items-center">
          <p class="text-white text-lg">
            {{ props.title }}
          </p>
          <button
            class="text-white hover:text-emerald-500 transition cursor-pointer flex items-center justify-center"
            @click="$emit('close', false)"
          >
            <Icon name="lucide:x" size="18px" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>()
</script>
