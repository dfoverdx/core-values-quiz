import Flux from 'flux';
import * as Constants from '../constants/quiz-constants';

class Dispatcher extends Flux.Dispatcher {
    handleQuizAction(action) {
        this.dispatch({
            source: Constants.QUIZ_ACTION,
            action: action
        });
    }
}

export default new Dispatcher();