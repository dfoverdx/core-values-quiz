export default class QS {
    constructor(array, promptUser, done, promptForMiddle) {
        this._array = array;
        this._promptUser = promptUser;
        this._promptForMiddle = promptForMiddle;
        this._done = done;
        // this._comparisons = 0;

        this.doUpdateProgress = this.doUpdateProgress.bind(this);
    }

    set updateProgress(val) {
        this._updateProgress = val;
    }

    run() {
        this._progressArray = new Array(this._array.length);
        for (let i = 0; i < this._progressArray.length; i++) {
            this._progressArray[i] = false;
        }

        Promise.resolve().then(this.doUpdateProgress)
            .then(() => new Promise(r => {
                return this.runQS(0, this._array.length - 1, r);
            }))
            .then(() => {
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
                 .then(this.doUpdateProgress)
                 .then(p => new Promise(r => { this.runQS(low, p - 1, r, p); }))
                 .then(p => new Promise(r => { this.runQS(p + 1, high, r, p); }))
                 .then(() => { resolve(part); });

            return p;
        } else {
            // low is in its final position by virtue of being the only remaining element
            this.doUpdateProgress(low);
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
                    self._promptUser(self._array[j], self._array[high], r);
                });
            }).then(s => {
                inner(i, j, s);
            });
        }

        if (low < high) {
            addThen(i, j);
        }
    }

    doUpdateProgress(p) {
        if (p !== undefined) {
            this._progressArray[p] = true;
        }

        if (this._updateProgress) {
            this._updateProgress(this._progressArray.slice());
        }

        return p;
    }
}

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}