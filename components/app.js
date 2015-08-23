import React, { Component } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { initApp } from '../actions';
import { orgName } from '../config';
import ReposList from './reposlist';

export class App extends Component {
    componentDidMount() {
        this.props.dispatch(initApp(orgName));
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.route !== nextProps.route ||
            this.props.params.lang !== nextProps.params.lang ||
            this.props.repos !== nextProps.repos
        )
    }

    filterRepos(repos, lang) {
        return lang ? repos.filter((repo) => repo.language === lang) : repos;
    }

    render() {
        console.log('render');
        // work around a bug (?) in react-router
        let allClassName = classnames({
            'link': true,
            'active': !this.props.params.lang
        });
        return (
            <div>
                <h1>Divio Open Source</h1>
                <Link className={allClassName} activeClassName="" to="/">all</Link>
                {this.props.languages.map((lang) =>
                    <Link className="link"
                        activeClassName="active"
                        key={lang} to={`/${lang}`}>{lang}</Link>
                )}

                <div>
                    Currently showing {this.props.params.lang || 'all'} repos
                </div>

                <hr />

                <ReposList repos={this.filterRepos(this.props.repos, this.props.params.lang)} />
            </div>
        );
    }
}

export default connect((state) => ({
    repos: state.repos,
    languages: state.languages,
    isFetching: state.isFetching
}))(App);
