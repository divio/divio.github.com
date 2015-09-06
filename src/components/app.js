import React, { Component, addons } from 'react/addons';
import { connect } from 'react-redux';
import { includes } from 'lodash';
import { initApp } from '../actions';
import { ORG_NAME } from '../config';
import ReposList from './reposlist';
import Navigation from './navigation';

const CSSTransitionGroup = addons.CSSTransitionGroup;

@connect((state) => state)
export default class App extends Component {
    static contextTypes = {
        router: React.PropTypes.object
    }

    componentDidMount() {
        this.props.dispatch(initApp(ORG_NAME));
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
        if (this.props.errorMessage && !this.props.repos.length) {
            return (
                <div className="container">
                    <div className="error">{this.props.errorMessage}</div>
                </div>
            );
        }
        return (
            <div className="container">
                <div className="subheader clearfix">
                    <div className="meta">
                        <span className="count">
                            {this.props.repos.length || '...'} Repos
                        </span>
                        <span className="count">
                            {this.props.members || '...'} Members
                        </span>
                    </div>

                    <Navigation {...this.props} />
                </div>

                <CSSTransitionGroup transitionName="reveal">
                    <ReposList key={this.props.params.lang || 'all'}
                        repos={this.filterRepos(this.props.repos, this.props.params.lang)} />
                </CSSTransitionGroup>
            </div>
        );
    }
}
