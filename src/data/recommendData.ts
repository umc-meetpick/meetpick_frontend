export interface RecommendDataType {
  requestId:number;
  category:string;
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
    requestId:1,
    category:"food",
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
    requestId:2,
    category:"food",
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
    requestId:3,
    category:"food",
    text1: "미기피기",
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
  }
];
