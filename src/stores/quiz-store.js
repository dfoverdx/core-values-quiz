import Store from './store';
import QuizActions from '../actions/quiz-actions';
import * as Constants from '../constants/quiz-constants';
import Values from './values';
import QS from './qs-promise';

let _qs,
    _values = Values,
    _resolve,
    _done = false,
    _comparisons = 0;

class QuizStore extends Store {
    constructor() {
        super(Constants.QUIZ_ACTION, handleDispatch);
        _qs = new QS(_values, promptUser, done);
    }
    
    get curValues() {
        return _values;
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
        case Constants.BEGIN_QUIZ:
            _qs.run();
            break;

        case Constants.MAKE_COMPARISON:
            _comparisons++;
            _resolve(action.leftLessThanRight);
            _resolve = null;
            break;

        case Constants.PROMPT_USER:
            args.left = action.left;
            args.right = action.right;
            args.comparisons = _comparisons;
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

function promptUser(a, i, j, res) {
    _resolve = res;
    QuizActions.promptUser(a[i], a[j]);
}

function done() {
    QuizActions.sortDone(_values);
}