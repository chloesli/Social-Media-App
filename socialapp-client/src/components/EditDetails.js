import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';

// Redux
import {connect} from 'react-redux'
import { editUserDetials } from '../redux/actions/userActions'
// MUI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = (theme) => ({
    ...theme.styles
})

export class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        optne: false
    }

    componentDidMount() {
        const {credentials} = this.props;
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        })
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classess.button}>
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
