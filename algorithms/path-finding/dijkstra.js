class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  Dijkstra(start, finish) {
    const distances = {};
    const previous = {};
    const visited = [];
    let unvisited = [];
    Object.keys(this.adjacencyList).forEach((vertex) => {
      unvisited.push(vertex);
      previous[vertex] = null;
      if (vertex === start) {
        distances[vertex] = 0;
      } else {
        distances[vertex] = Number.MAX_VALUE;
      }
    });

    while (unvisited.length !== 0) {
      // get smallest from unvisited
      const soredUnvisited = Object.keys(distances)
        .filter((key) => unvisited.includes(key))
        .sort((a, b) => distances[a] - distances[b]);
      const selectedNode = soredUnvisited[0];
      const neighbors = this.adjacencyList[selectedNode];
      neighbors.forEach((n) => {
        const newDistance = distances[selectedNode] + n.weight;
        if (newDistance < distances[n.node]) {
          distances[n.node] = newDistance;
          previous[n.node] = selectedNode;
        }
      });

      visited.push(selectedNode);
      unvisited = unvisited.filter((node) => node !== selectedNode);
    }
    const distanceToFinish = distances[finish];
    const path = [];
    let temp = finish;
    while (distances[temp]) {
      path.push(previous[temp]);
      temp = previous[temp];
    }
    const finalPath = [finish, ...path].reverse();
    return {
      distance: distanceToFinish,
      path: finalPath,
    };
  }
}

//EXAMPLES=====================================================================

var graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B", 2);
graph.addEdge("B", "C", 1);
graph.addEdge("B", "D", 3);
graph.addEdge("D", "E", 4);
graph.addEdge("C", "E", 3);

console.log(graph.Dijkstra("B", "E"));
