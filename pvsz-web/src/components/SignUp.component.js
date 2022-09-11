import React , { Component } from 'react';
import Header from "./Header";
import "./SignInUp.css";
import avatar from '../assets/images/avatar.png';

export default class SignUp extends Component {
    render () {

        let firstName, lastName, username, birthdayDate, email, password;
        // const [username, setUsername] = useState("");

        const submit = (e) => {
        e.preventDefault();
        // console.log(input)
        alert(`The name you entered was: ${username}`);
        }

        return (
            <body className='signIn'>
                <Header />
                <header>
                    <h1>Sign Up</h1>
                </header>
                <div className='infoDiv'>
                    <img src={avatar}></img>
                    <ul>
                        <form>
                            <li><input type='text' placeholder='First Name' className='signUpInputBlock' value={firstName}></input></li> 
                            <li><input type='text' placeholder='Last Name' className='signUpInputBlock' value={lastName}></input></li>
                            <li><input type='username' placeholder='Username' className='signUpInputBlock' value={username}></input></li>
                            <li><input type='date' placeholder='DOB' className='signUpInputBlock' value={birthdayDate}></input></li>
                            <li><input type='email' placeholder='Email' className='signUpInputBlock' value={email}></input></li>
                            <li><input type='password' placeholder='Password' className='signUpInputBlock' value={password}></input></li>
                            <li><button className='signUpButton' type='submit' onClick={submit}>SIGN UP</button></li>
                            <li>
                                <c>
                                    <input type='checkbox' id='agreePolicy' name='agreePolicy'></input>
                                    <label for="agreePolicy">By creating an account, you agree to our 
                                    PRIVATE POLICY and TERMS AND CONDITIONS. </label>  
                                </c>
                            </li>
                        </form>
                        
                    </ul>
                </div>
            </body>
        )
    }
    
}