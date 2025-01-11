import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage"
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import MatchingPage from "../pages/Matching";
import MyPage from "../pages/MyPage";
import SetNickName from '../pages/setProfilePages/setNickname';
import SetImage from '../pages/setProfilePages/setImage';
import SetStudentNum from '../pages/setProfilePages/setStudentNum';
import SetMBTI from '../pages/setProfilePages/setMBTI';
import SetMajor from '../pages/setProfilePages/setMajor';
import SetHobby from '../pages/setProfilePages/setHobby';
import SetContect from '../pages/setProfilePages/setContect';

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
          {
            path:'setProfile/nickname',
            element:<SetNickName/>
          },
          {
            path:'setProfile/image',
            element:<SetImage/>
          },
          {
            path:'setProfile/studentNum',
            element:<SetStudentNum/>
          },
          {
            path:'setProfile/mbti',
            element:<SetMBTI/>
          },
          {
            path:'setProfile/major',
            element:<SetMajor/>
          },
          {
            path:'setProfile/hobby',
            element:<SetHobby/>
          },
          {
            path:'setProfile/contect',
            element:<SetContect/>
          }
        ]
    }])
  
  export default router