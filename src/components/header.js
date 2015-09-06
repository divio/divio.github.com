import React, { Component } from 'react';
import { ORG_NAME, LINKS } from '../config';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    <h1 className="icon icon-logo"><span className="sr-only">{ORG_NAME}</span></h1>
                    <a href={LINKS.HOME}>Visit us</a>
                    <div className="lead">
                        <div>
                            Lorem Ipsum is simply dummy text of the <br />
                            printing and typesetting industry.
                        </div>
                        <small>Lorem Ipsum is simply dummy text</small>
                    </div>
                </div>
            </div>
        )
    }
}
