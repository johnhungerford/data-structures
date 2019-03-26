function Node(char = null) {
    this.char = null;
    this.children = {};
}

class Trie {
    constructor(str) {
        this.root = new Node();
        this.insert(str);
    }

    insert(str) {
        if (typeof str != 'string' && !(str instanceof String)) return -1;
        let ptr = this.root;
        for (let i = 0; i < str.length; i++) {
            if (ptr.children.hasOwnProperty(str[i])) {
                ptr = ptr.children[str[i]];
            } else {
                for (let j = i; j < str.length; j++) {
                    const newNode = new Node(str[j]);
                    ptr.children[str[j]] = newNode;
                    ptr = newNode;
                }

                return false;
            }
        }
        
        return true;
    }

    check(str) {
        if (typeof str != 'string' && !(str instanceof String)) return -1;
        let ptr = this.root;
        for (let i = 0; i < str.length; i++) {
            if (ptr.children.hasOwnProperty(str[i])) {
                ptr = ptr.children[str[i]];
            } else {
                return false;
            }
        }
        
        return true;
    }
}

module.exports = Trie;
