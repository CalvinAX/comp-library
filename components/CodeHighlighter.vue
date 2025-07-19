<template>
    <div class="bg-gray-950 border border-gray-700 rounded-lg">
        <div class="flex gap-2 items-center py-2 px-4">
            <p class="text-white">Language: TypeScript</p>
            <p class="text-white">Theme: Catppuccin Frappé</p>
        </div>
        <Shiki lang="ts" code="const inputValue: Ref<string> = ref('')"
            :highlight-options="{ theme: 'catppuccin-macchiato' }" />
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>