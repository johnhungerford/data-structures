function Node(val, next) {
    this.v = val === undefined ? null : val;
    this.n = next instanceof Node ? next : null;
}

class Stack {
    constructor(val) {
        this.top = val === undefined ? null : new Node(val);
        this.len = this.out === null ? 0 : 1;
    }

    push(val) {
        if (this.top === null) {
            this.top = new Node(val);
            this.len = 1;
            return;
        } 

        this.top = new Node(val, this.top);
        this.len += 1;
    }

    pop() {
        if (this.top === null) return undefined;
        const popped = this.top;
        this.top = popped.n;
        this.len -= 1;
        return popped.v;
    }

    read(ind) { 
        if (ind === undefined) return this.top.v; 
        if (ind >= this.len) return undefined;
        let ptr = this.top;
        for (let i = 0; i < ind; i++) ptr = ptr.n;
        return ptr.v;
    }
}
