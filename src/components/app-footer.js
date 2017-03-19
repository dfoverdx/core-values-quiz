import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import '../styles/app-footer.css';

export default class AppFooter extends Component {
    render() {
        return (
            <Navbar fixedBottom className='hidden-xs'>
                <div className='navbar-text' style='margin-left: 0'>
                    <ul className='list-inline'>
                        <li>
                            <a className='navbar-link' href="http://thehappinesstrap.com/upimages/complete_worksheets_for_The_Confidence_Gap.pdf">
                                Core values PDF
                            </a>
                        </li>
                        <li>
                            <a className='navbar-link' href="https://github.com/dfoverdx/core-value-quiz">Source Code</a>
                        </li>
                    </ul>
                </div>
                <div className='navbar-right navbar-text' style='margin-right: 15px'>
                    <a href='/'>Jordan Hitch</a> © 2017
                </div>
            </Navbar>
        );
    }
}