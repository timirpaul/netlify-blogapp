import { Box, Card, Container, Typography } from "@mui/material";
import React from "react";

const Comments = ({ id, username, comment }) => {
    return (
        <>

            <Card sx={{
                maxWidth: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc',
                ":hover": { boxShadow: '10px 20px 30px #ccc' }
            }}>
                <Box>Comments</Box>
                <Container container  >
                    <Typography>username: {username}</Typography>
                    <Typography>comment: {comment}</Typography>
                </Container>
            </Card>
        </>
    )
}

export default Comments