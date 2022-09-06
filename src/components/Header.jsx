import React from 'react'
import { AppBar, Button, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material'

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/redux";

const Header = () => {
    const dispath = useDispatch()

    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    console.log(isLoggedIn);

    const remove = ()=>{
        localStorage.removeItem("username") 
        localStorage.removeItem("userid")
    }

    return (
        <>
            <AppBar position='sticky'>
                <Toolbar>
                    
                    <Typography
                        variant='h4'
                        >
                        BlogsApp</Typography>
                        
                    <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
                        <Tabs
                            textColor="inherit"
                        >
                            <Tab LinkComponent={Link} to="/" label="HOME" />
                            
                            {isLoggedIn &&

                                <>
                                    <Tab LinkComponent={Link} to="/profile" label="Profile" />
                                    <Tab LinkComponent={Link} to="/addblog" label="AddBlog" />
                                </>
                            }

                        </Tabs>
                    </Box>
                    <Box display="flex" marginLeft='auto'>
                        {!isLoggedIn &&
                            <>
                                <Button
                                    LinkComponent={Link} to="/auth"
                                    variant='contained'
                                    sx={{ margin: 1, borderRadius: 10 }}
                                    color="warning">Login / Signup</Button>

                            </>
                        }
                        {isLoggedIn &&
                            <Button
                                onClick={() => dispath(authActions.logout()) && remove() }
                                LinkComponent={Link} to="/"
                                variant='contained'
                                sx={{ margin: 1, borderRadius: 10 }}
                                color="warning">Logout</Button>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header