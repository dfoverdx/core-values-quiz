import Store from './store';
import QuizActions from '../actions/quiz-actions';
import * as Constants from '../constants/quiz-constants';
import Values from './values';
import QS from './qs-promise';
import MS from './merge-sort-promise';
import AVL from './avl-promise';

let _sorter,
    _algorithm = 'qs',
    _values = Values,
    _resolve,
    _done = false,
    _comparisons = 0;

class QuizStore extends Store {
    constructor() {
        super(Constants.QUIZ_ACTION, handleDispatch);
    }

    get curComparisons() {
        return _comparisons;
    }
    
    get curValues() {
        return _values;
    }

    get algorithmName() {
        return _algorithm;
    }

    get isDone() {
        return _done;
    }
}

export default new QuizStore();

function handleDispatch(payload) {
    let action = payload.action,
        args = {
            eventName: action.actionType
        };

    switch (action.actionType) {
        case Constants.FINISH_ABOUT:
            break;

        case Constants.SELECT_ALGORITHM:
            _algorithm = action.algorithm;
            break;

        case Constants.BEGIN_QUIZ:
            args.algorithm = _algorithm;

            shuffleArray(_values);

            switch (_algorithm) {
                case 'qs':
                    _sorter = new QS(_values, promptUser, done, promptUserForMid);
                    _sorter.updateProgress = updateProgress;

                    break;

                case 'ms':
                    _sorter = new MS(_values, promptUser, done);
                    break;

                case 'avl':
                    _sorter = new AVL(_values, promptUser, done);
                    break;

                default:
                    break;
            }

            _sorter.run();
            break;

        case Constants.MAKE_COMPARISON:
            _comparisons++;
            _resolve(action.leftLessThanRight);
            _resolve = null;
            break;

        case Constants.CHOOSE_MIDDLE:
            _comparisons++;
            _resolve(action.middleIndex);
            _resolve = null;
            break;

        case Constants.UPDATE_PROGRESS:
            args.valuesPlaced = action.valuesPlaced;
            break;

        case Constants.PROMPT_USER:
            args.left = action.left;
            args.right = action.right;
            args.comparisons = _comparisons;
            break;

        case Constants.PROMPT_USER_FOR_MID:
            args.left = action.left;
            args.leftIdx = action.leftIdx;
            args.mid = action.mid;
            args.midIdx = action.midIdx;
            args.right = action.right;
            args.rightIdx = action.rightIdx;
            args.comparisons = _comparisons
            break;

        case Constants.SORT_DONE:
            args.array = action.array;
            args.comparisons = _comparisons;
            _done = true;
            break;

        default:
            break;
    }

    this.emitChange(args);
}

// function promptUser(a, i, j, res) {
//     _resolve = res;
//     QuizActions.promptUser(a[i], a[j]);
// }

function promptUser(i, j, res) {
    _resolve = res;
    QuizActions.promptUser(i, j);
}

function promptUserForMid(a, high, res) {
    _resolve = res;
    QuizActions.promptUserForMid(a, high - 2, high - 1, high);
}

function updateProgress(valuesPlaced) {
    QuizActions.updateProgress(valuesPlaced);
}

function done() {
    QuizActions.sortDone(_values, _comparisons);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function shuffleArray(a) {
    for (let i = 0; i < a.length; i++) {
        let swapi = getRandomInt(i, a.length);
        let temp = a[i];
        a[i] = a[swapi];
        a[swapi] = temp;
    }
}