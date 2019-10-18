import { CityNode } from './city-node';

class Graph {
  nodes: { [key: string]: CityNode } = {};

  addNode(node: CityNode) {
    const cityName = node.name;

    if (!this.nodes[cityName]) {
      this.nodes[cityName] = node;
    }
  }

  calculateRoute(node: CityNode): CityNode[] {
    const route: CityNode[] = [node];

    while (node.parent) {
      route.push(node.parent);
      node = node.parent;
    }

    return route;
  }

  getNode(cityName: string): CityNode {
    return this.nodes[cityName];
  }

  resetNodes() {
    Object.values(this.nodes).forEach(node => {
      node.isVisited = false;
      delete node.parent;
    });
  }

  getPathUsingBFS(city1: string, city2: string): CityNode[] | undefined {
    this.resetNodes();
    if (city1 === city2) {
      return [this.nodes[city1]];
    }

    const startingPoint = this.nodes[city1];
    const endingPoint = this.nodes[city2];

    if (!startingPoint || !endingPoint) {
      return;
    }

    const q: CityNode[] = [startingPoint];

    while (q.length) {
      const node: CityNode = q.shift() as CityNode;

      node.isVisited = true;

      for (let neighbor of node.neighbors) {
        if (neighbor.isVisited) {
          continue;
        }

        neighbor.parent = node;

        if (neighbor.name === city2) {
          return this.calculateRoute(neighbor);
        }

        q.push(neighbor);
      }
    }
  }

  depthFirstSearch(startingPoint: string) {
    this.resetNodes();
    const startingCity = this.nodes[startingPoint];

    if (!startingCity) {
      return 'Starting point does not exist';
    }

    const collection = [];
    const stack = [startingCity];

    while (stack.length) {
      const city: CityNode = stack.pop() as CityNode;

      if (city.isVisited) { continue; }

      collection.push(city);
      city.isVisited = true;

      for (let neighbor of city.neighbors) {
        stack.push(neighbor);
      }
    }

    return collection;
  }
}

export { Graph };