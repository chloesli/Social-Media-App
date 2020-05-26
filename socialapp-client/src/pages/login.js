import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import AppIcon from '../images/icon.png'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// redux
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
const Link = require('react-router-dom').Link
const styles = (theme) => ({
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto',
        fontSize: '38px'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        margin: '10px auto 10px auto',
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position:'absolute'
    }
})

export class login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '', 
            password: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors) {
            this.setState({errors: nextProps.UI.errors});
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
        
        console.log("hi");
    }
    handleChange = (event) => {
        console.log(event.target);
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    render() {
        const { classes, UI: {loading}} = this.props;
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm> 
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h1" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        className={classes.textField}
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        fullWidth></TextField>
                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        className={classes.textField}
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth></TextField>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" disabled={loading} className={classes.button}>
                        Login
                        {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                        </Button>
                        <br></br>
                        <small>Dont have an account? Sign up <Link to="/signup">Here</Link></small>
                        </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
