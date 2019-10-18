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

  export { CityNode };