const defaultOptions = {
  id: 'default',
  label: 'ALL',
  value: 'ALL'
}

const forceLayOut = {
  type: 'force2',
  preventOverlap: true,
  nodeSize: 30,
  linkDistance: 200,
  nodeStrength: 1000,
  edgeStrength: 100,
  gravity: 10,
  leafCluster: true,
  clusterNodeStrength: 10
}

function useStrictRadialLayOut(startID: number | string) {
  return {
    type: 'radial',
    focusNode: startID,
    linkDistance: 50,
    unitRadius: 200,
    preventOverlap: true,
    nodeSize: 150,
    strictRadial: true,
    sortBy: 'label'
  }
}

const dagreLayOut = {
  type: 'dagre',
  rankdir: 'LR',
  align: 'UL',
  controlPoints: true
}

function useCircleLayOut(value: number) {
  return {
    type: 'circular',
    radius: value,
    startAngle: 0,
    endAngle: 2 * Math.PI
  }
}

export { defaultOptions, forceLayOut, useStrictRadialLayOut, dagreLayOut, useCircleLayOut }
