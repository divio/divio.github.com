import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="copyright pull-left">Copyright 2015 Divio AG. All rights reserved.</div>
                    <div className="pull-right">
                        <a href="http://www.divio.com/en/about-us/">About us</a>
                        <a href="http://www.divio.com/en/contact/">Contact</a>
                        <a href="http://www.divio.com/en/careers/">Join us</a>
                    </div>
                </div>
            </div>
        )
    }
}
