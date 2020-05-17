import React from 'react'
import axios from 'axios'
import './Github-profile.css'

class Card extends React.Component {
    render(){
        return(
            <div className = 'Github-profile'>
                <img src = {this.props.avatar_url} alt = "size_is_75" ></img>
                <div className = "info">
                    <div className = 'name'>Name: {this.props.name}</div>
                    <div className = 'company'>Company: {this.props.company}</div>
                    <div className = 'repos'>No .of repos: {this.props.public_repos}</div>
                </div>
            </div>
        );
    }
}
const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card key = {profile.id} {...profile} />)}
    </div>
);


class Form extends React.Component {
    state = {
        Username: ''
    };
    GetValue = async (event) => {
        console.log(event)
        event.preventDefault();
        const resp = await axios.get(`https://api.github.com/users/${this.state.Username}`)
        .then((response) => {
            this.props.onSubmit(response.data)
        }, () => {
            alert("Not a valid username")
        })   
        this.setState({Username: '' })
    }
    render(){
        return(
            <form onSubmit ={this.GetValue} >
                <input type="text" 
                placeholder = "Github Username" 
                value = {this.state.Username} 
                onChange = {event => this.setState({Username: event.target.value })}
                required />
                <button>Add Card</button>
            </form>
        )}
}

class Github extends React.Component{
    state = {
        profiles: []
    }
    addNewProfile = (profileData) => {
        this.setState(prevState => ({
            profiles: [...prevState.profiles,profileData]
        }))
    }
    render(){
        return(
            <div>
                <div className="header">GitHub Profile Card</div>
                <Form  onSubmit = {this.addNewProfile} />
                <CardList profiles = {this.state.profiles}  />
            </div>    
        )}
}

export default Github