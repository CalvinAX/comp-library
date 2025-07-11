<template>
  <div ref="popover" class="relative">
    <div class="cursor-pointer w-fit h-fit m-0 p-0" @click="isOpen = !isOpen">
      <slot />
    </div>

    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute left-1/2 mt-2 bg-gray-950 border border-gray-700 rounded-lg shadow-lg py-2 px-4 z-101 min-w-[200px]"
        :class="popoverPositionClass"
        style="transform: translateX(-50%);"
      >
        <p v-if="props.label" class="text-white text-center">
          {{ props.label }}
        </p>
        <slot v-else name="content" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  position?: 'top' | 'bottom'
  outsideClose?: boolean
  label?: string
}>(), {
  position: 'top',
  outsideClose: false,
})

const isOpen = ref(false)
const popover = ref<HTMLElement | null>(null)

function handleClickOutside(event: MouseEvent) {
  if (isOpen.value && popover.value && !popover.value.contains(event.target as Node) && props.outsideClose) {
    isOpen.value = false
  }
}

const popoverPositionClass = computed(() => {
  switch (props.position) {
    case 'top': return 'bottom-full mb-2'
    case 'bottom': return 'top-full mt-2'
    default: return 'top-full mt-2'
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped></style>
