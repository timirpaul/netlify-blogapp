import { Button } from '@mui/material';
import React from 'react';

const Pagination = ({totalPosts,postPerPage,setCurrentPage}) => {

    let pages = []

    for(let i =1 ; i<= Math.ceil(totalPosts/postPerPage ); i++){
        pages.push(i)
    }
    // console.log(pages);
    return (
        <div>
            
            {
                pages.map((page , index)=>{
                    return(
                        <Button key={index} onClick={()=>setCurrentPage(page)} >{page}</Button>
                    )
                })
            }
           
        </div>
    );
}

export default Pagination;
