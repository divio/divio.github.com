import React, { Component } from 'react';

export default class Repo extends Component {
    render() {
        // console.log(this.props);
        return (
            <div className="repo">
                {this.props.name}{' '}{this.props.language}{' '}
                Stars: {this.props.stargazers_count}. Forks: {this.props.forks_count}
            </div>
        )
    }
}
