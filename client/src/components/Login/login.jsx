import React, { useRef, useState } from "react";
import * as Components from './css.js';
import { useNavigate } from 'react-router-dom';
import API from '../../axios'; 

function Login({ isSignUp, onClose }) { // Accept props
    const [signIn, toggle] = useState(!isSignUp); // Initial state based on isSignUp prop
    const navigate = useNavigate();

    // Refs for Sign In form
    const emailRef = useRef();
    const passwordRef = useRef();

    // Refs for Sign Up form
    const userNameRef = useRef();
    const signUpEmailRef = useRef();
    const signUpPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const mobileRef = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (!email || !password) return;

        try {
            setIsLoading(true);
            const res = await API.post("http://localhost:5000/api/login", { email, password });

            if (res.status === 200) {
                navigate("/");
                onClose(); // Close popup on success
            }
        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async () => {
        const username = userNameRef.current.value;
        const email = signUpEmailRef.current.value;
        const password = signUpPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const mobile = mobileRef.current.value;

        if (!username || !password || !email || !confirmPassword || !mobile) return;

        try {
            setIsLoading(true);
            if (password !== confirmPassword) throw new Error("Passwords do not match");

            const res = await API.post("http://localhost:5000/api/register", {
                username,
                password,
                mobile,
                email,
            });

            if (res.status === 200) {
                navigate("/");
                onClose(); // Close popup on success
            }
        } catch (error) {
            console.error("Error during registration:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' placeholder='Name' ref={userNameRef} />
                    <Components.Input type='email' placeholder='Email' ref={signUpEmailRef} />
                    <Components.Input type='password' placeholder='Password' ref={signUpPasswordRef} />
                    <Components.Input type='password' placeholder='Confirm Password' ref={confirmPasswordRef} />
                    <Components.Input type='text' placeholder='Mobile' ref={mobileRef} />
                    <Components.Button type="submit" disabled={isLoading}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input type='email' placeholder='Email' ref={emailRef} />
                    <Components.Input type='password' placeholder='Password' ref={passwordRef} />
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button type="submit" disabled={isLoading}>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-600">X</button> {/* Close button */}
        </Components.Container>
    )
}

export default Login;
