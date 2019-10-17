const ukraineTowns = [
  {
    name: 'Kyiv',
    neighbors: [
      'Chernihiv',
      'Zhytomyr',
      'Poltava'
    ]
  },
  {
    name: 'Zhytomyr',
    neighbors: [
      'Rivne',
      'Vinnytsia',
      'Kyiv'
    ]
  },
  {
    name: 'Poltava',
    neighbors: [
      'Kharkiv',
      'Kremenchuk',
      'Kyiv'
    ]
  },
  {
    name: 'Kremenchuk',
    neighbors: [
      'Poltava',
      'Kropyvnytskyi',
      'Dnipro'
    ]
  },
  {
    name: 'Kropyvnytskyi',
    neighbors: [
      'Vinnytsia',
      'Kremenchuk'
    ]
  },
  {
    name: 'Vinnytsia',
    neighbors: [
      'Zhytomyr',
      'Kropyvnytskyi'
    ]
  },
  {
    name: 'Dnipro',
    neighbors: [
      'Kharkiv',
      'Kryvyi Rih',
      'Kremenchuk'
    ]
  },
  {
    name: 'Kharkiv',
    neighbors: [
      'Dnipro',
      'Poltava',
      'Luhansk'
    ]
  }
];

class Graph {
  nodes: { [key: string]: CityNode } = {};

  addNode(node: CityNode) {
    const cityName = node.name;

    if (!this.nodes[cityName]) {
      this.nodes[cityName] = node;
    }
  }

  calculateRoute(node: CityNode) {
    let route: string = node.name;

    while (node.parent) {
      route += ` => ${node.parent.name}`;
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

  getPath(city1: string, city2: string): string | undefined {
    this.resetNodes();
    if (city1 === city2) {
      return city1;
    }

    const startingPoint = this.nodes[city1];
    const endingPoint = this.nodes[city2];

    if (!startingPoint || !endingPoint) {
      return 'Error: starting of ending point does not exist';
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
}

class CityNode {
  name: string;
  isVisited: boolean = false;
  parent: CityNode | undefined;
  neighbors: CityNode[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addNeighbor(neighbor: CityNode) {
    const existentNeighbor = this.neighbors.find(n => n.name === neighbor.name);

    if (!existentNeighbor) {
      this.neighbors.push(neighbor);
    }
  }
}

const graph = new Graph();

for (let city of ukraineTowns) {
  const cityNode: CityNode = graph.getNode(city.name) || new CityNode(city.name);
  graph.addNode(cityNode);

  for (let neighborCity of city.neighbors) {
    const neighborCityNode: CityNode = graph.getNode(neighborCity) || new CityNode(neighborCity);

    cityNode.addNeighbor(neighborCityNode);
    neighborCityNode.addNeighbor(cityNode);

    graph.addNode(neighborCityNode);
  }
}

console.log(graph.getPath('Rivne', 'Luhansk'));
console.log(graph.getPath('Kyiv', 'Kryvyi Rih'));
console.log(graph.getPath('Kremenchuk', 'Poltava'));
