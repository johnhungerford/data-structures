class RedBlackNode {
    constructor(k, v, red, p, cmp) {
        this.k = k === undefined ? null : k;
        this.v = v === undefined ? null : [v];
        this.red = (red === true || red === false) ? red : null;
        this.p = p instanceof RedBlackNode ? p : null;
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


                ptr.l = new RedBlackNode(k, v, true, ptr);
                ptr = ptr.l;
                ptr.balance();
                return ptr;
            }

            if (this.cmp(k, ptr.k) === 1) {
                if (ptr.r !== null) {
                    ptr = ptr.r;
                    continue;
                }

                ptr.r = new RedBlackNode(k, v, true, ptr);
                ptr = ptr.r;
                ptr.balance();
                return ptr;
            }
        }
    }

    balance() {
        let ptr = this;
        while (ptr.p !== null) {
            if (!ptr.red || !ptr.p.red) break;

            if (ptr.p.p === null) {
                ptr.p.red = false;
                break;
            }

            if ((ptr.p.p.l === ptr.p && (ptr.p.p.r === null || !ptr.p.p.r.red)) || (ptr.p.p.r === ptr.p && (ptr.p.p.l === null || !ptr.p.p.l.red))) {
                ptr.restruct();
                break;
            } else {
                ptr.p.red = false;
                ptr.p.p.r.red = false;
                ptr.p.p.red = true;
            }

            ptr = ptr.p;
        }
    }

    restruct() {
        let rootParent = this.p.p.p;
        let newRoot, newChildRight, newChildLeft;

        // Right rotation
        if (this === this.p.l && this.p === this.p.p.l) {
            newRoot = this.p;
            newChildRight = this.p.p;
            newChildLeft = this;
            newChildRight.l = newRoot.r;
            if (newChildRight.l !== null) newChildRight.l.p = newChildRight;
        }

        // Left-Right Rotation
        if (this === this.p.r && this.p === this.p.p.l) {
            newRoot = this;
            newChildRight = this.p.p;
            newChildLeft = this.p;
            newChildRight.l = newRoot.r;
            if (newChildRight.l !== null) newChildRight.l.p = newChildRight;
            newChildLeft.r = newRoot.l;
            if (newChildLeft.r !== null) newChildLeft.r.p = newChildLeft;
        }

        // Left Rotation
        if (this === this.p.r && this.p === this.p.p.r) {
            newRoot = this.p;
            newChildLeft = this.p.p;
            newChildRight = this;
            newChildLeft.r = newRoot.l;
            if (newChildLeft.r !== null) newChildLeft.r.p = newChildLeft;
        }

        // Right-Left Rotation
        if (this === this.p.l && this.p === this.p.p.r) {
            newRoot = this;
            newChildLeft = this.p.p;
            newChildRight = this.p;
            newChildRight.l = newRoot.r;
            if (newChildRight.l !== null) newChildRight.l.p = newChildRight;
            newChildLeft.r = newRoot.l;
            if (newChildLeft.r !== null) newChildLeft.r.p = newChildLeft;
        }

        if (rootParent !== null) {
            if (rootParent.l === this.p.p) rootParent.l = newRoot;
            if (rootParent.r === this.p.p) rootParent.r = newRoot;
        }
        newRoot.p = rootParent;

        newRoot.r = newChildRight;
        newRoot.l = newChildLeft;
        newChildRight.p = newRoot;
        newChildLeft.p = newRoot;
        newChildRight.red = true;
        newChildLeft.red = true;
        newRoot.red = false;
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

class RedBlackMap {
    constructor(k, v, cmp) {
        this.map = {};
        if (cmp instanceof Function) {
            this.root = new RedBlackNode(k, v, false, cmp);
            this.map[root.k] = this.root;
        } else if (v !== undefined) {
            this.root = new RedBlackNode(k, v, false, null);
            this.map[root.k] = this.root;
        } else if (k !== undefined) {
            this.root = new RedBlackNode(k, null, false, null);
            this.map[root.k] = this.root;
        } else {
            this.root = null;
        }
    }

    add(k, v) {
        if (this.root === null) {
            this.root = new RedBlackNode(k, v, false, null);
            this.map[root.k] = this.root;
            return this.root;
        }

        let ptr = this.root.add(k, v);
        if (this.root.p !== null) this.findRoot();
        this.map[k] = ptr;
        return ptr;
    }

    findRoot() {
        let ptr = this.root;
        while (ptr.p !== null) ptr = ptr.p;
        this.root = ptr;
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
            out.push([ptr.k,ptr.red]);
            ptr = ptr.getNext();
        }

        return out;
    }

    tree() {
        let oldarr = [this.root];
        let newarr = [];
        console.log(this.root.k);
        while (true) {
            newarr = [];
            for (let k = 0; k < oldarr.length; k++) {
                if (!(oldarr[k].l instanceof RedBlackNode)) {
                    process.stdout.write(`null, `);
                } else {
                    newarr.push(oldarr[k].l);
                    process.stdout.write(`${oldarr[k].l.k}, `);
                }

                process.stdout.write(`(${oldarr[k].k}), `);
                if (!(oldarr[k].r instanceof RedBlackNode)) {
                    process.stdout.write(`null   `);
                } else {
                    newarr.push(oldarr[k].r);
                    process.stdout.write(`${oldarr[k].r.k}   `);
                }
            }
            process.stdout.write('\n');
            if (newarr.length === 0) break;
            oldarr = newarr;
        }
    }
}