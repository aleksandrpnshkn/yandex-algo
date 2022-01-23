const a = 1000;
const m = 123987123;

class Hash {
    constructor(str = '', value = 0) {
        this.str = str;
        this.value = value;
        this.length = str.length;
    }

    add(charCode) {
        this.str += String.fromCharCode(charCode);
        this.value = (a * this.value + charCode) % m;
        this.length++;
    }
}

const compare = 60335049;

function gen(hash) {
    if (hash.length > 1000) {
        return 'bad';
    }
    // console.log(hash);
    if (hash.value === compare) {
        console.log(hash);
        return;
    }

    for (let charCode = 97; charCode <= 122; charCode++) {
        const copy = new Hash(hash.str, hash.value);
        copy.add(charCode);
        gen(copy);
    }
}

console.log(gen(new Hash(), new Hash()));
