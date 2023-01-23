import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


const BlogCard = ({ id, title, description, username, categories, createdAt, photo, isUser }) => {
        const apiURL = "https://blogs-app-pwvr.onrender.com/api";
  const imgAPIURL = "https://blogs-app-pwvr.onrender.com/images/";
//         const apiURL = "https://blog-app-api-server.herokuapp.com/api"
//         const imgAPIURL = "https://blog-app-api-server.herokuapp.com/images/"

        // const apiURL = "http://localhost:5000/api"
        // const imgAPIURL = "http://localhost:5000/images/"

    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    
    console.log(isLoggedIn);

    const navigate = useNavigate()
    console.log(isUser);
    const handleEdit = (e) => {
        navigate("/edit/"+ id)
    }
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${apiURL}/posts/${id}` ,{data:{username:username}}) //use "{data:{}}"for send data backend 
            window.alert(res.data.msg)
            navigate('/myblogs')     
        } catch (error) {
            console.log(error);
            window.alert(error.response.data.msg)
        }
    }
    const handleRead = (e)=>{
        navigate('/posts/'+id)
    }
    return (
        <>
            <Card sx={{
                maxWidth: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc',
                ":hover": { boxShadow: '10px 20px 30px #ccc' }
            }}>
                {/* delete and update */}
                {isUser && isLoggedIn && (
                    <Box display='flex'>
                        <IconButton onClick={handleEdit} sx={{ marginRight: "auto" }} >

                            <EditIcon />
                        </IconButton>

                        <IconButton onClick={handleDelete} >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
                            { }
                        </Avatar>
                    }

                    title={title}
                    subheader={createdAt}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={imgAPIURL + photo}
                    alt="Post img"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <b> {description} </b>
                        
                        <Button onClick={handleRead} >
                            Read More
                        </Button>
                        
                        <h4>Category : {categories}</h4>
                        <h3>Post by : {username}</h3>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default BlogCard
