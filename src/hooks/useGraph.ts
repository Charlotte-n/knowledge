export function useGraph(graph:any){
    function handleSingleSelectAnalysis(node:any) {
      graph.setItemState(node, 'selected', true);
      const edges = graph.getEdges().filter((edge:any) => {
        return edge.getSource().getID() === node.getID() || edge.getTarget().getID() === node.getID();
      });
      edges.forEach((edge:any) => {
        if (edge.getSource().hasState('selected') && edge.getTarget().hasState('selected')) {
          graph.setItemState(edge, 'selected', true);
        }
      });
    }
    function handleMultiSelectAnalysis(node:any) {
      graph.setItemState(node, 'selected', true);
      const edges = graph.getEdges().filter((edge:any)=> {
        return edge.getSource().getID() === node.getID() || edge.getTarget().getID() === node.getID();
      });
      edges.forEach((edge:any)=> {
        graph.setItemState(edge, 'selected', true);
        const otherNode = edge.getSource().getID() === node.getID() ? edge.getTarget() : edge.getSource();
        graph.setItemState(otherNode, 'selected', true);
      });
    }
    function handleObservation(node:any) {
      graph.setItemState(node, 'selected', true);
    }


  //选择节点
  //取消节点
  function deselectNode(nodeId:string) {
    graph.setItemState(nodeId, 'selected', false);
   };
  function selectNode(nodeId:string){
      const currentMode = graph.getCurrentMode();
      const node = graph.findById(nodeId);
        if (currentMode === 'singleSelectAnalysis') {
          handleSingleSelectAnalysis(node);
        } else if (currentMode === 'multiSelectAnalysis') {
          handleMultiSelectAnalysis(node);
        } else if (currentMode === 'Observation') {
          handleObservation(node);
        }
        graph.setItemState(nodeId, 'selected', true);
   }

  //选择边
  function selectEdge(edgeId:string){
        graph.setItemState(edgeId, 'selected', true);
  };
  //取消边
  function deselectEdge(edgeId:string) {
        graph.setItemState(edgeId, 'selected', false);
  };
  //取消所有节点区域
  function clearAllNodeSelections () {
        graph.getNodes().forEach((node:any) => {
          graph.setItemState(node, 'selected', false);
        });
  };
  //取消所有边区域
  function clearAllEdgeSelections () {
       graph.getEdges().forEach((edge:any)=> {
          graph.setItemState(edge, 'selected', false);
        });
  };
  //取消选中的所有区域
  function clearAllSelections()  {
        graph.getNodes().forEach((node:any) => {
          graph.setItemState(node, 'selected', false);
        });
        graph.getEdges().forEach((edge:any) => {
          graph.setItemState(edge, 'selected', false);
        });
};

return {
    deselectNode,
    selectNode,
    selectEdge,
    deselectEdge,
    clearAllNodeSelections,
    clearAllEdgeSelections,
    clearAllSelections
}

}