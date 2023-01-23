import React, { useEffect, useState } from 'react';

import axios from "axios"
import { useLocation, useNavigate, useParams } from 'react-router-dom';


import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Container, CardMedia, Typography, IconButton, Card } from '@mui/material';
import Comments from './Comments';
import AddComment from './AddComment';




const SinglePost = () => {
    const apiURL = "https://blogs-app-pwvr.onrender.com/api";
  const imgAPIURL = "https://blogs-app-pwvr.onrender.com/images/";
//     const apiURL = "https://blog-app-api-server.herokuapp.com/api"
//     const imgAPIURL = "https://blog-app-api-server.herokuapp.com/images/"

    // const apiURL = "http://localhost:5000/api"
    // const imgAPIURL = "http://localhost:5000/images/"

    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [iserror, setIserror] = useState("")

    const navigate = useNavigate()




    const { id } = useParams()
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
            navigate('/')

        }
    }


    const getApiComment = async (url) => {
        try {
            console.log(url);
            const res = await axios.get(url)
            const resData = res.data

            console.log(resData);

            setComments(resData);
        } catch (error) {
            console.log(url);
            console.log(error);
        }
    }

    useEffect(() => {
        getApiComment(`${apiURL}/comment/` + id)
    }, [])

    useEffect(() => {
        getApiData(`${apiURL}/posts/` + id)
    }, [])

    const handleEdit = (e) => {
        navigate(`/edit/${posts._id}`)
        console.log("edit fun ()");

    }
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${apiURL}/posts/${posts._id}`, { data: { username: posts.username } }) //use "{data:{}}"for send data backend 
            window.alert(res.data.msg)
            console.log(res.data.msg);
            // console.log(posts._id);
            // console.log(posts.username);
            navigate('/')
        } catch (error) {
            console.log(posts._id);
            console.log(posts.username);
            console.log(error);

            window.alert(error.response.data.msg)
        }

    }


    console.log(comments.length);
    return (
        <>
            <div >
                {
                    iserror !== '' ? <h1> {iserror}</h1>
                        :
                        <>
                            <Container maxWidth="sm" >
                                {isLoggedIn && posts.username === localStorage.getItem("username") &&
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
                                    image={imgAPIURL + posts.photo}
                                    alt="Post img"
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ paddingTop: 10 }}>
                                    <b> {posts.description} </b>

                                </Typography>



                            </Container>


                            {isLoggedIn &&

                                <AddComment
                                postId={id}
                                />

                            }

                        
                            
                            {comments.length === 0 ?
                            <Card sx={{
                                maxWidth: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc',
                                ":hover": { boxShadow: '10px 20px 30px #ccc' }
                            }}>
                            <Typography>No Comments</Typography> 
                            </Card>
                            :
                            comments.map((comments, index) => (
                                <Comments
                                    id={comments._id}
                                    username={comments.username}
                                    comment={comments.comment}
                                />

                            ))}
                            

                        </>

                }
            </div>
        </>
    );
}

export default SinglePost;



