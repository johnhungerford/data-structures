class BinarySearchNode {
    constructor(k, v, p, cmp) {
        this.k = k === undefined ? null : k;
        this.v = v === undefined ? null : [v];
        this.p = p instanceof BinarySearchNode ? p : null;
        this.cmp = cmp instanceof Function ? cmp : (a, b) => { return a > b ? 1 : a < b ? -1 : 0; };
        this.l = null;
        this.r = null;
    }

    // Insertion relative to this (i.e., ignores parents)
    add(k, v) {
        let ptr = this;
        while (true) {
            if (this.cmp(k, ptr.k) === 0) {
                ptr.v.push(v);
                return ptr;
            }

            if (this.cmp(k, ptr.k) === -1) {
                if (ptr.l !== null) {
                    ptr = ptr.l;
                    continue;
                }


                ptr.l = new BinarySearchNode(k, v, ptr);
                return ptr.l;
            }

            if (this.cmp(k, ptr.k) === 1) {
                if (ptr.r !== null) {
                    ptr = ptr.r;
                    continue;
                }

                ptr.r = new BinarySearchNode(k, v, ptr);
                return ptr.r;
            }
        }
    }

    getNext() {
        let ptr = this;
        if (ptr.r !== null) {
            ptr = ptr.r;
            while (ptr.l !== null) ptr = ptr.l;
            return ptr;
        }

        while (ptr !== null && this.cmp(ptr.k, this.k) !== 1) ptr = ptr.p;
        return ptr;
    }

    getPrev() {
        let ptr = this;
        if (ptr.l !== null) {
            ptr = ptr.l;
            while (ptr.r !== null) ptr = ptr.r;
            return ptr;
        }

        while (ptr !== null && this.cmp(ptr.k, this.k) !== -1) ptr = ptr.p;
        return ptr;
    }

    // Finds k relative to {this} (i.e., ignores parents)
    find(k) {
        let ptr = this;
        while (ptr !== null) {
            if (this.cmp(k, ptr.k) === 0) return ptr;
            if (this.cmp(k, ptr.k) === 1) ptr = ptr.r;
            if (this.cmp(k, ptr.k) === -1) ptr = ptr.l;
        }
        return ptr;
    }
}

class BinarySearchTree {
    constructor(k, v, cmp) {
        this.map = {};
        if (cmp instanceof Function) {
            this.root = new BinarySearchNode(k, v, cmp);
            this.map[root.k] = root;
        } else if (v !== undefined) {
            this.root = new BinarySearchNode(k, v, null);
            this.map[root.k] = root;
        } else if (k !== undefined) {
            this.root = new BinarySearchNode(k, null, null);
            this.map[root.k] = root;
        } else {
            this.root = null;
        }
    }

    add(k, v) {
        if (this.root === null) {
            root = new BinarySearchNode(k, v, null);
            this.map[root.k] = root;
            return root;
        }

        let ptr = this.root.add(k, v);
        if (!this.map.hasOwnProperty(k)) this.map[k] = ptr;
        return ptr;
    }

    find(k) {
        return this.root === null ? null : this.root.find(k);
    }

    first() {
        if (this.root === null) return null;
        let ptr = this.root;
        while (ptr.l !== null) ptr = ptr.l;
        return ptr;
    }

    last() {
        if (this.root === null) return null;
        let ptr = this.root;
        while (ptr.r !== null) ptr = ptr.r;
        return ptr;
    }

    index(i) {
        let ptr = this.first();
        if (ptr === null) return null;
        let ctr = 0;
        while (ptr !== null) {
            if (ctr === i) return ptr;
            ptr = ptr.getNext();
            ctr += 1;
        }

        return null;
    }

    array() {
        let ptr = this.index(0);
        const out = [];
        while (ptr != null) {
            out.push(ptr.k);
            ptr = ptr.getNext();
        }

        return out;
    }
}
