import Graph from "../modules/Graph.mjs";

const graph = new Graph();

const addNode = () => {
    const nodeInput = document.getElementById('agregar nodo');
    const nodeName = nodeInput.value.trim();
    if (nodeName) {
        graph.addNode(nodeName);
        alert(`Nodo agregado: ${nodeName}`);
    } else {
        alert("Ingrese un nombre de nodo válido.");
    }
    nodeInput.value = '';
};

const addEdge = () => {
    const node1Input = document.getElementById('nodo1');
    const node2Input = document.getElementById('nodo2');
    const pesoInput = document.getElementById('peso');
    
    const node1 = node1Input.value.trim();
    const node2 = node2Input.value.trim();
    const weight = parseFloat(pesoInput.value);

    if (node1 && node2 && !isNaN(weight)) {
        graph.addEdge(node1, node2, weight);
        alert(`Arista agregada: ${node1} -(${weight})-> ${node2}`);
    } else {
        alert("Ingrese valores válidos para los nodos y el peso.");
    }

    node1Input.value = '';
    node2Input.value = '';
    pesoInput.value = '';
};

const depthFirstSearch = () => {
    const startNodeInput = document.getElementById('recorrido profundidad');
    const startNode = startNodeInput.value.trim();
    if (startNode) {
        const visitedNodes = graph.depthFirstSearch(startNode);
        alert("DFS: " + visitedNodes.join(', '));
    } else {
        alert("Ingrese un nodo de inicio válido.");
    }
    startNodeInput.value = '';
};

const breadthFirstSearch = () => {
    const startNodeInput = document.getElementById('recorrido anchura');
    const startNode = startNodeInput.value.trim();
    if (startNode) {
        const visitedNodes = graph.breadthFirstSearch(startNode);
        alert("BFS: " + visitedNodes.join(', '));
    } else {
        alert("Ingrese un nodo de inicio válido.");
    }
    startNodeInput.value = '';
};


const getShortestPath = () => {
    const startNodeInput = document.getElementById('dikjstra');
    const endNodeInput = document.getElementById('nodo-destino');
    const startNode = startNodeInput.value.trim();
    const endNode = endNodeInput.value.trim();
    
    if (startNode && endNode) {
        const { distances, previous } = graph.dijkstra(startNode);
        const path = reconstructPath(startNode, endNode, previous);
        const distance = distances[endNode];
        
        if (path) {
            alert(`Shortest path from ${startNode} to ${endNode}: ${path.join(" -> ")}, Distance: ${distance}`);
        } else {
            alert(`No path found from ${startNode} to ${endNode}`);
        }
    } else {
        alert("Ingrese nodos de inicio y final válidos.");
    }
    
    startNodeInput.value = '';
    endNodeInput.value = '';
};
const reconstructPath = (startNode, endNode, previous) => {
    const path = [];
    let currentNode = endNode;
    
    while (currentNode !== startNode && currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }
    
    if (currentNode === startNode) {
        path.unshift(startNode);
    } else {
        return null;
    }
    
    return path;
};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('agregar-nodo').addEventListener('click', addNode);
    document.getElementById('agregar-arista').addEventListener('click', addEdge);
    document.getElementById('profundidad').addEventListener('click', depthFirstSearch);
    document.getElementById('anchura').addEventListener('click', breadthFirstSearch);
    document.getElementById('ruta-mas-corta').addEventListener('click', getShortestPath);
});
