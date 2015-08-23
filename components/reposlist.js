import React, { Component } from 'react';
import Repo from './repo';
export default class ReposList extends Component {
    render() {
        return (
            <div className="repos">
                {this.props.repos.map((repo) =>
                    <Repo key={repo.id} {...repo} />
                )}
            </div>
        );
    }
}
