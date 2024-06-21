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
dijkstra(start) {
    const vertices = Array.from(this.adjacencyList.keys());
    const distances = {};
    const previous = {};
    const visited = new Set();

    // Lo iniciamos como infinito y nulo respectivamente
    vertices.forEach(vertex => {
        distances[vertex] = Infinity;
        previous[vertex] = null;
    });

    // Al nodo con quien iniciamos lo marcamos.
    distances[start] = 0;

    while (visited.size < vertices.length) { //Mientras no hayamos visitado todos los vértices
        const currentVertex = this.findMinDistanceVertex(distances, visited);
        visited.add(currentVertex);// Marcamos el vértice actual como visitado

        const neighbors = this.adjacencyList.get(currentVertex) || new LinkedList();
        neighbors.forEach(({ node: neighbor, weight }) => {
            if (!visited.has(neighbor)) {
                const newDistance = distances[currentVertex] + weight;//calculamos el camino más corto, para despues corroborar si es estamos bien.
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = currentVertex;
                }
            }
        });
    }

    return { distances, previous };
}

findMinDistanceVertex(distances, visited) {//metodo para encontrar el vértice no visitado con la distancia mínima actual
    let minVertex = null;
    let minDistance = Infinity;

    Array.from(this.adjacencyList.keys()).forEach(vertex => {
        if (!visited.has(vertex) && distances[vertex] <= minDistance) {
            minVertex = vertex;
            minDistance = distances[vertex];
        }
    });

    return minVertex;
}
}