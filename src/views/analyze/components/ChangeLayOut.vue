<script lang="ts" setup>
import { inject, nextTick, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { dagreLayOut, forceLayOut, useCircleLayOut, useStrictRadialLayOut } from '@/data/analzer'
import { useGraphNodesAndEdges } from '@/hooks/GrapView'
import { downLoad } from '@/utils/download'
import { onUnmounted } from 'vue'

const props = defineProps<{
  graph: any
}>()

const layoutType = ref('')
const previousSelected = ref('')
const select = ref<any>()
function refreshData() {
  try {
    props.graph.processParallelEdges()
    props.graph.paint()
  } catch (e) {
    console.error('刷新数据失败')
  }
}
function exportData() {
  props.graph.paint()
  const canvas = props.graph.getCanvas() // Ensure we get the actual canvas element
  if (canvas && typeof canvas.toDataURL === 'function') {
    downLoad(canvas)
  } else {
    console.error('Canvas element not found or toDataURL is not a function')
    ElMessage.error('导出图片失败')
  }
}

function toggleSelectionMode() {
  const currentMode = props.graph.getCurrentMode()
  let newMode
  props.graph.clearNodesEdges()
  if (currentMode === 'multiSelectAnalysis') {
    newMode = 'singleSelectAnalysis'
    ElMessage({
      message: '已切换到单节点选择分析模式',
      type: 'success'
    })
  } else if (currentMode === 'singleSelectAnalysis') {
    newMode = 'Observation'
    ElMessage({
      message: '已切换到观察模式',
      type: 'success'
    })
  } else if (currentMode === 'Observation') {
    newMode = 'multiSelectAnalysis'
    ElMessage({
      message: '已切换到多节点选择分析模式',
      type: 'success'
    })
  }

  if (newMode) {
    props.graph.setMode(newMode)
  }
}

function setNewLayOut(
  newLayout: any,
  selectedNodes: [],
  read: Boolean = true,
  data?: { selectedNodesModel?: any; selectedEdgesModel?: any }
) {
  if (selectedNodes.length > 0) {
    props.graph.updateLayout(newLayout)
    read && data
      ? props.graph.read(data)
      : props.graph.changeData({ nodes: data!.selectedNodesModel, edges: data!.selectedEdgesModel })
  } else {
    ElMessage.warning('请选中至少一个节点来切换到环形布局')
    nextTick(() => {
      layoutType.value = previousSelected.value
    })
    return
  }
}
function handleLayoutChange() {
  if (!props.graph) {
    console.error('Graph not initialized')
    return
  }
  const { selectedEdgesModel, selectedNodeIds, startID, selectedNodes, selectedNodesModel } =
    useGraphNodesAndEdges(props.graph)
  
  switch (layoutType.value) {
    case 'force2':
      setNewLayOut(forceLayOut, selectedNodes)
      break
    case 'strictRadial':
      setNewLayOut(useStrictRadialLayOut(startID), selectedNodes)
      break
    case 'dagre':
      setNewLayOut(dagreLayOut, selectedNodes, false, { selectedNodesModel, selectedEdgesModel })
      break
    case 'circular':
      setNewLayOut(
        useCircleLayOut(Math.min(props.graph.getWidth(), props.graph.getHeight()) / 2 - 50),
        selectedNodes,
        false,
        { selectedNodesModel, selectedEdgesModel }
      )
      break
  }
  try {
    ElMessage({
      message: `布局已更改为 ${layoutType.value}`,
      type: 'success'
    })
  } catch (error) {
    console.error('Layout update failed:', error)
  }
}

function handleClick() {
  previousSelected.value = layoutType.value
}
onMounted(()=>{
  nextTick(()=>{
    select.value.$el.addEventListener('click', handleClick);
  })

})
onUnmounted(()=>{
  if(select.value){
    select.value.removeEventListener('click', handleClick);
  }
  
})
</script>

<template>
  <el-button-group class="pl-[20px] flex align-center grow">
    <el-button type="primary" @click="refreshData">
      刷新<i class="el-icon-refresh el-icon--right"></i>
    </el-button>
    <el-select
      v-model="layoutType"
      ref="select"
      placeholder="layoutType"
      @change="handleLayoutChange"
    >
      <el-option label="力导向布局" value="force2"></el-option>
      <el-option label="严格辐射布局" value="strictRadial"></el-option>
      <el-option label="自左向右的 Dagre 上对齐" value="dagre"></el-option>
      <el-option label="环形布局" value="circular"></el-option>
    </el-select>
    <el-button type="primary" @click="exportData">
      导出<i class="el-icon-download el-icon--right"></i>
    </el-button>
    <el-button type="primary" @click="toggleSelectionMode">
      模式<i class="el-icon-lightbulb el-icon--right"></i>
    </el-button>
  </el-button-group>
</template>

<style lang="scss" scoped>
.el-button-group {
  display: flex;
}
</style>
