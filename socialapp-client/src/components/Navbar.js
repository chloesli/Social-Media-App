import React, { Component, Fragment } from 'react'
// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
// Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import AddIcon from '@material-ui/icons/Add';
import MyButton from '../util/MyButton';

const Link = require('react-router-dom').Link
export class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar position="fixed">
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <MyButton tip="Post a Scream!">
                                <AddIcon color="primary"/>
                            </MyButton>
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="primary"/>
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <Notifications color="primary"/>
                            </MyButton>
                        </Fragment>
                    ) : (
                    <Fragment>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                    </Fragment>
                        
                    )}
                    
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);