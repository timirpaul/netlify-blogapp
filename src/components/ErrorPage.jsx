import React from 'react';
import { Card ,Box } from '@mui/material';

import ErrorIcon from '@mui/icons-material/Error';

const ErrorPage = () => {
    return (
        <>
            <Card sx={{
                maxWidth: '60%', margin: 'auto',textAlign:'center', mt: 12, padding: 2, boxShadow: '5px 5px 10px #ccc',
                ":hover": { boxShadow: '10px 20px 30px #ccc' }
            }}>
                <Box> <ErrorIcon/> 404 Error Page Not found </Box>
            </Card>
        </>
    );
}

export default ErrorPage;
