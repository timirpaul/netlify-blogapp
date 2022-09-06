import React , { useState } from 'react';
import {Box ,TextField,Button,styled} from '@mui/material';
import imgUrl from '../blog.png';


const problemLogin = () => {
    const Component = styled(Box)`
    width: 400px;
    
    margin:auto;
    margin-top:64px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6)
    `;
    const Img =styled("img")({
        width:"60%",
        margin:"auto",
        display:"flex",
        padding: '50px 0 0 '
    });
    const Wrapper = styled(Box)`
    padding: 25px 35px;
    
    display: flex;
    fex:1;
    flex-direction:column;
    & > div, & > button {
        margin-top: 20px
    }
    `;
    const initialState = {name:"",username:"",password:""}
    const [input, setInput] = useState({initialState})
    const [isLogin, setIsLogin] = useState(false)

    // let name,value ;
    // const handleInputChange =  (event) => {
    //     name = event.target.name;
    //     value = event.target.value;
    //      setInput({ ...input , [name] : value })

    //      console.log(event.target.value);
    //      console.log(event.target.name);
    //     }

    const handleInputChange = (event) =>{

        setInput({...input, [event.target.name] : event.target.value})
        console.log(event.target.value);
        console.log(event.target.name);

    }

const handleSubmit = () =>{
    console.log("submit");
}
    
    


    return (
        
        <Component>
            <form onSubmit={handleSubmit} >
            <Box>
                <Img src={imgUrl} alt="pic"/>
                <Wrapper>

                    {!isLogin && 
                    <TextField 
                    variant="outlined"
                    name="name" 
                    onChange={handleInputChange}
                    value={input.name} 
                    type={"name"}
                    placeholder='Name' 
                    />
                    }
                    <TextField
                     variant="outlined"
                     name='username' 
                     onChange={handleInputChange}
                     value={input.username} 
                     type={"username"}
                     placeholder='Username' 
                     />

                    <TextField 
                     variant="outlined" 
                     name="password"
                     onChange={handleInputChange}
                     value={input.password} 
                     type={"password"}
                     placeholder="password" 
                     />

                    <Button variant="contained" onClick={()=>{handleSubmit()}} >{isLogin ? "Login" : "SignUp"}</Button>

                    <Button 
                    onClick={()=> setIsLogin(!isLogin)}
                    >{!isLogin ? "Login" : "SignUp"}</Button>
                </Wrapper>  
            </Box>
            </form>
        </Component>

        
    );
}

export default problemLogin;
