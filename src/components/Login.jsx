import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../store/redux";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    console.log(isLoggedIn);



    const [input, setInput] = useState({
        name: "", email: "", password: ""
    })
    const [isSignup, setIsSignup] = useState(false)




    const handleInputChange = (event) => {

        setInput({ ...input, [event.target.name]: event.target.value })
        console.log(event.target.value);
        console.log(event.target.name);

    }


    const sendRequest = async (type = '/login') => {
        const url = `${type}`
        try {
            const res = await axios.post(url, {
                name: input.name,
                email: input.email,
                password: input.password
            })

            const resdata = await res.data
            // console.log(resdata);
            return resdata;

        } catch (error) {
            console.log(error);
            window.alert(error.message);
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {

            if (isSignup) {
                const res = await sendRequest("/signup")
                if (res) {
                    // localStorage.setItem("username", res.user.name)
                    window.alert(res.msg)

                    navigate("/auth")
                    console.log(res)

                }


            } else {
                const res = await sendRequest()
                if (res) {
                    localStorage.setItem("username", res.user.name)
                    localStorage.setItem("userid", res.user._id)
                    window.alert(res.msg)
                    console.log(res)
                    dispatch(authActions.login())


                    navigate("/")
                }
            }
        } catch (error) {

            console.log(error);
        }
    }



    return (
        <div>
            <form action="" onSubmit={handleSubmit} >
                <Box
                    maxWidth={400}
                    display="flex"
                    flexDirection={'column'}
                    alignItems='center'
                    justifyContent={'center'}
                    boxShadow="10px 10px 20px #acc"
                    padding={3}
                    margin='auto'
                    marginTop={5}
                    borderRadius={5}
                >
                    <Typography variant="h2"
                        padding={3}
                        textAlign="center"
                    >{!isSignup ? "Login" : "Signup"}</Typography>
                    {isSignup &&
                        <TextField
                            name="name"
                            onChange={handleInputChange}
                            value={input.name}
                            type={"name"}
                            placeholder="Name"
                            margin="normal" />
                    }
                    <TextField
                        name="email"
                        onChange={handleInputChange}
                        value={input.email}
                        type={"email"}
                        placeholder="Email"
                        margin="normal" />

                    <TextField
                        name="password"
                        onChange={handleInputChange}
                        value={input.password}
                        type={"password"}
                        placeholder="Password"
                        margin="normal" />

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        color="warning"
                    >{!isSignup ? "Login" : "SignUp"}</Button>

                    <Button
                        onClick={() => setIsSignup(!isSignup)}
                        sx={{ borderRadius: 3, marginTop: 3 }} >Change To {isSignup ? "Login" : "Signup"}</Button>

                </Box>
            </form>
        </div>
    );
}

export default Login;
