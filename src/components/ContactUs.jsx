import React , { useState} from 'react';
import { Card, TextField, Typography ,Box, Button} from '@mui/material';
import axios from "axios"

import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
       const apiURL = "https://blog-app-api-server.herokuapp.com/api"

    //    const apiURL = "http://localhost:5000/api"

    const navigate = useNavigate()

    const [contact, setContact] = useState({
        name:'',
        email:'',
        msg:''
    })
 
    const handleInputChange =(event)=>{
        setContact({...contact, [event.target.name]:event.target.value})
    }
    const sendRequest = async (url) => {
        console.log(url);
        try {
            const res = await axios.post(url, {
                name : contact.name,
                email : contact.email,
                msg : contact.msg
            })
            const resdata = await res.data

            return resdata;
        } catch (error) {
            console.log(error);
            window.alert(error.message);
        }
    }

    const uploadContact = async (e)=>{
        e.preventDefault()
        if(contact.name && contact.email && contact.msg){
            try {

                const res = await sendRequest(`${apiURL}/contact`)
            console.log(res);
            if(res){
                window.alert("Your Message send successfully")
                navigate("/")
            }
            
            } catch (error) {
                window.alert("Error ")
            }
            
        }else{
            window.alert("Plz Fill All Details")
        }
    }
    console.log(contact);
    return (
        <>
            <Card sx={{
                maxWidth: '50%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc',
                ":hover": { boxShadow: '10px 20px 30px #ccc' }
            }}>

                <Typography sx={{textAlign:"center"}} >CONTACT US</Typography>
                <Box sx={{maxWidth: "33%", margin:"auto",mt: 3,padding:5, }}>
                    <TextField sx={{mt:2}} name='name' label="Name" onChange={handleInputChange} />
                    <TextField sx={{mt:2}} name='email' label="Email" onChange={handleInputChange} />
                    <TextField sx={{mt:2}} name='msg' label="Message" onChange={handleInputChange} />

                    <Button sx={{margin:'auto', mt: 3 }} variant='contained' onClick={uploadContact}>Send</Button>


                </Box>
            </Card>
        </>
    );
}

export default ContactUs;
