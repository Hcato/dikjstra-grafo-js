class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }
    getNext(){
        return this.next;
    }
    setNext(next){
        this.next = next;
    }
}

export default Node;

