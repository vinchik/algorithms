import chalk from 'chalk';
import ukraineCities from './cities';
import { CityNode } from './city-node';
import { Graph } from './graph';

const graph = new Graph();

for (let city of ukraineCities) {
  const cityNode: CityNode = graph.getNode(city.name) || new CityNode(city.name);
  graph.addNode(cityNode);

  for (let neighborCity of city.neighbors) {
    const neighborCityNode: CityNode = graph.getNode(neighborCity) || new CityNode(neighborCity);

    cityNode.addNeighbor(neighborCityNode);
    neighborCityNode.addNeighbor(cityNode);

    graph.addNode(neighborCityNode);
  }
}

console.log(chalk.yellow('Breadth first search:'));
console.log(graph.getPathUsingBFS('Rivne', 'Luhansk'));
console.log(graph.getPathUsingBFS('Kyiv', 'Kryvyi Rih'));
console.log(graph.getPathUsingBFS('Kremenchuk', 'Poltava'));
console.log(chalk.blue('Depth first search:'));
console.log(graph.depthFirstSearch('Kremenchuk'));
console.log(graph.depthFirstSearch('Luhansk'));