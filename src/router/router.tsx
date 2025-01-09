import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage"
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import MatchingPage from "../pages/Matching";
import MyPage from "../pages/MyPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children:[
          {
            index:true,
            element:<HomePage/>
          },
          {
            path:'login',
            element:<Login/>
          },
          {
            path:'signup',
            element:<Signup/>
          },
          {
            path:'my',
            element:<MyPage/>
          },
          {
            path:'matching',
            element:<MatchingPage/>
          },
        ]
    }])
  
  export default router