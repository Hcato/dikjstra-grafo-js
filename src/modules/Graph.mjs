import LinkedList from "./Linkedlist.mjs";

export default class Graph {
    constructor() {//inicializamos el map
        this.adjacencyList = new Map();
    }

    
    addNode(node) { //validamos y agregamos nodos al mapa y le damos el valor de una lista vacia
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, new LinkedList());
        }
    }

    
    addEdge(startNode, endNode, weight = 0) {//validamos y pusheamos al nodo que se va a conectar, la conexion(nodo) y el peso
        if (!this.adjacencyList.has(startNode)) {
            this.addNode(startNode);
        }
        if (!this.adjacencyList.has(endNode)) {
            this.addNode(endNode);
        }
        this.adjacencyList.get(startNode).push({ node: endNode, weight });
    }

   
depthFirstSearch(startNode, visited = new Set()) { //validamos si existe la cabecera, la añadimos a la lista de visitados, luego se manda a llamar a los vecinos por el map, para despues iterarlos por vecino y si uno no se encuentra aplicamos recursividad.
    if (!this.adjacencyList.has(startNode)) return [];

    visited.add(startNode);
    const result = [startNode];

    const neighbors = this.adjacencyList.get(startNode);
    neighbors.forEach(({ node }) => {
        if (!visited.has(node)) {
            result.push(...this.depthFirstSearch(node, visited));
        }
    });

    return result;
}


breadthFirstSearch(startNode) { //validamos si existe el nodo inicial, si es asi creamos un arreglo que sera nuestra cola y marcamos como visitado al nodo inicial,
    if (!this.adjacencyList.has(startNode)) return [];

    const visited = new Set();
    const queue = [startNode];
    visited.add(startNode);
    const result = [startNode];

    while (queue.length > 0) {//mientras haya nodos en la cola podra llamar a sus vecinos e irlos guardando actualizando la cola, añadiendose a resultados e marcandolos como visitados.
        const currentNode = queue.shift();
        const neighbors = this.adjacencyList.get(currentNode);
        
        neighbors.forEach(({ node }) => {
            if (!visited.has(node)) {
                visited.add(node);
                queue.push(node);
                result.push(node);
            }
        });
    }

    return result;
}

dijkstra(startNode) {
    const nodes = Array.from(this.adjacencyList.keys());
    const numNodes = nodes.length;

    const distances = new Array(numNodes).fill(Infinity);
    const previousNodes = new Array(numNodes).fill(null);
    const pq = new Array(numNodes).fill(Infinity);

    const startIndex = nodes.indexOf(startNode);
    distances[startIndex] = 0;
    pq[startIndex] = 0;

    while (pq.some(dist => dist !== Infinity)) {
        let minIndex = -1;
        for (let i = 0; i < numNodes; i++) {
            if (pq[i] !== Infinity && (minIndex === -1 || pq[i] < pq[minIndex])) {
                minIndex = i;
            }
        }

        const currentNode = nodes[minIndex];
        pq[minIndex] = Infinity;

        const currentDistance = distances[minIndex];
        const neighbors = this.adjacencyList.get(currentNode);

        neighbors.forEach(({ node, weight }) => {
            const neighborIndex = nodes.indexOf(node);
            const distance = currentDistance + weight;

            if (distance < distances[neighborIndex]) {
                distances[neighborIndex] = distance;
                previousNodes[neighborIndex] = currentNode;
                pq[neighborIndex] = distance;
            }
        });
    }

    return { distances, previousNodes };
}

getShortestPath(startNode, endNode) {
    const { distances, previousNodes } = this.dijkstra(startNode);
    const nodes = Array.from(this.adjacencyList.keys());
    const startIndex = nodes.indexOf(startNode);
    const endIndex = nodes.indexOf(endNode);

    const path = [];
    let currentNode = endNode;

    while (currentNode) {
        path.unshift(currentNode);
        const currentIndex = nodes.indexOf(currentNode);
        currentNode = previousNodes[currentIndex];
    }

    if (distances[endIndex] === Infinity) {
        return { path: null, distance: Infinity };
    }

    return { path, distance: distances[endIndex] };
}
}