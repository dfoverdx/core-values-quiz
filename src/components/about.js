import React, { Component } from 'react';
import { Panel, Button, Grid } from 'react-bootstrap';

export default class About extends Component {
    render() {
        return (
            <Grid bsStyle='container'>
                <Panel header='About this quiz' bsStyle='primary' style={{ fontSize: 16 }}>
                    <p>
                        There are 58 core value candidates, which were pulled from <a href="http://thehappinesstrap.com/upimages/complete_worksheets_for_The_Confidence_Gap.pdf">this PDF</a>.
                    </p>
                    <p>
                        There are several ways to think about which values are most important to you.  A few examples are:
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
                        it might be hard to make the comparison in any meaningful way.
                    </p>
                    <div style={{ textAlign: 'center' }}>
                        <Button bsSize='large' bsStyle='success' onClick={ this.props.onBegin }>
                            Begin quiz
                        </Button>
                    </div>
                </Panel>
            </Grid>
        );
    }
}

About.propTypes = {
    onBegin: React.PropTypes.func.isRequired
};