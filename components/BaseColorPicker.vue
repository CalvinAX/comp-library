<template>
  <color-picker
    v-slot="{ show }"
    v-model="colorRef"
    :with-alpha="props.alpha"
    :with-initial-color="props.initialColor"
    :with-eye-dropper="props.eyeDropper"
    :with-hex-input="props.hex"
    :with-rgb-input="props.rgb"
    :with-colors-history="props.history"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event)"
  >
    <div class="m-0 p-0 w-fit h-fit" @click="show">
      <slot />
    </div>
  </color-picker>
</template>

<script setup lang="ts">
// expose types here since module doesn't expose them
// this is just a workaround until nuxt module fixes it
export type ModuleRGB = {
  r: number
  g: number
  b: number
}
export type ModuleRGBA = ModuleRGB & {
  a: number
}
export type ModuleHSV = {
  h: number
  s: number
  v: number
}
export type ModuleHEX = string

export type ModuleColorMultiType = {
  rgba: ModuleRGBA
  hsv: ModuleHSV
  hex: ModuleHEX
}

const props = withDefaults(defineProps<{
  modelValue?: ModuleColorMultiType | null
  alpha?: boolean
  initialColor?: boolean
  eyeDropper?: boolean
  hex?: boolean
  rgb?: boolean
  history?: boolean
}>(), {
  modelValue: null,
  alpha: false,
  initialColor: false,
  eyeDropper: false,
  hex: true,
  rgb: false,
  history: true,
})

const colorRef = ref('')

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModuleColorMultiType): void
}>()
</script>

<style lang="scss">
.CP-block {
    background-color: var(--color-gray-950) !important;
    border: 1px solid var(--color-gray-700);

    .CP--box-border {
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
    }

    .CP-block__pickers__saturation,
    .CP-canvas-picker__alpha,
    .CP-block__pickers__hue,
    .CP-block__rows__preview {
        border: 1px solid var(--color-gray-700);
        border-radius: var(--radius-lg) !important;
        overflow: hidden !important;
    }

    .CP-box {
        border: 1px solid var(--color-gray-700);
        border-radius: var(--radius-lg);
        transition: var(--default-transition-timing-function) var(--default-transition-duration);

        .CP-box__value {
            background-color: var(--color-gray-950);
            color: var(--color-white);
        }

        .CP-box__name {
            background-color: var(--color-gray-900);
            border-right: 1px solid var(--color-gray-700);
            color: var(--color-white);
        }

        &:focus-within {
            border-color: var(--color-emerald-500) !important;
        }
    }

    .CP-colors__items__item {
        border-radius: calc(infinity * 1px);
    }
}

/*--colorPickerBg
--colorPickerInputTitle
--colorPickerInputTitleBg
--colorPickerInputText
--colorPickerInputTextBg
--colorPickerDropper
--colorPickerDropperBg
--colorPickerShadowOut
--colorPickerShadowIn
--colorPickerSlider*/
</style>
