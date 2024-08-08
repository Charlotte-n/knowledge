<script lang="ts" setup>
import { onMounted, nextTick, ref } from 'vue'
import data from '@/data/analyze.js'
import G6Operation from '@/utils/g6Operation'
import {useGraph} from '@/hooks/useGraph'

const props = defineProps({
  width: {
    type: Number,
    required: true
  }
})

const graph = ref<any>()

function initGraph() {
  const graph: any = new G6Operation(props.width, 650)
  data.nodes.forEach((node: { id: number; name: string; label: string }) => {
    node.label = node.name
  })
  graph.setData(data)
  graph.render()
  graph.value = graph
  graph.addMenuPlugin()
  //选中
  graph.selectedEdgeAndNode()
  //取消节点
  graph.clearAndCancel()
  console.log(graph);

  const {selectEdge,selectNode,deselectEdge,deselectNode,clearAllEdgeSelections,clearAllSelections,clearAllNodeSelections} = useGraph(graph)
  
  window.selectNode = selectNode
  window.selectEdge = selectEdge
  window.deselectNode = deselectNode
  window.deselectEdge = deselectEdge
  window.clearAllSelections = clearAllSelections
  window.clearAllEdgeSelections = clearAllEdgeSelections
  window.clearAllNodeSelections = clearAllNodeSelections
}




onMounted(() => {
  nextTick(() => {
    initGraph()
  })
})
defineExpose({
  graph: graph
})
</script>

<template>
  <div id="MathGraph"></div>
</template>

<style lang="scss" scoped>
#MathGraph {
  position: relative;
}
::v-global(.tool-bar) {
  position: absolute;
  left: -20x;
  top: 0;
}
</style>
