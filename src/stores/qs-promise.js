export default class QS {
    constructor(array, promptUser, done) {
        this._array = array;
        this._promptUser = promptUser;
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
            return new Promise(r => {
                this.partition(low, high, r);
            }).then(p => {
                return new Promise(r => {
                    this.runQS(low, p - 1, r, p);
                });
            }).then(p => {
                return new Promise(r => {
                    this.runQS(p + 1, high, r, p);
                });
            }).then(() => {
                resolve(part);
            });
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
                self.swap(i, j);
            }

            j++;
            if (j < high) {
                addThen(i, j);
            } else {
                i++;
                self.swap(i, high);
                res(i);
            }
        }

        function addThen(i, j) {
            partProm = partProm.then(() => {
                self._comparisons++;
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

    swap(i, j) {
        let temp = this._array[i];
        this._array[i] = this._array[j];
        this._array[j] = temp;
    }
}