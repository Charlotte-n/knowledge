<script lang="ts" setup>
import { nextTick, onMounted, provide, ref } from 'vue'
import SelectCom from './components/SelectCom.vue'
import GraphView from './components/GraphView.vue'
import ChangeLayOut from './components/ChangeLayOut.vue'
import { getWH } from '@/utils/element.ts'

function handleSearch() {}
const Width = ref(0)

onMounted(() => {
  const { width } = getWH(document.querySelector('.el-container') as HTMLElement)
  Width.value = width - 50
})

const graph = ref()
const graphInstance = ref()
onMounted(() => {
  nextTick(() => {
    graphInstance.value = graph.value.graph
  })
})
</script>

<template>
  <el-container class="w-[100%]">
    <el-header class="flex justify-between" ref="header">
      <SelectCom @search="handleSearch" />
      <ChangeLayOut :graph="graphInstance"></ChangeLayOut>
    </el-header>
    <el-main>
      <GraphView :width="Width" ref="graph"> </GraphView>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped></style>
