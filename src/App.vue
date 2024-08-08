<script setup lang="ts">
import NavigationCom from './components/navigation/NavigationCom.vue'
</script>

<template>
  <div class="flex px-[20px] pt-[50px] w-[100%]">
    <div>
      <NavigationCom></NavigationCom>
    </div>
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
