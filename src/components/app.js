import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Component from './component';
import QuizItems from './quiz-items';
import QuizResults from './quiz-results';
import * as Constants from '../constants/quiz-constants';
import '../styles/app.css';

import QuizStore from '../stores/quiz-store';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            array: null
        };
    }

    componentDidMount() {
        QuizStore.addChangeListener(e => {
            if (e.eventName === Constants.SORT_DONE) {
                this.setState({
                    done: true,
                    array: e.array
                });
            }
        });
    }

    render() {
        let qi = !this.state.done ? <QuizItems /> : <QuizResults array={this.state.array} />;

        return (
            <div className="App">
                <Jumbotron style={{ paddingLeft: 30, paddingRight: 30 }}>
                    <h1>Determine Your Core Values</h1>
                    <p>
                        With this simple "quiz", we'll present a pair of values and ask you which value is more important.  At the 
                        end, we'll present the list in order from most important to least important to you.  There are no wrong 
                        answers.  These are all valid values to hold, and the final ordering is merely tailored to your personality
                        and preferences.
                    </p>
                    <p>
                        There are 58 core value candidates, which were pulled from <a href="http://thehappinesstrap.com/upimages/complete_worksheets_for_The_Confidence_Gap.pdf">this PDF</a>.
                    </p>
                </Jumbotron>
                {qi}
            </div>
        );
    }
}

export default App;
