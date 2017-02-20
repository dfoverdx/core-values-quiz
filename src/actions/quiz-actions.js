import Dispatcher from '../dispatcher/dispatcher';
import * as Constants from '../constants/quiz-constants';

class QuizActions {
    beginQuiz() {
        Dispatcher.handleQuizAction({
            actionType: Constants.BEGIN_QUIZ
        });
    }

    makeComparison(leftLessThanRight) {
        Dispatcher.handleQuizAction({
            actionType: Constants.MAKE_COMPARISON,
            leftLessThanRight: leftLessThanRight
        });
    }

    promptUser(left, right) {
        Dispatcher.handleQuizAction({
            actionType: Constants.PROMPT_USER,
            left: left,
            right: right
        });
    }

    sortDone(array) {
        Dispatcher.handleQuizAction({
            actionType: Constants.SORT_DONE,
            array: array
        });
    }
}

export default new QuizActions();