import G6 from '@antv/g6/lib/index'
import { useGrapMenu, useGrapView } from '@/hooks/GrapView'
class G6Operation {
  graph: any
  constructor(width: number, height: number) {
    //初始化了graph
    this.graph = new G6.Graph(useGrapView(width, height))
  }

  processParallelEdges() {
    const edges = this.graph.getEdges().map((edge: any) => edge.getModal())
    G6.Util.processParallelEdges(edges)
    this.graph.refresh()
  }
  clearData() {
    try {
      this.graph.clear()
    } catch (e) {
      console.error('删除失败')
    }
  }
  getCurrentMode(){
   return this.graph.getCurrentMode()
  }

  addMenuPlugin() {
    this.graph.addPlugin(new G6.Menu(useGrapMenu() as any))
  }
  clearAndCancel(){
    //空白处点击，清除、取消
    const that  = this
      this.graph.on('canvas:click', () => {
        const menu = document.getElementById('contextMenu');
        if (menu) {
          menu.style.display = 'none';
        }
        const nodes1 = that.graph.getNodes();
        nodes1.forEach(node => {
          that.graph.setItemState(node, 'inactive', false);
          that.graph.setItemState(node, 'active', false);
        });
        const edges1 = that.graph.getEdges();
        edges1.forEach(edges => {
          that.graph.setItemState(edges, 'inactive', false);
          that.graph.setItemState(edges, 'active', false);
        });
      });
  }
  // 获取选中的节点和边
  selectedEdgeAndNode(){
    const that  = this
     // 注册节点上的鼠标点击事件
      this.graph.on('node:click', (evt:any) => {
        const nodeItem = evt.item; // 获取鼠标点击的节点实例
        // 将此节点与此节点相连的边和节点设置为活跃状态
        if(!nodeItem.hasState('selected')){
          that.graph.setItemState(nodeItem, 'active', true);
          that.graph.setItemState(nodeItem, 'inactive', false);
        }
        const edges = that.graph.getEdges().filter((edge:any)=> {
          return edge.getSource().getID() === nodeItem.getID() || edge.getTarget().getID() === nodeItem.getID();
        });
        edges.forEach((edge:any)=> {
          if(edge.hasState('selected')){
            that.graph.setItemState(edge, 'active', true);
            that.graph.setItemState(edge, 'inactive', false);
          }

          const otherNode = edge.getSource().getID() === nodeItem.getID() ? edge.getTarget() : edge.getSource();
          if(!otherNode.hasState('selected')){
            that.graph.setItemState(otherNode, 'active', true);
            that.graph.setItemState(otherNode, 'inactive', false);
          }

        });

        // 将其他没有被选中的节点设置为不活跃状态
        const nodes = that.graph.getNodes();
        nodes.forEach(node => {
          if (node !== nodeItem && !node.hasState('selected') && !node.hasState('active')) {
            this.graph.setItemState(node, 'inactive', true);
          }
        });

      });
  }

  findById(id: string) {
    return this.graph.findById(id)
  }
  setItemState(item: any, state: string, value: boolean) {
    this.graph.setItemState(item, state, value)
  }


  setData(data: any) {
    this.setMode('Observation')
    this.graph.data(data)
  }

  render() {
    this.graph.render()
  }

  print() {
    this.graph.print()
  }
  updateLayout(newLayout: string) {
    this.graph.updateLayout(newLayout)
  }
  changeData(data: any) {
    this.graph.changeData(data)
  }

  getNodes() {
    return this.graph.getNodes()
  }

  getEdges() {
    return this.graph.getEdges()
  }

  getWidth() {
    return this.graph.getWidth()
  }

  getHeight() {
    return this.graph.getHeight()
  }

  paint() {
    this.graph.paint()
  }

  getCanvas() {
    return this.graph.get('canvas').get('el')
  }

  setMode(mode: string) {
    this.graph.setMode(mode)
  }

  clearItemStates() {
    this.graph.clearItemStates()
  }
  clearNodesEdges() {
    // 切换模式前，清空所有节点和边的选中状态
    this.graph.getNodes().forEach((node: any) => {
      this.graph.clearItemStates(node)
    })
    this.graph.getEdges().forEach((edge: any) => {
      this.graph.clearItemStates(edge)
    })
  }
}

export default G6Operation
