import React, { Component, addons } from 'react/addons';
import { Link } from 'react-router';
import classnames from 'classnames';

export default class Navigation extends Component {
    render() {
        // work around a bug (?) in react-router
        let allClassName = classnames({
            'link': true,
            'active': !this.props.params.lang
        });

        return (
            <div className="navigation">
                <Link className={allClassName} activeClassName="" to="/">all</Link>
                {this.props.languages.map((lang) =>
                   <Link className="link" key={lang} to={`/${lang}`}>{lang}</Link>
                )}
            </div>
        );
    }
}
