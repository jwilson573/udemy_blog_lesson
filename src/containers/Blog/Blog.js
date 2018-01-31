import React, { Component } from 'react';
// import axios from '../../axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
import asyncComponent from '../../hoc/asyncComponent';
// import NewPost from './NewPost/NewPost';

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));


class Blog extends Component {

    state = {
        auth: true
    }
    

    render () {
        
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink 
                                    to="/posts"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }} 
                                    >Posts</NavLink>
                            </li>
                            {/* Absolute Path Below: Always appends the path right after the domain (e.g. example.com/new-posts) */}
                            <li>
                                <NavLink to={{
                                    pathname: '/new-post',
                                    hash: '#submit',
                                    search: '?quick-submit=true'
                                }}>New Post</NavLink>
                            </li>
                            {/* Relative Path Below: Appends something to the existing path you are currently on (e.g. example.com/posts/new-post) */}
                            {/* <li><Link to={{
                                pathname: this.props.match.url + '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li> */}
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {/* <Route path="/" exact render={() => <h1>Home</h1>} /> */}
                    {/* Below is what's called a route guard. Form of authentication */}
                    {this.state.auth ? <Route path="/new-post"  component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    {/* Catch all route below. Always place last. Handles 404 error cases. */}
                    <Route render={() => <h1>Not Found</h1>} />
                    {/* from is only available in the switch statement, otherwise just use to
                    <Redirect from="/" to="/posts" /> */}
                </Switch>

            </div>
        );
    }
}

export default Blog;