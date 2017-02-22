import React from 'react';
import { Grid, Jumbotron, Navbar } from 'react-bootstrap';
import Component from './component';
import About from './about';
import QuizItems from './quiz-items';
import QuizResults from './quiz-results';
import * as Constants from '../constants/quiz-constants';
import '../styles/app.css';

import QuizStore from '../stores/quiz-store';

class App extends Component {
    constructor(props) {
        super(props, 'handleStart');

        this.state = {
            started: false,
            done: false,
            array: null
        };
    }

    componentDidMount() {
        QuizStore.addChangeListener(e => {
            if (e.eventName === Constants.SORT_DONE) {
                this.setState({
                    done: true,
                    array: e.array,
                    comparisons: e.comparisons
                });
            }
        });
    }

    handleStart() {
        this.setState({
            started: true
        });
    }

    render() {
        let qi, 
            jumboDesc = (
                <p>
                    With this simple "quiz", we'll ask you to make comparisons between various values based on 
                    what <i>you</i> feel is important.  At the end, we'll present the list in order from most 
                    important to least important to you.  There are no wrong answers.  These are all valid 
                    values to hold, and the final ordering is merely tailored to your personality and 
                    preferences.
                </p>
            );

        if (!this.state.started) {
            qi = <About onBegin={ this.handleStart } />;
        } else if (this.state.done) {
            qi = <QuizResults array={ this.state.array } comparisons={ this.state.comparisons } />;
        } else {
            qi = <QuizItems />;
            jumboDesc = null;
        }

        return (
            <div className="App">
                <Jumbotron>
                    <Grid bsClass='container'>
                        <h1>Determine Your Core Values</h1>
                        { jumboDesc }
                    </Grid>
                </Jumbotron>
                {qi}
                <Navbar fixedBottom className='hidden-xs'>
                    <div className='navbar-text'>
                        <a className='navbar-link' href="http://thehappinesstrap.com/upimages/complete_worksheets_for_The_Confidence_Gap.pdf">
                            Core values PDF
                        </a> / <a className='navbar-link' href="https://github.com/dfoverdx/core-value-quiz">Source Code</a>
                    </div>
                    <div className='navbar-right navbar-text'>
                        © Jordan Hitch 2017
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default App;
