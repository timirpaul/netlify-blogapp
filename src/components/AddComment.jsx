import React ,{useState} from 'react';
import { Box, Button, Card, Container, TextField } from "@mui/material";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const AddComment = ({postId}) => {

            const apiURL = "https://blog-app-api-server.herokuapp.com/api"
        const imgAPIURL = "https://blog-app-api-server.herokuapp.com/images/"

        // const apiURL = "http://localhost:5000/api"
        // const imgAPIURL = "http://localhost:5000/images/"

        const navigate = useNavigate()

    const [input, setInput] = useState({
        comment:'',
        username:localStorage.getItem("username"),
        postId: postId
    })

    const handleInputChange =(event)=>{
        setInput({...input, [event.target.name]:event.target.value})
    }

    const sendRequest = async (url) => {
        // let url = `/posts`
        try {
            const res = await axios.post(url, {
                comment : input.comment ,
                username : input.username,
                postId : input.postId
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
           if(input.comment && input.username && input.postId){
            const res = await sendRequest(`${apiURL}/comment`)
            console.log(res.msg);
            window.alert(res.msg);
            navigate('/')

           }else { window.alert("Please Fill all data") }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Card sx={{
                maxWidth: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc',
                ":hover": { boxShadow: '10px 20px 30px #ccc' }
            }}>
                <Box sx={{maxWidth: "33%", margin:"auto",mt: 3,padding:5, }}>
                    
                    <TextField sx={{mt:2}} name='comment' label="Comment" onChange={handleInputChange} />

                    <Button sx={{margin:'auto', mt: 3 }} variant='contained' onClick={uploadPost} >Send</Button>


                </Box>
            </Card>
        </>
    );
}

export default AddComment;
