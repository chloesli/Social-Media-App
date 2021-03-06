import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import EditDetails from '../components/EditDetails'
import MyButton from '../util/MyButton';

// MUI Stuff 
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import MuiLink from '@material-ui/core/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import dayjs from 'dayjs'
import Tooltip from '@material-ui/core/Tooltip';
// redux
import {connect} from 'react-redux'
import {logoutUser, uploadImage} from '../redux/actions/userActions'
const Link = require('react-router-dom').Link;

const styles = (theme) => ({
    ...theme.styles,
});

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        // send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        const {classes, user : {
            credentials: {
                handle, createdAt, imageUrl, bio, website, location
            },
            loading,
            authenticated
          }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} className="profile-image" alt="profile"/>
                        <input 
                        type="file" 
                        id="imageInput" 
                        onChange={this.handleImageChange}
                        hidden="hidden"
                        />
                        <MyButton placement="top" tip="Edit profile picture" onClick={this.handleEditPicture}
                        btnClassName="button" children={<EditIcon color="primary"/>}/>
                       
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary"
                            variant="h5"
                        >@{handle}</MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                            {location && (
                                <Fragment>
                                    <LocationOn color="primary"/> <span>{location}</span>
                                </Fragment>
                            )}
                            <hr/>
                        
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/>
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday color="primary"/> {' '} 
                        <span>Joined {dayjs(createdAt).format('MM YYYY')}</span>
                    </div>
                    <Tooltip title="Logout" placement="top">
                            <IconButton onClick={this.handleLogout}>
                                <KeyboardReturn color="primary"/>
                            </IconButton>
                    </Tooltip>
                    <EditDetails/>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">No Profile found, please login. </Typography>
                    
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                        <Button variant="contained" color="primary" component={Link} to="/signup">Signup</Button>
                    </div>
                
            </Paper>
        )) : (<div>loading...</div>)

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapActionsToProps = {logoutUser, uploadImage};
Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
