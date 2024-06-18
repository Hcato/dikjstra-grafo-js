import Node from "./Node.mjs";
class LinkedListNode {
    constructor(node, next = null) {
        this.node = node;
        this.next = next;
    }
}

export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // añadir un nuevo nodo al final de la lista
    push(value) {
        const newNode = new Node(value);
        const newLinkedListNode = new LinkedListNode(newNode);

        if (this.tail) {
            this.tail.next = newLinkedListNode;
        } else {
            this.head = newLinkedListNode;
        }

        this.tail = newLinkedListNode;
        this.size++;
    }

    //obtener el valor en una posición específica
    get(index) {
        if (index < 0 || index >= this.size) {
            throw new RangeError('Index out of bounds');
        }

        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        return current.node.value;
    }

    // comprobar si la lista está vacía
    isEmpty() {
        return this.size === 0;
    }

    // obtener el tamaño de la lista
    getSize() {
        return this.size;
    }

    // recorrer la lista y ejecutar una función en cada nodo
    forEach(callback) {
        let current = this.head;
        let index = 0;

        while (current) {
            callback(current.node.value, index);
            current = current.next;
            index++;
        }
    }

    // encontrar un valor en la lista
    find(value) {
        let current = this.head;

        while (current) {
            if (current.node.value === value) {
                return current;
            }
            current = current.next;
        }

        return null;
    }

    // convertir la lista en un array
    toArray() {
        const array = [];
        let current = this.head;

        while (current) {
            array.push(current.node.value);
            current = current.next;
        }

        return array;
    }
}
