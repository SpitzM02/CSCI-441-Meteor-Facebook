import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {RedditDbUsers} from './../api/redditDB.js';
import TitleBar from './TitleBar.js';
// Exports LoginBar class
export default class LoginBar extends React.Component{

    constructor(props){
        super(props);
        this.state={
            moderator:"undefined"
        };
        this.loginUser = this.loginUser.bind(this);
    }
    //Logs in user
    loginUser(event){
        //Prevents the page from going to something else
         event.preventDefault();
         //obtains the username and password of the current user
         let userName = event.target.login.value;
         let password = event.target.password.value;
         console.log("User Entered: "+userName+" Password: "+password);
         //Checks through the database to see if any of them are in there
         // let null_or_empty=(numOne,numTwo)=>{
         //     if(numOne == "" || numTwo==""){
         //         return true;
         //     }
         //     return false;
         // };
         let formattedPosts=[];
         //console.warn(null_or_empty(userName, password));
         if(userName != "" || password!=""){
             //console.warn(null_or_empty(userName, password));
             //find all users and check against usernames/passwords
             const allPostsInDB=RedditDbUsers.find().fetch();
             let user,pass;
             console.log(allPostsInDB);
             formattedPosts = allPostsInDB.filter((post)=>{
                 //obtain current username/password of entry
                 user=post.username;
                 pass=post.password;
                 console.warn("Current User: "+user + " Current Password: "+pass);
               if(user===userName&&pass===password){
                   console.log("Current Username: "+user+" Current Password: "+pass);
                   console.log("These match!");
                   //set current username

                   return true;
               }
               else{
                   console.log("Current Username: "+user+" Current Password: "+pass);
                   console.log("These do not match! Attempting to register...");
                   return false;
               }
             });

         }
         if(formattedPosts.length>=1){
             this.setState({
                 moderator:userName
             });
         }
    }
    registerUser(event){
        event.preventDefault();
        //obtain current userName and password
        let user = document.getElementById('username').value;
        let pass = document.getElementById('password').value;
        //check to see if any are empty
        if((user != null || user != " ") || (pass!=null || pass != " ")){
            console.log("User Registered!");
            RedditDbUsers.insert({
              username: user,
              password: pass
            });
        }
        user,pass=" ";
    }
    setUser(userName){
        let moderator=userName;
        console.warn("Current User Set: "+moderator);
    }
    getUser(){
        return moderator;
    }
    //Renders component
    render(){
        //global vars
        let currentUser=String(this.getUser.value);
        let title="Not Facebook";
        console.log("Moderator: "+this.state.moderator);
        return (
            <div id="loginBar">
                <form onSubmit={this.loginUser}>
                    <label htmlFor="login" className="userLogin">Username:</label>
                    <input type="text" name="login" className="userLogin" id="username"/>
                    <label htmlFor="password" name="password" className="userLogin">Password:</label>
                    <input type="text" name="password" className="userLogin" id="password"/>
                    <input type="submit" value="Login"/>
                </form>
                <button onClick={this.registerUser}>Register</button>
                <TitleBar
                  title={title}
                  moderator={this.state.moderator}/>
            </div>
        );
  }
};
