export default class MergeSort {
    constructor(array, promptUser, done) {
        this._array = array;
        this._promptUser = promptUser;
        this._done = done;
        // this._comparisons = 0;
    }

    run() {
        let n = this._array.length,
            copy = new Array(n);
        copyArray(this._array, copy);

        new Promise(res => this.splitMerge(copy, 0, n, this._array, res))
            .then(this._done);
    }

    splitMerge(b, begin, end, a, resolve) {
        if (end - begin < 2) {
            return Promise.resolve().then(resolve);
        }

        let mid = Math.floor((begin + end) / 2);

        return new Promise(res => this.splitMerge(a, begin, mid, b, res))
            .then(() => new Promise(res => this.splitMerge(a, mid, end, b, res)))
            .then(() => this.merge(b, begin, mid, end, a))
            .then(resolve);
    }

    merge(a, begin, mid, end, b) {
        let i = begin,
            j = mid,
            p = Promise.resolve();

        for (let k = begin; k < end; k++) {
            p = p.then(() => {
                if (i >= mid) {
                    b[k] = a[j];
                    j++;
                } else if (j >= end) {
                    b[k] = a[i];
                    i++;
                } else {
                    // this._comparisons++;
                    return new Promise(r => {
                        this._promptUser(a[i], a[j], r);
                    }).then(iltj => {
                        if (iltj) {
                            b[k] = a[i];
                            i++;
                        } else {
                            b[k] = a[j];
                            j++;
                        }
                    });
                }
            });
        }

        return p;
    }
}

function copyArray(a, b) {
    for (let i = 0; i < a.length; i++) {
        b[i] = a[i];
    }
}