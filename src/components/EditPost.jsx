import React, { useEffect, useState } from 'react';
import { Box, Button, styled, FormControl, Typography,  TextField, TextareaAutosize, Select, MenuItem, Card } from '@mui/material';

import axios from 'axios';
import { useNavigate ,useParams } from "react-router-dom";


const labelStyles = { mb: 1, mt: 2, fontSize: '24px', fontWeight: 'bold', flex: '1' }
const Container = styled(Box)` margin: 50px 100px`

const StyledFromControl = styled(FormControl)`
    margin-top: 10px ;
    display: flex;
    flex-direction: column;
    
`
const TextArea = styled(TextareaAutosize)`
    width: 100% ;
    margin-top: 50px ;
    border: none ;
`


const EditPost = () => {
    const apiURL = "https://blogs-app-pwvr.onrender.com/api";
//            const apiURL = "https://blog-app-api-server.herokuapp.com/api"

        //    const apiURL = "http://localhost:5000/api"
    const {id} = useParams()
    console.log(id);

    const navigate = useNavigate()

    const [iserror, setIserror] = useState("")


    

    const [post, setPost] = useState({
        title: '',
        description: '',
        photo: '',
        categories: '',
        username: localStorage.getItem("username")
    })

    const getApiData = async (url) => {
        try {
            console.log(url);
            const res = await axios.get(url)
            const resData = res.data

            console.log(resData);

            setPost(resData);
        } catch (error) {
            console.log(url);
            console.log(error);
            setIserror(error.message);

        }
    }
    useEffect(()=>{
        getApiData(`${apiURL}/posts/`+ id )
    },[id])
    

    const handleInputChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }


    const sendRequest = async (url) => {
        console.log(url);
        try {
            const res = await axios.put(url, {
                title: post.title,
                description: post.description,
                categories: post.categories,
                photo: post.photo,
                username: post.username
            })
            const resdata = await res.data

            return resdata;
        } catch (error) {
            console.log(error);
            window.alert(error.response.data.msg);
        }
    }

    const uploadPost = async (e) => {
        e.preventDefault()

        try {

            if (post.title && post.description  && post.categories && post.username) {

            const res = await sendRequest(`${apiURL}/posts/`+ id)

            console.log(res.updatedPost);
            

            navigate(`/posts/${id}`)
        }else{window.alert("Please Fill all data")}
        } catch (error) {
            console.log(error);
        }

    }
    console.log(post);

    return (
        <>
        <Card sx={{
            maxWidth: '50%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc',
            ":hover": { boxShadow: '10px 20px 30px #ccc' }
        }}>
        <Container>
            <Typography fontWeight={'bold'}
                padding={3}
                color="grey"
                variant="h4"
                textAlign={"center"}>

                Write Your Post
            </Typography>
            {/* <img src={url} alt="post" /> */}
            <StyledFromControl>

    
                
                <TextField sx={labelStyles} name="title" label="Title"
                    onChange={handleInputChange} value={post.title} />

                <label id="demo-simple-select-label">Categories</label>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={post.categories}
                    label="Categories"
                    name="categories"
                    onChange={handleInputChange}
                >
                    <MenuItem value={"music"}>Music</MenuItem>
                    <MenuItem value={"blog"}>Blog</MenuItem>
                    <MenuItem value={"job"}>Job</MenuItem>
                    <MenuItem value={"tech"}>Tech</MenuItem>
                    <MenuItem value={"movies"}>Movies</MenuItem>
                    <MenuItem value={"fashion"}>Fashion</MenuItem>
                </Select>



                <TextArea  name="description" placeholder="Description"
                    onChange={handleInputChange} value={post.description} />

                <Button sx={labelStyles} variant='contained' onClick={uploadPost}>Upload Post </Button>


            </StyledFromControl>
        </Container>
        </Card>
        
        </>
    );
}

export default EditPost;
