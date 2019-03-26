function Node(val = null, prev = null, next = null) {
    this.v = val;
    this.p = prev;
    this.n = next;
}

class LinkedList {
    constructor(inp) {
        if (Array.isArray(inp)) {
            this.start = new Node(inp[0]);
            this.end = this.start;
            this.length = 1;
            for (let i = 1; i < inp.length; i++) this.add(inp[i]);
            return;
        } 

        if (inp === undefined) {
            this.start = null;
            this.end = null;
            this.length = 0;
            return;
        }

        this.start = new Node(inp);
        this.end = this.start;
        this.length = 1;
    }

    getIndex(index) {
        if (Math.abs(index) >= this.length) return null;
        const ind = index < 0 ? this.length - index : index;
        let ptr = null;
        if (ind > this.length / 2) {
            ptr = this.end;
            for (let i = this.length - 1; i > ind; i--) ptr = ptr.p;
            return ptr;
        }

        ptr = this.start;
        for (let i = 0; i < ind; i++) ptr = ptr.n;
        return ptr;
    }

    read(index) {
        const ptr = this.getIndex(index);
        if (ptr === null) return undefined;
        return ptr.v;
    }

    add(val, index) {
        if (this.start === null) {
            this.start = new Node(val);
            this.end = this.start;
            this.length = 1;
            return 0;
        }

        if (index === undefined) {
            const newNode = new Node(val, this.end);
            this.end.n = newNode;
            this.end = newNode;
            this.length += 1;
            return this.length - 1;
        }

        if (index === 0) {
            const newNode = new Node(val, null, this.start);
            this.start.p = newNode;
            this.start = newNode;
            this.length += 1;
            return 0;
        }

        const ptr = this.getIndex(index);
        const newNode = new Node(val, ptr.n, ptr);
        ptr.p.n = newNode;
        ptr.p = newNode;
        this.length += 1;
        return index;
    }

    remove(index) {
        if (this.length < 1) return -1;
        const ptr = this.getIndex(index);
        if (ptr === null) return -1;
        if (this.start === ptr) {
            this.start = ptr.n;
            this.start.p = null;
        }

        if (this.end === ptr) {
            this.end = ptr.p;
            this.end.n = null;
        }

        ptr.n.p = ptr.p;
        ptr.p.n = ptr.n;
        this.length -= 1;
        ptr.p = null;
        ptr.n = null;
        return ptr;
    }

    set(index, val) {
        const ptr = this.getIndex(index);
        if (ptr === null) return -1;
        ptr.v = val;
        return index;
    }

    find(val) {
        let ptr = this.start;
        let ind = 0;
        while(ptr != null) {
            if (ptr.v === val) return ind;
            ptr = ptr.n;
            ind += 1;
        }

        return -1;
    }
}

module.exports = LinkedList;
