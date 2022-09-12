import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import axios from 'axios'
import {  Container ,CardContent ,Typography, Card, Button} from '@mui/material'


import { useNavigate } from 'react-router-dom';



const Profile = () => {
    const apiURL = "https://blog-app-api-server.herokuapp.com/api"

    // const apiURL = "http://localhost:5000/api"

    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    console.log(isLoggedIn);

    const navigate = useNavigate()

    const userid = localStorage.getItem("userid")



    const [user, setUser] = useState('')
    const [iserror, setIserror] = useState("")

    const getApiData = async (url) => {
        try {
            const res = await axios.get(url)
            const resData = res.data

            console.log(resData);

            setUser(resData);
        } catch (error) {
            console.log(error);
            setIserror(error.message);

        }
    }
    useEffect(() => {
        getApiData(`${apiURL}/users/` + userid)
    }, [userid])

    return (
        <>
            {/* <Container>
                <Tab LinkComponent={Link} to="/profile/myblogs" label="MyBlogs" />
                <h1>Profile</h1>
            </Container> */}
            {isLoggedIn === false ? navigate("/auth")
                :
                <div >
                    {
                        iserror !== '' ? <h1> {iserror}</h1>
                            :
                            <Card sx={{
                                maxWidth: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc',
                                ":hover": { boxShadow: '10px 20px 30px #ccc' }
                            }}>
                            <Container container  >


                                {/* <Tab LinkComponent={Link} to="/profile/myblogs" label="MyBlogs" /> */}
                                <Button variant='contained'
                                onClick={()=>{navigate("/myblogs")}}
                                >MyBlogs</Button>
                                
                                <CardContent>
                                <h1>Profile Details</h1>
                                    <Typography variant="body2" color="text.secondary">
                                        <h2>Name : {user.name}</h2>
                                        <h3>Email : {user.email}</h3>
                                    </Typography>
                                </CardContent>
                                

                            </Container>
                            </Card>
                    }
                </div>
            }

        </>
    )
}

export default Profile