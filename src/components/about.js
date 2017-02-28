import React from 'react';
import { Panel, Button, Grid } from 'react-bootstrap';

import Component from './component';

import QuizActions from '../actions/quiz-actions';

export default class About extends Component {
    constructor(props) {
        super(props, 'handleClick');
    }

    handleClick() {
        QuizActions.finishAbout();
    }

    render() {
        return (
            <Grid bsStyle='container'>
                <Panel header='About this quiz' bsStyle='primary' style={{ fontSize: 16 }}>
                    <p>
                        There are 58 core value candidates, which were pulled from <a href="http://thehappinesstrap.com/upimages/complete_worksheets_for_The_Confidence_Gap.pdf">this PDF</a>.
                    </p>
                    <p>
                        You can think about which values are most important to you in a variety of ways.  A few examples are:
                    </p>
                    <ul>
                        <li>Which values are most reflected in your life right now?</li>
                        <li>Which values would you like your life to reflect in the future?</li>
                        <li>Which values, when violated, make you most angry?</li>
                        <li>Which values do you appreciate most when enacted by other people?</li>
                        <li>Which values are most important for humanity or society to succeed?</li>
                        <li>Which values should be most represented and upheld by our laws?</li>
                    </ul>
                    <p>
                        When taking this quiz, it is most effective if you choose one frame of reference, and stick to it 
                        throughout the whole quiz.  Otherwise, when you've got to choose between <i>equality</i> and <i>fun</i>,
                        it might be hard to make the comparison in any meaningful way.  Doing this also makes your results
                        more meaningful, since you understand what the ordering actually means.
                    </p>
                    <div style={{ textAlign: 'center' }}>
                        <Button bsSize='large' bsStyle='success' onClick={ this.handleClick }>
                            Begin quiz
                        </Button>
                    </div>
                </Panel>
            </Grid>
        );
    }
}