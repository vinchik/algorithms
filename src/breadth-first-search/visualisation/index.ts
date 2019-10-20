import chalk from 'chalk';
import ukraineCities from '../cities';
import { CityNode } from '../city-node';
import { Graph } from '../graph';

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

const colors = ['greenyellow', 'aqua', 'goldenrod', 'palevioletred', 'darkorchid', 'rosybrown'];

const delay = (ms) => {
  return new Promise(res => setTimeout(res, ms));
} 

const startBFS = async () => {
  const fromValue: string = (<HTMLInputElement>document.getElementById('from')).value;
  const toValue: string = (<HTMLInputElement>document.getElementById('to')).value;

  let currentColorIndex = 0;

  if (!graph.nodes[fromValue]) {
    alert(`${fromValue} doesn't exist in a graph`);
    return;
  }

  if (!graph.nodes[toValue]) {
    alert(`${toValue} doesn't exist in a graph`);
    return;
  }

  const result = graph.getPathUsingBFS(fromValue, toValue);
  console.log(result);

  const fromDiv: HTMLDivElement = document.querySelector(`#${fromValue.toLowerCase().split(' ').join('_')}`);
  const toDiv: HTMLDivElement = document.querySelector(`#${toValue.toLowerCase().split(' ').join('_')}`);

  [fromDiv, toDiv].forEach(node => node.style.backgroundColor = colors[currentColorIndex]);

  for (let i = result.length - 1; i > 0; i--) {
    currentColorIndex++;
    const currentNode = result[i];
    const nodeNeighbors = currentNode.neighbors;
    const currentNodeDiv: HTMLDivElement = document.querySelector(`#${currentNode.name.toLowerCase().split(' ').join('_')}`);

    currentNodeDiv.classList.add('highlighted');
    
    for (let neighbor of nodeNeighbors) {
      console.log(neighbor.name);
      if (neighbor.name === toValue) {
        toDiv.style.backgroundColor = colors[currentColorIndex];
        toDiv.classList.add('highlighted');
        return;
      }

      const div: HTMLDivElement = document.querySelector(`#${neighbor.name.toLowerCase().split(' ').join('_')}`);

      if (!div.style.backgroundColor) {
        await delay(1000);
        div.style.backgroundColor = colors[currentColorIndex];
      }
    }
  }
}

const resetFn = () => {
  const allCities = Object.values(graph.nodes);
  allCities.forEach((city: CityNode) => {
    const div: HTMLDivElement = document.querySelector(`#${city.name.toLowerCase().split(' ').join('_')}`);
    div.style.backgroundColor = '';
    div.classList.remove('highlighted');
  });
}


const breadthSearch: HTMLButtonElement = <HTMLButtonElement>document.getElementById('breadth-first');
const resetBtn: HTMLButtonElement = <HTMLButtonElement>document.getElementById('reset');
const start = document.getElementById('from');
const depthSearch = document.getElementById('depth-first');

breadthSearch.addEventListener('click', startBFS);
resetBtn.addEventListener('click', resetFn);