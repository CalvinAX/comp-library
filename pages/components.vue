<template>
  <div
    class="border w-screen h-screen border-gray-700 p-10 flex flex-col justify-center items-center relative bg-gray-950"
  >

    <div class="flex flex-col gap-3 items-center justify-center w-full mb-5">
      <div class="flex gap-5 items-center">
        <NuxtLink to="/" class="text-white hover:text-brand-500 transition flex items-center gap-2">
          <Icon name="lucide:arrow-left" size="18" />
          Home
        </NuxtLink>
      </div>
      <hr class="border-gray-700 w-full">
    </div>
    <div class="flex gap-3 flex-wrap">
      <div
        class="flex flex-col gap-3 items-center justify-center bg-gray-950 border border-gray-700 p-4 rounded-lg relative z-10"
      >
        <Button state="none">
          Default Button
        </Button>
        <Button state="disabled">
          Disabled Button
        </Button>
        <Button state="loading">
          Loading Button
        </Button>
        <Button state="none" icon="lucide:check" icon-position="left">
          Icon Button
        </Button>
        <Button state="disabled" icon="lucide:moon" icon-position="right">
          Icon Button
        </Button>
      </div>
      <div
        class="flex flex-col gap-3 items-center justify-center bg-gray-950 border border-gray-700 p-4 rounded-lg relative z-10"
      >
        <Input v-model="inputValue" type="text" />
        <Input
          v-model="inputValue"
          type="text"
          icon="lucide:moon"
          icon-position="right"
        />
        <Input
          v-model="inputValue"
          type="text"
          icon="lucide:moon"
          icon-position="left"
          placeholder="Test placeholder"
        />
        <p class="text-white">
          Value: {{ inputValue }}
        </p>
      </div>
      <div
        class="flex flex-col gap-3 items-center justify-center bg-gray-950 border border-gray-700 p-4 rounded-lg relative z-10"
      >
        <Checkbox id="checkbox1" v-model="checkValue" />
        <Checkbox id="checkbox2" v-model="checkValue" icon="lucide:heart" />
        <p class="text-white">
          Value: {{ checkValue }}
        </p>
      </div>
      <div
        class="flex flex-col gap-3 items-center justify-center w-[160px] bg-gray-950 border border-gray-700 p-4 rounded-lg relative z-10"
      >
        <Slider
          v-model="sliderValue"
          :min="1"
          :max="100"
          :step="1"
          aria-label="Slider 1"
        />
        <p class="text-white">
          Value: {{ sliderValue }}
        </p>
      </div>
      <div
        class="flex flex-col gap-3 items-center justify-center bg-gray-950 border border-gray-700 p-4 rounded-lg relative z-10"
      >
        <BaseColorPicker
          v-model="colorValue"
          :alpha="true"
          :initial-color="true"
          :eye-dropper="true"
          :hex="true"
          :rgb="true"
          :history="true"
        >
          <Button>Color Picker</Button>
        </BaseColorPicker>
        <p class="text-white text-wrap">
          Value: <span :style="`color: ${colorValue?.hex};`">
            {{ colorValue?.hex
            }}
          </span>
        </p>
      </div>
      <div
        class="flex flex-col gap-3 items-center justify-center bg-gray-950 border border-gray-700 p-4 rounded-lg relative z-10"
      >
        <Modal :open="modalState" title="Test Modal" @close="modalState = false">
          <p class="text-white">
            Cool Modal! Really easy to use. It's fun building UI likes this!
          </p>
        </Modal>
        <Button @click="modalState = true">
          Open Modal
        </Button>
      </div>
      <div
        class="flex flex-col gap-3 items-center justify-center bg-gray-950 border border-gray-700 p-4 rounded-lg relative z-10"
      >
        <Popover
          position="top"
          aria-id="popover1"
          :outside-close="true"
          label="Popover"
        >
          <p class="text-emerald-500">
            Cool Popover (top)
          </p>
        </Popover>
        <Popover position="bottom" aria-id="popover2" :outside-close="false">
          <p class="text-emerald-500">
            Cool Popover (bottom)
          </p>
          <template #content>
            <p class="text-blue-500">
              Custom HTML content
            </p>
          </template>
        </Popover>
      </div>
      <div
        class="flex flex-col gap-3 items-center justify-center bg-gray-950 border border-gray-700 p-4 rounded-lg relative z-10"
      >
        <Select
          placeholder="Cool Select"
          :options="options"
          aria-id="select1"
          @select="selectValue = $event"
        />
        <Select
          placeholder="Cool Select"
          :options="options"
          aria-id="select1"
          :selected="options[0]"
          :searchable="true"
          search-placeholder="Search..."
          @select="selectValue = $event"
        />
        <p class="text-white text-wrap">
          Label: {{ selectValue?.label }}
        </p>
        <p class="text-white text-wrap">
          Value: {{ selectValue?.value }}
        </p>
        <p class="text-white text-wrap">
          Icon:
          <Icon v-if="selectValue?.icon" :name="selectValue?.icon" size="18" />
        </p>
      </div>
    </div>
    <div ref="grid" class="absolute inset-0 grid-bg pointer-events-none z-1" />
  </div>
</template>

<script setup lang="ts">
import type { ModuleColorMultiType } from '~/components/BaseColorPicker.vue'
import type { Option } from '~/components/Select.vue'

const inputValue = ref('')
const checkValue = ref(true)
const sliderValue = ref(50)
const colorValue: Ref<ModuleColorMultiType | null> = ref(null)
const modalState = ref(false)
const selectValue = ref<Option | null>(null)

const options = [
  { label: 'Option 1', value: 'option1', icon: 'lucide:check' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3', icon: 'lucide:star' },
]
</script>

<style scoped>
.grid-bg {
    background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
    background-size: 30px 30px;
    /* Grid size */
    transition: transform 0.1s ease-out;
}
</style>
