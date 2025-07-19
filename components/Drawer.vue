<template>
  <Transition
    enter-active-class="transition duration-100"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed top-0 left-0 inset-0 bg-black/50 z-190" @click="isOpen = false" />
  </Transition>

  <Transition
    enter-active-class="transition duration-200"
    :enter-from-class="animations[props.position]"
    enter-to-class="opacity-150 translate-x-0"
    leave-active-class="transition duration-150"
    leave-from-class="opacity-100 translate-x-0"
    :leave-to-class="animations[props.position]"
  >
    <div
      v-if="isOpen"
      class="fixed h-screen top-0 bg-gray-950 border-gray-700 z-191 p-4"
      v-bind="$attrs"
      :style="{ width: props.width + 'px' }"
      :class="props.position === 'left' ? 'left-0 border-r' : 'right-0 border-l'"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex items-center w-full" :class="props.position === 'right' ? 'justify-start' : 'justify-end'">
        <button class="text-white hover:text-brand-500 mb-3 transition cursor-pointer" @click="isOpen = false">
          <Icon name="lucide:x" size="18" />
        </button>
      </div>
      <slot />
    </div>
  </Transition>

  <div @click="isOpen = !isOpen">
    <slot name="trigger" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  position?: 'left' | 'right'
  width?: number
  closeIcon?: boolean
}>(), {
  position: 'left',
  width: 300,
  closeIcon: true,
})

const isOpen = ref(false)
const animations = {
  left: 'opacity-0 -translate-x-4',
  right: 'opacity-0 translate-x-4',
}
</script>

<style scoped></style>
