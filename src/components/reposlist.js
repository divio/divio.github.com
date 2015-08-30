import React, { Component } from 'react';
import Repo from './repo';

export default class ReposList extends Component {
    render() {
        return (
            <section className="repos">
                <h2 className="sr-only">Repositories</h2>
                {this.props.repos.map((repo) =>
                    <Repo key={repo.id} {...repo} />
                )}
            </section>
        );
    }
}
