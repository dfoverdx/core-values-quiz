// let _comparisons = 0;

// basic node structure
// probably should have been a simple object, but I prefer strong-typing
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

// tree object into which we'll add values
// only handles inserts -- no deletes and no lookups
// code based on implementation found here: http://www.geeksforgeeks.org/avl-tree-set-1-insertion/ for details
// look at that page for explanations of rotations and balancing
// most of the member functions probably should have been static functions outside of the object... c'est la vie
class AvlTree {
    constructor() {
        this._root = null;

        // used to for memoizing comparisons so that we don't need to prompt the user when the same comparisons come up
        // during a rebalancing
        // conveniently, rebalancing never asks for a comparison that hasn't already been made
        this._prevComps = {};
    }

    // inserts a value into an array
    insert(val, promptUser, resolve) {
        // 1) insert value, which returns a new root node
        // 2) set the root to the returned node
        // 3) alert caller that the insert is complete
        return new Promise(res => this._insert(this._root, val, promptUser, res))
            .then(n => { this._root = n; })
            .then(resolve);
    }

    // helper function for getting the height of a node
    _height(node) {
        if (node === null) {
            return 0;
        }

        return node.height;
    }

    // helper function for getting the balance of a node, which is the difference in heights of its children
    _getBalance(node) {
        return this._height(node.left) - this._height(node.right);
    }

    // does a right-rotation during balancing
    _rotateRight(node) {
        let x = node.left,
            t2 = x.right;

        x.right = node;
        node.left = t2;

        node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
        x.height = Math.max(this._height(x.left), this._height(x.right)) + 1;

        return x;
    }

    // does a left-rotation during balancing
    _rotateLeft(node) {
        let y = node.right,
            t2 = y.left;

        y.left = node;
        node.right = t2;

        node.height = Math.max(this._height(node.left), this._height(node.right)) + 1;
        y.height = Math.max(this._height(y.left), this._height(y.right)) + 1;

        return y;
    }

    // recursive call for insert
    // on the first call, node should be this._root
    _insert(node, val, promptUser, resolve) {
        if (node === null) {
            resolve(new TreeNode(val));
            return;
        }

        let self = this;

        // prompt the user for the current comparison
        // then 
        //   - memoize the comparison (and its inverse)
        //   - call _insert() on the appropriate child
        // then check balance of node, and rebalance in necessary
        // then alert caller that insertion/rebalancing has completed
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

    // kicks off an in-order traversal of the tree
    traverseInOrder() {
        return this._traverseInOrder(this._root);
    }

    // generator function that returns nodes in order
    * _traverseInOrder(node) {
        if (node === null) {
            return;
        }

        if (node.left !== null) {
            for (let n of this._traverseInOrder(node.left)) {
                yield n;
            }
        }

        yield node.value;
        
        if (node.right !== null) {
            for (let n of this._traverseInOrder(node.right)) {
                yield n;
            }
        }
    }

    _addComparison(name1, name2, n1ltn2) {
        this._prevComps[name1 + '<' + name2] = n1ltn2;
        this._prevComps[name2 + '<' + name1] = !n1ltn2;
    }
}

// sorting object which acts as an interface between the AVL Tree and the QuizStore
export default class AvlSort {
    constructor(array, promptUser, done) {
        this._array = array;
        this._promptUser = promptUser;
        this._done = done;
        this._avlTree = new AvlTree();
    }

    // 1) creates a new tree
    // 2) inserts the items of the array in order
    // 3) runs in-order traversal of tree to replace items in original array
    // 4) alerts caller that sorting of _array is done
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