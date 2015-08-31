import React, { Component } from 'react';

export default class Repo extends Component {
    render() {
        return (
            <article className="repo">
                <div className="repo-info">
                    <h3 className="repo-name">{this.props.name}</h3>
                    <div className="repo-description">
                        {this.props.description}
                    </div>
                </div>
                <div className="repo-meta">
                    <span className="repo-language">{this.props.language || ' '}</span>
                    <span className="repo-stars">Stars: {this.props.stargazers_count}</span>
                    <span className="repo-forks">Forks: {this.props.forks_count}</span>
                </div>
            </article>
        )
    }
}
