export default class QS {
    constructor(array, promptUser, done, promptForMiddle) {
        this._array = array;
        this._promptUser = promptUser;
        this._promptForMiddle = promptForMiddle;
        this._done = done;
        // this._comparisons = 0;
    }

    run() {
        new Promise(r => {
            return this.runQS(0, this._array.length - 1, r);
        }).then(() => {
            // console.log(this._array);
            // console.log(this._comparisons);

            this._done();
        });
    }

    runQS(low, high, resolve, part) {
        if (low < high) {
            let p = Promise.resolve();

            if (high - low > 5 && this._promptForMiddle) {
                p = p.then(() => new Promise(res => this._promptForMiddle(this._array, high, res)))
                     .then(mid => swap(this._array, high, mid));
            }

            p = p.then(() => new Promise(r => { this.partition(low, high, r); }))
                 .then(p => new Promise(r => { this.runQS(low, p - 1, r, p); }))
                 .then(p => new Promise(r => { this.runQS(p + 1, high, r, p); }))
                 .then(() => { resolve(part); });

            return p;
        } else {
            resolve(part);
        }
    }

    partition(low, high, res) {
        let self = this,
            i = low - 1,
            j = low,
            partProm = Promise.resolve();

        function inner(i, j, doSwap) {
            if (doSwap) {
                i++;
                swap(self._array, i, j);
            }

            j++;
            if (j < high) {
                addThen(i, j);
            } else {
                i++;
                swap(self._array, i, high);
                res(i);
            }
        }

        function addThen(i, j) {
            partProm = partProm.then(() => {
                // self._comparisons++;
                return new Promise(r => {
                    self._promptUser(self._array, j, high, r);
                });
            }).then(s => {
                inner(i, j, s);
            });
        }

        if (low < high) {
            addThen(i, j);
        }
    }
}

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}