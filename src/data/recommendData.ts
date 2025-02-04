export interface RecommendDataType {
  id:number;
  text1: string;
  text2: string;
  text3:string;
  number1: string;
  number2: string;
  $backgroundColor: string;
  width: string;
  color: string;
  detail1?: string;
  detail2?: string;
  detail3?: string;
  detail4?: string;
  gender: string;
  grade: string;
  time? :string;
  date?:string;
  food? :string;
}

export const recommendData: RecommendDataType[] = [
  {
    id:1,
    text1: "베티",
    text2: "#여성 #22살",
    text3:"#24학번 #ISFP",
    number1: "0",
    number2: "1",
    $backgroundColor: "#EEF5FD",
    width: "160px",
    color: "#5D5D5D",
    detail1: "한식",
    detail2: "여성만",
    detail3: "23~25살",
    gender: "여성",
    grade: "20학번",
    time:"16:00",
    date:"토",
    food:"한식"
  },
  {
    id:2,
    text1: "마음이 숭숭",
    text2: "#여성 #22살",
    text3: "#24학번 #ISFP",
    number1: "2",
    number2: "4",
    $backgroundColor: "#C0E5FF",
    width: "160px",
    color: "#5D5D5D",
    detail1: "여성만",
    detail2: "선배",
    detail3: "24살",
    gender: "여성",
    grade: "24학번",
    time:"18:00",
    date:"수",
    food : "양식"
  },
  {
    id:3,
    text1: "제이든",
    text2: "#남성 #27살",
    text3:"#18학번 #ESTP",
    number1: "0",
    number2: "3",
    $backgroundColor: "#C0E5FF",
    width: "160px",
    color: "#5D5D5D",
    detail1: "한식, 양식, 중식, 베트남식",
    detail2: "25~28살",
    detail3: "선배, 동기, 후배",
    gender: "남성",
    grade: "18학번",
    time : "20:00",
    date: "화",
    food: "중식"
  },
  {
    id:4,
    text1: "디아",
    text2: "#여성 #23살",
    text3:"#22학번 #ISTP",
    number1: "2",
    number2: "6",
    $backgroundColor: "#EEF5FD",
    width: "160px",
    color: "#5D5D5D",
    detail1: "베트남식",
    detail2: "여성만",
    detail3: "선배, 동기",
    detail4: "20~21살",
    gender: "여성",
    grade: "23학번",
    time:"13:00",
    date:"월",
    food :"베트남식"
  },
  {
      id:5,
      text1: "베티",
      text2: "#여성 #22살",
      text3: "#24학번 #ISFP",
      number1: "4",
      number2: "5",
      $backgroundColor: "#EEF5FD",
      width: "160px",
      color: "#5D5D5D",
      detail1: "한식, 베트남식",
      detail2: "여성만",
      detail3: "23~25살",
      gender: "여성",
      grade: "20학번",
      time:"13:00",
      date:"목",
      food:"한식"
    },
    {
      id:6,
      text1: "미기",
      text2: "#여성 #23살",
      text3: "#23학번 #ESFJ",
      number1: "1",
      number2: "3",
      $backgroundColor: "#C0E5FF",
      width: "160px",
      color: "#5D5D5D",
      detail1: "한식",
      detail2: "여성만",
      detail3: "23~25살",
      gender: "남성",
      grade: "23학번",
      time:"11:00",
      date:"수",
      food: "한식"
    },
    {
      id:7,
      text1: "피기",
      text2: "#남성 #26살",
      text3: "#18학번 #ESTP",
      number1: "2",
      number2: "8",
      $backgroundColor: "#C0E5FF",
      width: "160px",
      color: "#5D5D5D",
      detail1: "한식, 일식",
      detail2:"남성만",
      gender: "남성",
      grade: "19학번",
      time:"19:00",
      date:"금",
      food: "일식"
    },
];
