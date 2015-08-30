import React, { Component } from 'react';

export default class Repo extends Component {
    render() {
        return (
            <article className="repo">
                <h3 className="repo-name">{this.props.name}</h3>
                <div className="repo-meta">
                    <div className="repo-language">{this.props.language || ' '}</div>

                    <div className="repo-info">
                        <span className="repo-stars">Stars: {this.props.stargazers_count}</span>
                        <span className="repo-forks">Forks: {this.props.forks_count}</span>
                    </div>
                </div>

                <div className="repo-description">
                    {this.props.description}
                </div>
            </article>
        )
    }
}
