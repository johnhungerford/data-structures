class HashTable {
    constructor(size = 993) {
        this.buckets = new Array(size);
        this.size = size;
    }

    hash(key) {
        let hashedKey = 0;
        let i;
        for (i = 0; i < key.length; i += 5) {
            if (key.length < 1e7) {
                for (let j = 0; j < 5 && i + j < key.length; j++) {
                    hashedKey += (key.charCodeAt(j) - 32) * (64 ^ j);
                }
            } else {
                for (let j = 0; j < 5 && i + j < key.length; j++) {
                    hashedKey += key.charCodeAt(j) - 32;
                }
            }
        }

        return hashedKey % this.size;
    }

    set(key, value) {
        const index = this.hash(key);
        if(!Array.isArray(this.buckets[index])) this.buckets[index] = [];
        this.buckets[index].push([key,value]);
        return index;
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i in bucket) if (bucket[i][0] === key) return bucket[i][1];
        return undefined;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i in bucket) if (bucket[i][0] === key) {
            const out = bucket.splice(i,1);
            return out[1];
        }
        
        return undefined;
    }
}
