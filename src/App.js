
import React from "react";

import { BrowserRouter , Route  ,Routes } from "react-router-dom"

import './app.css'
import { useSelector } from 'react-redux';

import Login from "./components/Login";
import AllPosts from "./components/AllPosts";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Myblogs from "./components/Myblogs";
import AddBlog from "./components/AddBlog";
import SinglePost from "./components/SinglePost";
import EditPost from "./components/EditPost";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";



const App = () => {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  
  return (
    <>
      <BrowserRouter>
        

        <Header/>
        
        <Routes>
        

        <Route exact path="/" element={<AllPosts/>} />
        <Route exact path="/auth" element={<Login/>} />
        <Route exact path="/profile" element={<Profile/>} />
        {/* <Route exact path="/profile/myblogs" element={<Myblogs/>} /> */}
        <Route exact path="/myblogs" element={<Myblogs/>} />
        <Route exact path="/addblog" element={<AddBlog/>} />
        
        
        <Route exact path="posts/:id" element={<SinglePost/>} />
        {/* <Route exact path="/profile/myblogs/edit/:id" element={<EditPost/>} /> */}
        <Route exact path="/edit/:id" element={<EditPost/>} />
        
        
        <Route exact path="/contact" element={<ContactUs/>} />
        <Route exact path="/about" element={<AboutUs/>} />
         
        <Route exact path="*" element={<ErrorPage/>} />
        </Routes>
        
        
        <Footer/>
        

        
         
      </BrowserRouter>


    </>
  );
}


export default App; 
