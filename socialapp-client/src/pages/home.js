import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Scream from '../components/Scream'
import Profile from '../components/Profile'
export class home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             screams: null
        }
    }
    
    componentDidMount() {
        axios.get('https://us-central1-socialapp-5cb31.cloudfunctions.net/api/screams')
            .then(res => {
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map((scream) => {
                return <Scream key={scream.screamId} scream={scream}></Scream>
                 
            }) 
        ) : <div>Loading Screams...</div>
        
        
        return (
            <Grid container justify="center" spacing={10}>
                <Grid item sm={8}  xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

export default home
