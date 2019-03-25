function Node(val, next) {
    this.v = val === undefined ? null : val;
    this.n = next instanceof Node ? next : null;
}

class Queue {
    constructor(val) {
        this.out = val === undefined ? null : new Node(val);
        this.in = this.out;
        this.len = this.out === null ? 0 : 1;
    }

    push(val) {
        if (this.out === null) {
            this.out = new Node(val);
            this.in = this.out;
            this.len = 1;
            return;
        } 

        if (this.in === null) this.in = this.out;
        this.in.n = new Node(val);
        this.in = this.in.n;
        this.len += 1;
    }

    pop() {
        if (this.out === null) return undefined;
        const popped = this.out;
        this.out = this.out.n;
        this.len -= 1;
        if (this.len === 0) this.in = null;
        return popped.v;
    }

    read(ind) { 
        if (ind === undefined) return this.out.v; 
        if (ind >= this.len) return null;
        let ptr = this.out;
        for (let i = 0; i < ind; i++) ptr = ptr.n;
        return ptr.v;
    }

    readLast() { return this.in.v; }
}
