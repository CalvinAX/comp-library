<template>
  <div ref="dropdown" class="relative min-w-[200px]">
    <button
      class="px-4 py-2 w-full cursor-pointer bg-gray-950 text-white border border-gray-700 rounded-lg transition outline-2 outline-transparent focus:outline-brand-500 flex items-center justify-between"
      role="combobox"
      :aria-expanded="isOpen ? 'true' : 'false'"
      :aria-controls="props.ariaId"
      :aria-activedescendant="selectedOption ? selectedOption.value : ''"
      @click="isOpen = !isOpen"
    >
      {{ selectedOption?.label ? selectedOption.label : props.placeholder }}
      <Icon
        name="lucide:chevron-down"
        size="18"
        class="py-2 ms-6 transition"
        :class="[isOpen ? '-rotate-180' : 'rotate-0']"
      />
    </button>

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
        class="absolute z-100 mt-2 w-full bg-gray-950 border border-gray-700 rounded-lg shadow-lg p-2 max-h-[240px] overflow-y-scroll"
      >
        <TransitionGroup
          :id="props.ariaId"
          tag="ul"
          class="space-y-1"
          enter-active-class="transition duration-200"
          enter-from-class="opacity-0 -translate-x-2"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition duration-150"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-2"
          role="listbox"
        >
          <li v-if="props.searchable" key="searchbar">
            <input
              v-model="filterQuery"
              type="text"
              class="px-4 py-2 border border-gray-700 text-white rounded-lg w-full outline-2 outline-transparent focus-visible:outline-brand-500"
              :placeholder="props.searchPlaceholder"
              @input="filterOptions"
            >
          </li>
          <li v-if="props.searchable" key="divider">
            <hr class="border-gray-700 my-3">
          </li>
          <li
            v-for="(option, index) in options"
            :id="option.value"
            :key="index"
            class="text-white"
            role="option"
            :aria-selected="selectedOption?.value === option.value"
          >
            <button
              class="py-2 px-4 cursor-pointer w-full text-start transition hover:bg-gray-800 rounded-lg flex items-center gap-2 text-nowrap outline-2 outline-transparent focus-visible:outline-brand-500"
              :class="{ 'bg-gray-800': selectedOption?.value === option.value }"
              @click="selectOption(option)"
            >
              <Icon v-if="option.icon" :name="option.icon" size="18" />
              {{ option.label }}
            </button>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { TransitionGroup } from 'vue'

export interface Option {
  label: string
  value: any
  icon?: string
}

const props = withDefaults(defineProps<{
  options: Option[]
  placeholder?: string
  selected?: Option
  searchable?: boolean
  searchPlaceholder?: string
  ariaId: string
}>(), {
  placeholder: 'Select an option',
  searchable: false,
  searchPlaceholder: 'Search...',
})

const isOpen = ref(false)
const selectedOption = ref<Option | null>(props.selected || null)
const options = ref<Option[]>(props.options)
const filterQuery = ref('')
const dropdown = ref<HTMLElement | null>(null)

const emit = defineEmits<{
  (e: 'select', value: Option): void
}>()

function selectOption(option: Option) {
  selectedOption.value = option
  emit('select', selectedOption.value)
  isOpen.value = false
}

function filterOptions() {
  options.value = props.options.filter((option) => {
    return option.label.toLowerCase().includes(filterQuery.value.toLowerCase())
  })
}

function handleClickOutside(event: MouseEvent) {
  if (isOpen.value && dropdown.value && !dropdown.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
