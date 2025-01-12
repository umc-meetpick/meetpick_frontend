import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage"
import LookingMate from '../pages/LookingMate';
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import Signup from "../pages/signupPages/Signup"
import MatchingPage from "../pages/Matching";
import MyPage from "../pages/MyPage";
import Signup1 from '../pages/signupPages/Signup1';
import Signup2 from '../pages/signupPages/Signup2';
import Signup3 from '../pages/signupPages/Signup3';
import SetNickName from '../pages/setProfilePages/setNickname';
import SetImage from '../pages/setProfilePages/setImage';
import SetStudentNum from '../pages/setProfilePages/setStudentNum';
import SetMBTI from '../pages/setProfilePages/setMBTI';
import SetMajor from '../pages/setProfilePages/setMajor';
import SetHobby from '../pages/setProfilePages/setHobby';
import SetContact from '../pages/setProfilePages/setContact';

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
            path:'looking',
            element:<LookingMate/>
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
            path:'signup1',
            element:<Signup1/>
          },
          {
            path:'signup2',
            element:<Signup2/>
          },
          {
            path:'signup3',
            element:<Signup3/>
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
            path:'setProfile/contact',
            element:<SetContact/>
          }
        ]
    }])
  
  export default router