import { Box, Card, Container } from "@mui/material";
import React from "react";

const Comments = () => {
    return (
        <>
            <h3>Comments</h3>
            <Card sx={{
                maxWidth: '40%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc',
                ":hover": { boxShadow: '10px 20px 30px #ccc' }
            }}>
                <Container container  >
                    <Box>Comments</Box>
                    <p>mobkhgnfgbutnhbur</p>
                </Container>
            </Card>
        </>
    )
}

export default Comments