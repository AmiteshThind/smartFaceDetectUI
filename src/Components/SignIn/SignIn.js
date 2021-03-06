import React from 'react';
import { useState } from 'react';


function SignIn(props) {
    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    let onEmailChange = (event) => {
        setSignInEmail(event.target.value);
        console.log(signInEmail);
    }
    let onPasswordChange = (event) => {
        setSignInPassword(event.target.value);
        console.log(signInPassword);
    }

    let onSubmitSignIn = () => {
        fetch('https://powerful-inlet-04840.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword
            })
        }).then(response => response.json())
            .then(user => {

                console.log(user);
                if (user.id) {
                    props.loadUser(user);
                    props.onRouteChange('home');//if valid credentials
                }
            })


    }

    return (
        <div>
            <article className="br3 ba  shadow-2 b--black-10 mv4  w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => props.onRouteChange('register')} className="f6 link pointer dim black db">Register</p>

                        </div>
                    </div>
                </main>
            </article>
        </div>
    );
}


export default SignIn;