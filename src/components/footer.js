import React, { Component } from 'react';
import { LINKS } from '../config';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="copyright pull-left">Copyright 2015 Divio AG. All rights reserved.</div>
                    <div className="pull-right">
                        {Object.keys(LINKS.FOOTER).map((item) =>
                            <a key={item} href={LINKS.FOOTER[item]}>{item}</a>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
