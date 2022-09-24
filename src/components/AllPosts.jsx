import React, { useEffect, useState } from 'react';

import axios from "axios"

import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
import { Select ,MenuItem ,InputLabel ,Container} from '@mui/material';
import Pagination from './Pagination';




const AllPosts = () => {

    const apiURL = "https://blog-app-api-server.herokuapp.com/api"

    // const apiURL = "http://localhost:5000/api"

    const isLoggedIn = useSelector((state) => state.isLoggedIn)
   
    console.log(isLoggedIn);

    const [posts, setPosts] = useState([])
    const [iserror, setIserror] = useState("")

    //Category start
    const [Input,setInput] = useState('')


    const handleInputChange = (event) => {
        setInput({ ...Input, [event.target.name]: event.target.value })
    }

    let postCategory = Input.category ||'' ;
    
    console.log(postCategory);

   
    //Category end

    
    // pagination
    const [currentPage,setCurrentPage] = useState(1)
    const [postPerPage,setPostPerPage] = useState(5)    

    const lastPostIndex = currentPage * postPerPage 
    const firstPostIndex = lastPostIndex - postPerPage 

    const currentPost = posts.slice(firstPostIndex , lastPostIndex)
    

    const getApiData = async (url) => {
        try {
            const res = await axios.get(url)
            const resData = res.data

            resData.sort((a,b)=>{
                var keyA = new Date(a.createdAt) 
                var keyB = new Date(b.createdAt)
                if(keyA < keyB) return 1;
                if(keyA > keyB) return -1;
                return 0;
            })
            console.log(resData);

            setPosts(resData);
        } catch (error) {
            console.log(error);
            setIserror(error.message);

        }
    }


    useEffect(() => {
        getApiData(`${apiURL}/posts/allposts`)
    }, [])
    useEffect(() => {
        getApiData(`${apiURL}/posts/allposts/?category=${postCategory}`)
    }, [postCategory])

 


    return (
        <>
            <div >
                {
                    iserror !== '' ? <h1> {iserror}</h1>
                        :
                        <Container container  sx={{mt:2}} >
                           
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={Input.categories}
                                    
                                    name="category"
                                    onChange={handleInputChange}
                                > 
                                    <MenuItem value={""}>All Categories</MenuItem>
                                    <MenuItem value={"music"}>Music</MenuItem>
                                    <MenuItem value={"blog"}>Blog</MenuItem>
                                    <MenuItem value={"job"}>Job</MenuItem>
                                    <MenuItem value={"tech"}>Tech</MenuItem>
                                    <MenuItem value={"movies"}>Movies</MenuItem>
                                    <MenuItem value={"fashion"}>Fashion</MenuItem>
                                </Select>
                                

                           
                                {currentPost.map((posts, index) => (

                                    <BlogCard
                                        key={index}
                                        isUser={localStorage.getItem("username") === posts.username}
                                        id={posts._id}
                                        title={posts.title}
                                        username={posts.username}
                                        photo={posts.photo}
                                        description={posts.description}
                                        createdAt={new Date(posts.createdAt).toDateString()}
                                        updatedAt={new Date(posts.updatedAt).toDateString()}
                                        categories={posts.categories}

                                    />
 

                                ))}
                                <Pagination 
                                totalPosts={posts.length} 
                                postPerPage={postPerPage}
                                setCurrentPage={setCurrentPage}
                                />
                          

                        </Container>
                }
            </div>
        </>
    );
}

export default AllPosts;
