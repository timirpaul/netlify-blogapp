import React from 'react';
import { Box, Button, Card, Tab } from '@mui/material';
import { Link , useNavigate} from 'react-router-dom'



const Footer = () => {
    const navigate = useNavigate()
    return (
        <>
            <Card sx={{
                maxWidth: '100%', margin: 'auto', textAlign: 'center', mt: 2, padding: 2

            }}>
                <Tab LinkComponent={Link} to="/about" label="ABOUT US" />
                <Button variant='contained'
                    onClick={() => { navigate("/contact") }}
                >Contact Us</Button>
                <Box> BlogApp || Post your own Blog  </Box>
            </Card>
        </>
    );
}

export default Footer;
