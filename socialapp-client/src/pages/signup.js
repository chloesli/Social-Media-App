import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import AppIcon from '../images/icon.png'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions'

const Link = require('react-router-dom').Link
const styles =(theme) => ({
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

export class signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            email: '', 
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
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
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.setState({
            loading: true
        }, () => {
            
        })
        this.props.signupUser(newUserData, this.props.history);
        axios.post('https://us-central1-socialapp-5cb31.cloudfunctions.net/api/signup', newUserData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            this.setState({
                loading: false
            });
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })
        console.log("hi");
    }
    handleChange = (event) => {
        console.log(event.target);
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    render() {
        const { classes, UI: {loading} } = this.props;
        const {errors} = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm> 
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h1" className={classes.pageTitle}>
                        Sign Up
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
                        <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        className={classes.textField}
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        fullWidth></TextField>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <TextField 
                        id="handle" 
                        name="handle" 
                        type="text" 
                        label="Handle" 
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        className={classes.textField}
                        value={this.state.handle} 
                        onChange={this.handleChange} 
                        fullWidth></TextField>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button type="submit" variant="contained" color="primary" disabled={loading} className={classes.button}>
                        Sign Up
                        {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                        </Button>
                        <br></br>
                        <small>Already have an account? Login <Link to="/login">Here</Link></small>
                        </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));
