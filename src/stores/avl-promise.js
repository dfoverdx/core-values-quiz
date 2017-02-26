// 'use strict';

// let _comparisons = 0;

class TreeNode {
    constructor(value) {
        this._val = value;
        this._height = 1;
        this._left = null;
        this._right = null;
    }

    get value() {
        return this._val;
    }

    get height() {
        return this._height;
    }

    set height(val) {
        this._height = val;
    }

    get left() {
        return this._left;
    }

    set left(val) {
        this._left = val;
    }

    get right() {
        return this._right;
    }

    set right(val) {
        this._right = val;
    }
}

class AvlTree {
    constructor() {
        this._root = null;
        this._prevComps = {};
    }

    insert(val, promptUser, resolve) {
        return new Promise(res => this._insert(this._root, val, promptUser, res))
            .then(n => { this._root = n; })
            .then(resolve);
    }

    _height(node) {
        if (node === null) {
            return 0;
        }

        return node.height;
    }

    _getBalance(node) {
        return this._height(node.left) - this._height(node.right);
    }

    _rotateRight(node) {
        let x = node.left,
            t2 = x.right;

        x.right = node;
        node.left = t2;

        node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
        x.height = Math.max(this._height(x.left), this._height(x.right)) + 1;

        return x;
    }

    _rotateLeft(node) {
        let y = node.right,
            t2 = y.left;

        y.left = node;
        node.right = t2;

        node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
        y.height = Math.max(this._height(y.left), this._height(y.right)) + 1;

        return y;
    }

    _insert(node, val, promptUser, resolve) {
        if (node === null) {
            resolve(new TreeNode(val));
            return;
        }

        let self = this;

        return new Promise(res => {
            // _comparisons++;
            promptUser(node.value, val, res);
        }).then(nodeValltVal => {
            self._addComparison(node.value.name, val.name, nodeValltVal);
            
            if (nodeValltVal) {                
                return new Promise(r => { self._insert(node.right, val, promptUser, r); })
                    .then(n => {
                        node.right = n;
                    });
            } else {
                return new Promise(r => { self._insert(node.left, val, promptUser, r); })
                    .then(n => { 
                        node.left = n; 
                    });
            }
        }).then(() => new Promise(res => {
            node.height = Math.max(self._height(node.left), self._height(node.right)) + 1;
            
            let bal = self._getBalance(node),
                prevCompKey,
                prevComp;

            if (bal > 1) {
                prevCompKey = val.name + '<' + node.left.value.name;
                prevComp = self._prevComps[prevCompKey];

                if (prevComp) {
                    res(self._rotateRight(node));
                } else {
                    node.left = self._rotateLeft(node.left);
                    res(self._rotateRight(node));
                }
            } else if (bal < -1) {
                prevCompKey = val.name + '<' + node.right.value.name;
                prevComp = self._prevComps[prevCompKey];

                if (prevComp) {
                    node.right = self._rotateRight(node.right);
                    res(self._rotateLeft(node));
                } else {
                    res(self._rotateLeft(node));
                }
            } else {
                res(node);
            }
        })).then(n => { resolve(n); });
    }

    traverseInOrder() {
        return this._traverseInOrder(this._root);
    }

    * _traverseInOrder(node) {
        if (node === null) {
            return;
        }

        if (node.left !== null) {
            for (let val of this._traverseInOrder(node.left)) {
                yield val;
            }
        }

        yield node.value;
        
        if (node.right !== null) {
            for (let val of this._traverseInOrder(node.right)) {
                yield val;
            }
        }
    }

    _addComparison(name1, name2, n1ltn2) {
        this._prevComps[name1 + '<' + name2] = n1ltn2;
        this._prevComps[name2 + '<' + name1] = !n1ltn2;
    }
}

export default class AvlSort {
    constructor(array, promptUser, done) {
        this._array = array;
        this._promptUser = promptUser;
        this._done = done;
        this._avlTree = new AvlTree();
    }

    run() {
        // _comparisons = 0;
        let p = Promise.resolve();

        for (let i = 0; i < this._array.length; i++) {
            p = p.then(() => new Promise(res => this._avlTree.insert(this._array[i], this._promptUser, res)));
        }

        p.then(() => {
            let i = 0;
            for (let val of this._avlTree.traverseInOrder()) {
                this._array[i] = val;
                i++;
            }

            // console.log(_comparisons);
            this._done();
        });
    }
}

// function getRandom(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

// function swap(a, i, j) {
//     let tmp = a[i];
//     a[i] = a[j];
//     a[j] = tmp;
// }

// function genArray(len) {
//     let a = new Array(len);
//     for (let i = 0; i < len; i++) {
//         a[i] = i;
//     }

//     for (let i = 0; i < len; i++) {
//         swap(a, i, getRandom(i, len));
//     }

//     return a;
// }

// let a = genArray(58);
// console.log(a);

// function promptUser(i, j, res) {
//     setTimeout(() => { 
//         console.log('Comparing ' + i + ' against ' + j);
//         res(i < j);
//         _comparisons++;
//     }, 10);
// }

// function done() {
//     console.log(_comparisons);
//     console.log(a);
// }

// let s = new AvlSort(a, promptUser, done);
// s.run();