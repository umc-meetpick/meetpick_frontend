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
    detail5?:string;
    detail6?:string;
    gender: string;
    grade: string;
    time? :string;
    date?:string;
    exercise? :string;
  }
  
  export const ExerciserecommendData: RecommendDataType[] = [
    {
      requestId:1,
      category:"exercise",
      text1: "베티",
      text2: "#여성 #22살",
      text3:"#24학번 #ISFP",
      number1: "0",
      number2: "1",
      $backgroundColor: "#EEF5FD",
      width: "160px",
      color: "#5D5D5D",
      detail1: "⚽축구/풋살",
      detail2: "선배, 동기",
      detail3: "24살",
      detail4:"여성만",
      gender: "여성",
      grade: "20학번",
      time:"12:00",
      date:"토",
      exercise:"축구/풋살"
    },
    {
      requestId:2,
      category:"exercise",
      text1: "마음이 숭숭",
      text2: "#여성 #22살",
      text3: "#24학번 #ISFP",
      number1: "2",
      number2: "4",
      $backgroundColor: "#C0E5FF",
      width: "160px",
      color: "#5D5D5D",
      detail1: "🧗🏻‍♂️클라이밍",
      detail2: "선배",
      detail3: "24살",
      gender: "여성",
      grade: "24학번",
      time:"20:00",
      date:"수",
      exercise : "클라이밍"
    },
  ];
  