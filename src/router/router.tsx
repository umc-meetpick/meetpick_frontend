import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage"
import LookingMate from '../pages/LookingMate';
import NotFound from "../pages/NotFound"
import Login from "../pages/Login"
import Signup from "../pages/signupPages/Signup"
import MatchingPage from "../pages/Matching";
import MyPage from "../pages/MyPage";
import ViewRequest from "../pages/ViewRequest"
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
import FoodApplication from "../pages/applicationPages/foodApplication";
import Alarm from '../pages/alarmPages/alarm';
import Modify from "../pages/modifyPages/Modify";
import FoodRecommend from "../pages/recommendPages/FoodRecommend";
import FoodMateProfile from '../pages/mateProfilePages/FoodMateProfile';
import WaitForMate from "../pages/mateProfilePages/WaitForMate";
import ExerciseRecommend from "../pages/recommendPages/ExerciseRecommend";
import ExerciseApplication from "../pages/applicationPages/exerciseApplication";
import ExerciseMateProfile from "../pages/mateProfilePages/ExerciseMateProfile";
import StudyRecommend from "../pages/recommendPages/StudyRecommend";
import StudyApplication from "../pages/applicationPages/studyApplication";
import StudyMateProfile from "../pages/mateProfilePages/StudyMateProfile";
import LikePage from "../pages/Likepage";


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
            path:'viewRequest',
            element:<ViewRequest/>
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
            element:<SetImage/>,
        
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
          },
          {
            path:'application/food/:requestId',
            element:<FoodApplication/>
          },
          {
            path:'application/exercise/:requestId',
            element:<ExerciseApplication/>
          },
          {
            path:'application/study/:requestId',
            element:<StudyApplication/>
          },
          {
            path:'alarm',
            element:<Alarm/>
          },
          {
            path:'modify',
            element:<Modify/>
          },
          {
            path:'recommend/food',
            element:<FoodRecommend/>
          },
          {
            path:'recommend/exercise',
            element:<ExerciseRecommend/>
          },
          {
            path:'recommend/study',
            element:<StudyRecommend/>
          },
          {
            path:'foodMateProfile',
            element:<FoodMateProfile/>
          },
          {
            path:'exerciseMateProfile',
            element:<ExerciseMateProfile/>
          },
          {
            path:'studyMateProfile',
            element:<StudyMateProfile/>
          },
          {
            path:'waitForMate',
            element:<WaitForMate/>
          },
          {
            path:'LikePage',
            element:<LikePage/>
          }
        ]
    }])
  
  export default router