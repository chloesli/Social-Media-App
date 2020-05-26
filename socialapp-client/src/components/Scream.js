import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
const Link = require('react-router-dom').Link;

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        textAlign:"left",
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
        } } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia className={classes.image} image={userImage} title="Profile image"></CardMedia>
                <CardContent>
                    <Typography variant="h5" color="primary" component={Link} to={`/user/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream);
