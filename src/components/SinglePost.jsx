import React, { useEffect, useState } from 'react';

import axios from "axios"
import { useLocation, useNavigate ,useParams } from 'react-router-dom';


import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box,Container, CardMedia, Typography ,IconButton } from '@mui/material';




const SinglePost = () => {


    const [posts, setPosts] = useState([])
    const [iserror, setIserror] = useState("")

    const navigate = useNavigate()
    const imgAddressBackend = "http://localhost:5000/images/"
    
    
    
    const {id} = useParams()
    console.log(id);
    
    // const location = useLocation()

    // const path = location.pathname
    // console.log(path);


    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    console.log(isLoggedIn);



    const getApiData = async (url) => {
        try {
            console.log(url);
            const res = await axios.get(url)
            const resData = res.data

            console.log(resData);

            setPosts(resData);
        } catch (error) {
            console.log(url);
            console.log(error);
            setIserror(error.message);

        }
    }
  

    useEffect(() => {
        getApiData('/posts/'+ id)
    }, [id])


    const handleEdit = (e) => {
        navigate(`/edit/${posts._id}`)
        console.log("edit fun ()");
        
    }
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/posts/${posts._id}` ,{data:{username:posts.username}}) //use "{data:{}}"for send data backend 
            window.alert(res.data.msg)
            navigate('/')
        } catch (error) {
            window.alert(error.response.data)
        }
        
    }



    return (
        <>
            <div >
                {
                    iserror !== '' ? <h1> {iserror}</h1>
                        :

                        <Container maxWidth="sm" >
                            {posts.username === localStorage.getItem("username") &&
                                <Box display='flex'>
                                    <IconButton onClick={handleEdit} sx={{ marginRight: "auto" }} >

                                        <EditIcon />
                                    </IconButton>

                                    <IconButton onClick={handleDelete} >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            }

                            <h2>{posts.title}</h2>
                            <Typography variant="body2" color="text.secondary">


                                <h3> {new Date(posts.updatedAt).toDateString()}</h3>
                                <h4>Category : {posts.categories}</h4>
                                <h3>Post by : {posts.username}</h3>
                            </Typography>

                            <CardMedia
                                sx={{ width: 600, height: 350 }}
                                component="img"
                                // height="294"
                                // width="144"
                                image={imgAddressBackend + posts.photo}
                                alt="Post img"
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ paddingTop: 10 }}>
                                <b> {posts.description} </b>

                            </Typography>




                        </Container>
                }
            </div>
        </>
    );
}

export default SinglePost;



