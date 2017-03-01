import React from 'react';
import DocumentMeta from 'react-document-meta';
import { Grid, Jumbotron } from 'react-bootstrap';
import Component from './component';
import About from './about';
import AlgorithmSelect from './algorithm-select';
import QuizItems from './quiz-items';
import QuizResults from './quiz-results';
import * as Constants from '../constants/quiz-constants';
import AppFooter from './app-footer';
import '../styles/app.css';

import QuizStore from '../stores/quiz-store';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: 'question',
            array: null
        };
    }

    componentDidMount() {
        QuizStore.addChangeListener(e => {
            switch (e.eventName) {
                case Constants.SELECT_QUESTION:
                    this.setState({
                        stage: 'selectAlgorithm'
                    });
                    
                    break;

                case Constants.SELECT_ALGORITHM:
                    this.setState({
                        stage: 'quiz',
                    });

                    break;

                case Constants.SORT_DONE:
                    this.setState({
                        stage: 'done',
                        array: e.array,
                        comparisons: e.comparisons,
                        question: e.question
                    });

                    break;

                default:
                    break;
            }
        });
    }

    render() {
        let qi, 
            jumboDesc = null,
            jumboHiddenXs = 'hidden-xs';

        switch (this.state.stage) {
            case 'question':
                qi = <About />;
                jumboHiddenXs = '';
                jumboDesc = (
                    <p>
                        With this simple "quiz", we'll ask you to make comparisons between various values based on 
                        what <i>you</i> feel is important.  At the end, we'll present the list in order from most 
                        important to least important to you.  There are no wrong answers.  These are all valid 
                        values to hold, and the final ordering is merely tailored to your personality and 
                        preferences.
                    </p>
                );
                break;

            case 'selectAlgorithm':
                qi = <AlgorithmSelect />;
                break;

            case 'quiz':
                qi = <QuizItems />
                break;

            case 'done':
                jumboHiddenXs = '';
                qi = <QuizResults array={ this.state.array } comparisons={ this.state.comparisons } question={ this.state.question } />;
                break;

            default:
                break;
        }

        const meta = {
            viewport: 'width=device-width, initial-scale:1.0, maximum-scale=1'
        };

        return (

            <div className="App">
                <DocumentMeta {...meta} />
                <Jumbotron className={ jumboHiddenXs }>
                    <Grid bsClass='container'>
                        <h1>Determine Your Core Values</h1>
                        { jumboDesc }
                    </Grid>
                </Jumbotron>
                {qi}
                <AppFooter />
            </div>
        );
    }
}

export default App;
