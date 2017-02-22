import Dispatcher from '../dispatcher/dispatcher';
import * as Constants from '../constants/quiz-constants';

class QuizActions {
    beginQuiz() {
        Dispatcher.handleQuizAction({
            actionType: Constants.BEGIN_QUIZ
        });
    }

    selectAlgorithm() {
        Dispatcher.handleQuizAction({
            actionType: Constants.SELECT_ALGORITHM
        });
    }

    makeComparison(leftLessThanRight) {
        Dispatcher.handleQuizAction({
            actionType: Constants.MAKE_COMPARISON,
            leftLessThanRight: leftLessThanRight
        });
    }

    chooseMiddle(middleIndex) {
        Dispatcher.handleQuizAction({
            actionType: Constants.CHOOSE_MIDDLE,
            middleIndex: middleIndex
        });
    }

    promptUser(left, right) {
        Dispatcher.handleQuizAction({
            actionType: Constants.PROMPT_USER,
            left: left,
            right: right
        });
    }

    promptUserForMid(array, leftIdx, midIdx, rightIdx) {
        Dispatcher.handleQuizAction({
            actionType: Constants.PROMPT_USER_FOR_MID,
            left: array[leftIdx],
            leftIdx: leftIdx,
            mid: array[midIdx],
            midIdx: midIdx,
            right: array[rightIdx],
            rightIdx: rightIdx,
        });
    }

    sortDone(array, comparisons) {
        Dispatcher.handleQuizAction({
            actionType: Constants.SORT_DONE,
            array: array,
            comparisons: comparisons,
        });
    }
}

export default new QuizActions();