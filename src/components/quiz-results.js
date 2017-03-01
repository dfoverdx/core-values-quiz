import React from 'react';
import Component from './component';
import FileSaver from 'file-saver';
import { Col, Panel, ListGroup, ListGroupItem, Button, Glyphicon } from 'react-bootstrap';

export default class QuizResults extends Component {
    constructor(props) {
        super(props, 'saveResults');
    }

    saveResults() {
        let str = this.props.question + '\r\n',
            array = this.props.array;
        for (let i = 0; i < array.length; i++) {
            str += (i + 1) + '. ' + array[i].name + ' - ' + array[i].desc + '\r\n';
        }

        let blob = new Blob([str], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, 'core values.txt');
    }

    render() {
        let items = this.props.array.map(i => <li key={i.name}><span style={{ fontSize: '20px'}}>{i.name}</span> <span className='text-muted'>{i.desc}</span></li>);

        return (
            <div className='container'>
                <Col xs={12} sm={8} style={{ marginBottom: 40 }}>
                    <p className='lead'>{ this.props.question }</p>
                    <ol>
                        {items}
                    </ol>
                </Col>
                <Col xs={12} sm={4}>
                    <Panel header="Results">
                        <div>Questions answered: { this.props.comparisons }</div>
                        <Button onClick={this.saveResults} style={{width: '100%'}}>
                            <Glyphicon glyph='floppy-save' style={{marginRight: 6}} />
                            Save results to file
                        </Button>
                    </Panel>
                </Col>
            </div>
        );
    }
}

QuizResults.propTypes = {
    array: React.PropTypes.array.isRequired,
    comparisons: React.PropTypes.number.isRequired,
    question: React.PropTypes.string.isRequired
};