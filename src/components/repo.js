import React, { Component } from 'react';

export default class Repo extends Component {
    render() {
        return (
            <a className="repo" href={this.props.html_url}>
                <div className="repo-icon icon icon-github"></div>
                <div className="repo-info">
                    <h3 className="repo-name">{this.props.name}</h3>
                    {this.props.description ? (
                        <div className="repo-description">
                            {this.props.description}
                        </div>
                    ) : null}
                </div>
                <div className="repo-meta">
                    <span className="repo-language">{this.props.language || ' '}</span>
                    <span className="repo-stars">
                        <span className="icon icon-star">
                            <span className="sr-only">Stars: </span>
                        </span>
                        {this.props.stargazers_count}
                    </span>

                    <span className="repo-forks">
                        <span className="icon icon-fork">
                            <span className="sr-only">Forks: </span>
                        </span>
                        {this.props.forks_count}
                    </span>
                </div>
            </a>
        )
    }
}
