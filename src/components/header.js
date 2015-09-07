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
                            Proudly contributing to open-source software<br/>since 2007
                        </div>
                        <small>Check out the projects we're involved in</small>
                    </div>
                </div>
            </div>
        )
    }
}
