<template>
  <!-- TODO: Keep slider like this for now, rebuild easier later tho -->
  <div class="w-full">
    <div
      ref="sliderRef"
      class="relative w-full h-8 flex items-center select-none rounded-lg"
      :class="isFocused ? 'outline-emerald-500 outline-2' : 'outline-transparent'"
      role="slider"
      :aria-valuenow="modelValue"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-label="ariaLabel"
      tabindex="0"
      @keydown="onKeydown"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @mousedown="(e) => { if (e.button === 0) setValueFromPosition(e.clientX) }"
      @touchstart="(e) => setValueFromPosition(e.touches[0].clientX)"
    >
      <div
        class="absolute left-0 top-1/2 w-full h-2 bg-gray-800 rounded-lg"
        style="transform: translateY(-50%)"
      />
      <div
        class="absolute top-1/2 h-2 bg-linear-to-r from-emerald-700 to-emerald-500 rounded-lg"
        :style="{ left: '0', width: percent + '%', transform: 'translateY(-50%)' }"
      />
      <button
        type="button"
        class="absolute top-1/2 w-5 h-5 bg-emerald-500 border-2 border-gray-700 rounded-full flex items-center justify-center shadow transition"
        :style="{ left: `calc(${percent}% - 12px)`, transform: 'translateY(-50%)' }"
        :aria-label="ariaLabel"
        :aria-valuenow="modelValue"
        :aria-valuemin="min"
        :aria-valuemax="max"
        role="slider"
        tabindex="-1"
        @mousedown="onDragStart"
        @touchstart="onDragStart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  ariaLabel?: string
}>(), {
  min: 0,
  max: 100,
  step: 1,
  ariaLabel: 'Slider',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const isFocused = ref(false)
const dragging = ref(false)
const sliderRef = ref<HTMLElement | null>(null)

const percent = computed(() => {
  const range = props.max - props.min
  return ((props.modelValue - props.min) / range) * 100
})

function clamp(val: number) {
  return Math.min(props.max, Math.max(props.min, val))
}

function setValueFromPosition(x: number) {
  const slider = sliderRef.value
  if (!slider) return
  const rect = slider.getBoundingClientRect()
  const relX = x - rect.left
  const percent = Math.max(0, Math.min(1, relX / rect.width))
  let value = props.min + percent * (props.max - props.min)
  value = Math.round(value / props.step) * props.step
  emit('update:modelValue', clamp(value))
}

function onDragStart(e: MouseEvent | TouchEvent) {
  dragging.value = true
  document.body.style.userSelect = 'none'
  const move = (event: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    setValueFromPosition(clientX)
  }
  const up = () => {
    dragging.value = false
    document.body.style.userSelect = ''
    window.removeEventListener('mousemove', move)
    window.removeEventListener('touchmove', move)
    window.removeEventListener('mouseup', up)
    window.removeEventListener('touchend', up)
  }
  window.addEventListener('mousemove', move)
  window.addEventListener('touchmove', move)
  window.addEventListener('mouseup', up)
  window.addEventListener('touchend', up)
}

function onKeydown(e: KeyboardEvent) {
  let value = props.modelValue
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    value = clamp(value - props.step)
    emit('update:modelValue', value)
    e.preventDefault()
  }
  else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    value = clamp(value + props.step)
    emit('update:modelValue', value)
    e.preventDefault()
  }
  else if (e.key === 'Home') {
    emit('update:modelValue', props.min)
    e.preventDefault()
  }
  else if (e.key === 'End') {
    emit('update:modelValue', props.max)
    e.preventDefault()
  }
}
</script>
