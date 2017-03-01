import React, { Component } from 'react';

import AlgorithmSelectButton from './algorithm-select-button';

export default class AlgorithmSelect extends Component {
    render() {
        return (
            <div className='container' style={{ textAlign: 'center' }}>
                <h3>Pick a sorting method:</h3>
                <AlgorithmSelectButton btnVal='qs'>
                    <h4>Quicksort</h4>
                    <ul style={{ textAlign: 'left', paddingLeft: 20 }}>
                        <li>284 questions on average</li>
                        <li>Questions are slightly quicker to answer</li>
                        <li>Shows progress bar</li>
                    </ul>
                </AlgorithmSelectButton>
                <AlgorithmSelectButton btnVal='avl'>
                    <h4>Binary Search Tree</h4>
                    <ul style={{ textAlign: 'left', paddingLeft: 20 }}>
                        <li>267 questions on average</li>
                        <li>Questions are slightly slower to answer</li>
                        <li>No progress bar</li>
                    </ul>
                </AlgorithmSelectButton>
                <p className='text-muted' style={{ marginTop: 8 }}>
                    Both options take about the same amount of time.  If you're good at switching contexts in your head 
                    and don't care about the progress bar, choose <a href='https://en.wikipedia.org/wiki/Binary_search_tree' target='_blank'>Binary Search Tree</a>, 
                    otherwise, choose <a href='https://en.wikipedia.org/wiki/Quicksort' target='_blank'>Quicksort</a>.
                    In case you're interested, the binary search tree implemented is an <a href='https://en.wikipedia.org/wiki/AVL_tree' target='_blank'>AVL tree</a>.
                </p>
            </div>
        );
    }
};