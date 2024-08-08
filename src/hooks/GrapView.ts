import G6 from '@antv/g6/lib/index'

function useGrapView(width: number, height: number) {
  return {
    container: 'MathGraph',
    width,
    height,
    layout: {
      type: 'force2',
      preventOverlap: true,
      nodeSize: 30,
      linkDistance: 200,
      nodeStrength: 1000,
      edgeStrength: 100,
      gravity: 10,
      leafCluster: true,
      clusterNodeStrength: 10
    },
    modes: {
      Observation: ['drag-canvas', 'scroll-canvas', 'zoom-canvas', 'drag-node', 'resize-canvas'],
      singleSelectAnalysis: [
        'drag-canvas',
        'scroll-canvas',
        'zoom-canvas',
        'drag-node',
        'resize-canvas'
      ],
      multiSelectAnalysis: ['drag-canvas', 'zoom-canvas', 'drag-node', 'resize-canvas']
    },
    defaultNode: {
      type: 'Circle', // 节点的形状类型，这里设置为圆形
      size: [60], // 节点的大小，设置为直径为 60 的圆形
      style: {
        fill: '#DEE9FF', // 节点的填充颜色，默认填充浅蓝色
        stroke: '#ACC6FF', // 节点的边框颜色，默认边框为浅蓝色
        lineWidth: 2, // 节点的边框宽度，默认边框宽度为 2
        zIndex: 1
      },
      stateStyles: {
        selected: {
          // 节点选中状态下的样式
          fill: '#f64f47', // 填充颜色为红色
          stroke: '#f64f47', // 边框颜色为红色
          lineWidth: 4, // 边框宽度增加到 3
          shadowColor: '#f64f47', // 添加红色阴影
          shadowBlur: 10, // 阴影模糊半径为 10
          zIndex: 10 // 选中状态下提升 zIndex，以确保节点显示在其他元素之上
        },
        inactive: {
          // 节点非活动状态下的样式
          opacity: 0.5 // 设置节点透明度为 0.2，使其看起来更淡
        },
        active: {
          // 节点活动状态下的样式
          fill: '#e2e244', // 填充颜色为黄色
          stroke: '#e8e84e', // 边框颜色为黄色
          lineWidth: 3, // 边框宽度增加到 3
          shadowColor: '#f4f45d', // 添加黄色阴影
          shadowBlur: 10, // 阴影模糊半径为 10
          zIndex: 5 // 活动状态下提升 zIndex，以确保节点显示在其他元素之上
        }
      },
      labelCfg: {
        style: {
          fontSize: 14
        }
      }
    },
    defaultEdge: {
      type: 'line',
      style: {
        stroke: '#727070',
        lineWidth: 1,
        endArrow: true,
        zIndex: 1,
        labelCfg: {
          autoRotate: true,
          style: {
            stroke: '#fff',
            lineWidth: 5
          }
        }
      },
      stateStyles: {
        selected: {
          stroke: '#f00',
          lineWidth: 2,
          zIndex: 10 // 高亮时提升 zIndex
        },
        inactive: {
          opacity: 0.2
        },
        active: {
          stroke: 'rgba(243,208,83,0.78)',
          lineWidth: 1,
          zIndex: 5 // 选中时进一步提升 zIndex
        }
      },
      labelCfg: {
        position: 'center',
        refY: 0
      }
    },
    plugins: [
      new G6.ToolBar({
        className: 'tool-bar'
      }) // 加入ToolBar插件
    ]
  }
}

function useGrapMenu() {
  return {
    offsetX: -320, // 调整偏移以精确定位菜单
    offsetY: -80, // 调整偏移以精确定位菜单
    getContent(evt: any) {
      if (evt.item) {
        if (evt.item.getType() === 'node') {
          return `<ul>
                <li onclick="window.selectNode('${evt.item.getID()}')">选中节点</li>
                <li onclick="window.deselectNode('${evt.item.getID()}')">取消选中节点</li>
                <li onclick="window.clearAllNodeSelections()">取消全部节点</li>
              </ul>`
        } else if (evt.item.getType() === 'edge') {
          return `<ul>
                <li onclick="window.selectEdge('${evt.item.getID()}')">选中边</li>
                <li onclick="window.deselectEdge('${evt.item.getID()}')">取消选中边</li>
                <li onclick="window.clearAllEdgeSelections()">取消全部边</li>
              </ul>`
        }
      } else {
        return `<ul>
              <li onclick="window.clearAllSelections()">清除所有选中</li>
            </ul>`
      }
    },
    handleMenuClick(target: any, item: any) {
      console.log(target, item)
    },
    onShow(evt: any) {
      const menu: any = document.querySelector('.g6-component-contextmenu')
      const { clientX, clientY } = evt
      const { innerWidth, innerHeight } = window

      // 调整菜单位置以确保菜单不会超出视口
      if (menu) {
        const menuWidth = menu.offsetWidth
        const menuHeight = menu.offsetHeight
        let adjustedX = clientX
        let adjustedY = clientY
        if (clientX + menuWidth > innerWidth) {
          adjustedX = innerWidth - menuWidth
        }
        if (clientY + menuHeight > innerHeight) {
          adjustedY = innerHeight - menuHeight
        }

        menu.style.left = `${adjustedX}px`
        menu.style.top = `${adjustedY}px`
      }
    }
  }
}

function useGraphNodesAndEdges(graph: any) {
  const selectedNodes = graph.getNodes().filter((node: any) => node.hasState('selected'))
  // const selectedEdges = this.graph.getEdges().filter(edge => {edge.hasState('selected')})
  const selectedNodeIds = selectedNodes
    .map((node: any) => (node.getID ? node.getID() : node.id))
    .filter((id: any) => id !== null)
  const startID = selectedNodeIds[0]
  const selectedNodesModel = graph
    .getNodes()
    .filter((node: any) => node.hasState('selected'))
    .map((node: any) => node.getModel())
  const selectedEdgesModel = graph
    .getEdges()
    .filter((edge: any) => edge.hasState('selected'))
    .map((edge: any) => edge.getModel())
  return {
    selectedNodes,
    selectedNodeIds,
    selectedNodesModel,
    startID,
    selectedEdgesModel
  }
}



export { useGrapView, useGrapMenu, useGraphNodesAndEdges }
