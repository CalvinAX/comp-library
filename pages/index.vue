<template>
  <div class="min-w-screen min-h-screen flex justify-center items-center bg-gray-950">
    <div
      class="min-w-4/5 min-h-[460px] border border-gray-700 rounded-lg p-10 flex flex-col justify-center items-center relative bg-gray-950"
    >

      <div class="flex items-center justify-center relative z-10">
        <Popover :outside-close="true" position="bottom">
          <p class="text-white">
            Test Text
          </p>
          <template #content>
            <p class="text-blue-500 text-nowrap">
              This is a cool popover with custom content!
            </p>
          </template>
        </Popover>
      </div>
      <Button class="mt-10" @click="console.log(inputValue)">
        Show Value
      </Button>

      <div ref="grid" class="absolute inset-0 grid-bg pointer-events-none z-1" />
    </div>
  </div>
</template>

<script setup lang="ts">
const inputValue: Ref<any> = ref(null)

const options = [
  {
    label: 'Bird',
    value: 'option1',
    icon: 'lucide:moon',
  },
  {
    label: 'Tree',
    value: 'option2',
    icon: 'lucide:sun',
  },
  {
    label: 'House',
    value: 'option3',
  },
  {
    label: 'Cloud',
    value: 'option4',
    icon: 'lucide:cloud',
  },
  {
    label: 'Bike',
    value: 'option5',
  },
  {
    label: 'Motorcycle',
    value: 'option6',
    icon: 'lucide:star',
  },
  {
    label: 'Twig',
    value: 'option7',
  },
  {
    label: 'Vue',
    value: 'option8',
    icon: 'lucide:heart',
  },
  {
    label: 'React',
    value: 'option9',
  },
  {
    label: 'Angular',
    value: 'option10',
    icon: 'lucide:bell',
  },
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
