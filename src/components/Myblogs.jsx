
import React, { useEffect, useState } from 'react';

import axios from "axios"

import BlogCard from './BlogCard';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material'
import Pagination from './Pagination';
;

const Myblogs = () => {
    const apiURL = "https://blog-app-api-server.herokuapp.com/api"

    // const apiURL = "http://localhost:5000/api"

    const username = localStorage.getItem("username")



    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    console.log(isLoggedIn);

    const [posts, setPosts] = useState([])
    const [iserror, setIserror] = useState("")
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
        getApiData(`${apiURL}/posts/allposts/?username=${username}`)
    }, [username])



    return (
        <>
            <div >
                {
                    iserror !== '' ? <h1> {iserror}</h1>
                        :
                        <Container container  >

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

export default Myblogs;
