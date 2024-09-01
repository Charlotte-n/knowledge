<script lang="ts" setup>
import { nextTick, onMounted, provide, ref } from 'vue'
import SelectCom from './components/SelectCom.vue'
import GraphView from './components/GraphView.vue'
import ChangeLayOut from './components/ChangeLayOut.vue'
import { getWH } from '@/utils/element.ts'
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '@/components/loading-copmonent/LoadingComponent.vue'

function handleSearch() {}
const Width = ref(0)

const graph = ref()
const graphInstance = ref()
const isLoading = ref(true)
const AsyncComp = defineAsyncComponent({
  loader: () => import('./components/GraphView.vue'),
  delay: 200,
  timeout: 3000,
  loadingComponent: LoadingComponent
})
onMounted(async () => {
  const { width } = getWH(document.querySelector('.el-container') as HTMLElement)
  Width.value = width - 50
  await nextTick(() => {
    graphInstance.value = graph.value.graph
    isLoading.value = false
  })
})
function closeLoading() {
  isLoading.value = false
}
</script>

<template>
  <el-container>
    <el-header class="flex justify-between" ref="header">
      <SelectCom @search="handleSearch" />
      <ChangeLayOut :graph="graphInstance"></ChangeLayOut>
    </el-header>
    <el-main>
      <!--      弄成异步组件-->
      <Suspense>
        <template #fallback>
          <LoadingComponent v-if="isLoading"></LoadingComponent>
        </template>
        <AsyncComp :width="Width" ref="graph" @closeLoading="closeLoading"></AsyncComp>
      </Suspense>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped></style>
