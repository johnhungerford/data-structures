class BinarySearchNode {
    constructor(v, p, cmp) {
        this.v = v === undefined ? null : v;
        this.p = p instanceof BinarySearchNode ? p : null;
        this.cmp = cmp instanceof Function ? cmp : (a, b) => { return a > b ? 1 : a < b ? -1 : 0; };
        this.l = null;
        this.r = null;
    }

    // Insertion relative to this (i.e., ignores parents)
    add(v) {
        let ptr = this;
        while (true) {
            if (this.cmp(v, ptr.v) === 0) {
                return ptr;
            }

            if (this.cmp(v, ptr.v) === -1) {
                if (ptr.l !== null) {
                    ptr = ptr.l;
                    continue;
                }


                ptr.l = new BinarySearchNode(v, ptr);
                return ptr.l;
            }

            if (this.cmp(v, ptr.v) === 1) {
                if (ptr.r !== null) {
                    ptr = ptr.r;
                    continue;
                }

                ptr.r = new BinarySearchNode(v, ptr);
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

        while (ptr !== null && this.cmp(ptr.v, this.v) !== 1) ptr = ptr.p;
        return ptr;
    }

    getPrev() {
        let ptr = this;
        if (ptr.l !== null) {
            ptr = ptr.l;
            while (ptr.r !== null) ptr = ptr.r;
            return ptr;
        }

        while (ptr !== null && this.cmp(ptr.v, this.v) !== -1) ptr = ptr.p;
        return ptr;
    }

    // Finds v relative to {this} (i.e., ignores parents)
    find(v) {
        let ptr = this;
        while (ptr !== null) {
            if (this.cmp(v, ptr.v) === 0) return ptr;
            if (this.cmp(v, ptr.v) === 1) ptr = ptr.r;
            if (this.cmp(v, ptr.v) === -1) ptr = ptr.l;
        }
        return ptr;
    }
}

class BinarySearchTree {
    constructor(v, cmp) {
        if (cmp instanceof Function) {
            this.root = new BinarySearchNode(v, cmp);
        } else if (v !== undefined) {
            this.root = new BinarySearchNode(v, null);
        } else {
            this.root = null;
        }
    }

    add(v) {
        if (this.root === null) {
            root = new BinarySearchNode(v, null);
            return root;
        }

        return this.root.add(v);
    }

    find(v) {
        return this.root === null ? null : this.root.find(v);
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
            out.push(ptr.v);
            ptr = ptr.getNext();
        }

        return out;
    }
}
