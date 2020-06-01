import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {connect} from 'react-redux'
import { likeScream, unlikeScream } from '../redux/actions/dataActions'
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import FavouriteIcon from '@material-ui/icons/Favorite';
import FavouriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteScream from '../components/DeleteScream'
const Link = require('react-router-dom').Link;

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        textAlign:"left",
        position: "relative"
    },
    image: {
        minWidth:200
    },
    content: {
        padding:25
    }
}

export class Scream extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }
    likedScream = () => {
        if (this.props.user.likes && 
            this.props.user.likes.find(
            (like) => like.screamId === this.props.scream.screamId
        )) {
            return true;
        } else {
            return false;
        }
    };

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    }


    render() {
        dayjs.extend(relativeTime)
        const { classes, scream: { 
            body, 
            createdAt, 
            userImage, 
            userHandle, 
            screamId, 
            likeCount, 
            commentCount 
        },
        user: {
            authenticated,
            credentials: { handle }
        } } = this.props;
        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavouriteBorder color="primary"></FavouriteBorder>
                </Link>
            </MyButton>
        ) : (
            this.likedScream() ? (
                <MyButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavouriteIcon color="primary"/>
                </MyButton>
            ) :
            (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavouriteBorder color="primary"/>
                </MyButton>
            ) 
        );

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null
        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image} image={userImage} title="Profile image"></CardMedia>
                <CardContent>
                    {deleteButton}
                    <Typography variant="h5" color="primary" component={Link} to={`/user/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount}</span>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user:state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
