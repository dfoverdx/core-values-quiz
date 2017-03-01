import React, { Component } from 'react';
import { Panel, Grid } from 'react-bootstrap';

import QuestionSelect from './question-select';

export default class About extends Component {
    render() {
        return (
            <Grid bsStyle='container'>
                <Panel header='About this quiz' bsStyle='primary' style={{ fontSize: 16 }}>
                    <p>
                        There are 58 core value candidates, which were pulled from <a href="http://thehappinesstrap.com/upimages/complete_worksheets_for_The_Confidence_Gap.pdf">this PDF</a>.
                    </p>
                    <p>
                        You can think about which values are most important to you in a variety of ways.  
                        When taking this quiz, it is most effective if you choose one frame of reference, and stick to it 
                        throughout the whole quiz.  Otherwise, when you've got to choose between <i>equality</i> and <i>fun</i>,
                        it might be hard to make the comparison in any meaningful way.  Doing this also makes your results
                        more meaningful, since you understand what the ordering actually means.
                    </p>
                    <p className='lead'>
                        Pick a question to answer about yourself:
                    </p>
                    <QuestionSelect />
                </Panel>
            </Grid>
        );
    }
}