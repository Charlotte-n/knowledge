<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
    default: 15
  }
})
</script>

<template>
  <el-skeleton animated :rows="rows"></el-skeleton>
</template>

<style scoped lang="scss"></style>
