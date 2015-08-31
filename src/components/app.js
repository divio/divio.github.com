import React, { Component, addons } from 'react/addons';
import { Link } from 'react-router';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import { initApp } from '../actions';
import { orgName } from '../config';
import ReposList from './reposlist';

const CSSTransitionGroup = addons.CSSTransitionGroup;

@connect((state) => state)
export default class App extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    componentDidMount() {
        this.props.dispatch(initApp(orgName));
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.route !== nextProps.route ||
            this.props.params.lang !== nextProps.params.lang ||
            this.props.repos !== nextProps.repos ||
            this.props.errorMessage !== nextProps.errorMessage
        )
    }

    componentDidUpdate(oldProps) {
        if (this.props.languages.length &&
            !includes(this.props.languages, this.props.params.lang) &&
            this.props.params.lang) {
            this.context.router.replaceWith('/');
        }
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
        if (this.props.errorMessage && !this.props.repos.length) {
            return (
                <div className="container">
                    <div className="error">{this.props.errorMessage}</div>
                </div>
            );
        }
        return (
            <div className="container">
                <div className="subheader">
                    <div className="meta">
                        <span className="count">
                            {this.props.repos.length || '...'} Repos
                        </span>
                        <span className="count">
                            {this.props.members || '...'} Members
                        </span>
                    </div>

                    <div className="navigation">
                        <Link className={allClassName} activeClassName="" to="/">all</Link>
                        {this.props.languages.map((lang) =>
                            <Link className="link" key={lang} to={`/${lang}`}>{lang}</Link>
                        )}
                    </div>
                </div>

                <CSSTransitionGroup transitionName="reveal">
                    <ReposList key={this.props.params.lang || 'all'} repos={this.filterRepos(this.props.repos, this.props.params.lang)} />
                </CSSTransitionGroup>
            </div>
        );
    }
}
