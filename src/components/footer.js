import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <span className="copyright pull-left">Copyright 2015 Divio AG. All rights reserved.</span>
                    <span className="pull-right">
                        <a href="#">About us</a>
                        <a href="#">Contact</a>
                        <a href="#">Join us</a>
                    </span>
                </div>
            </div>
        )
    }
}
