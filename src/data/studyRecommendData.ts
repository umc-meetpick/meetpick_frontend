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
    study? :string;
  }
  
  export const StudyrecommendData: RecommendDataType[] = [
    {
      requestId:1,
      category:"study",
      text1: "베티",
      text2: "#여성 #22살 #23학번",
      text3:"#소프트웨어학부",
      number1: "0",
      number2: "1",
      $backgroundColor: "#EEF5FD",
      width: "160px",
      color: "#5D5D5D",
      detail1: "교양",
      detail2: "음악과 종교",
      detail3: "여성만",
      detail4:"선배, 동기",
      detail5:"21~24살",
      gender: "여성",
      grade: "20학번",
      time:"16:00",
      date:"토",
      study:"교양"
    },
    {
      requestId:2,
      category:"study",
      text1: "마음이 쿵쿵",
      text2: "#여성 #21살 #23학번",
      text3: "#글로벌미디어학부",
      number1: "2",
      number2: "4",
      $backgroundColor: "#C0E5FF",
      width: "160px",
      color: "#5D5D5D",
      detail1: "전공",
      detail2: "알고리즘",
      detail3: "동기",
      gender: "여성",
      grade: "24학번",
      time:"18:00",
      date:"수",
      study:"전공"
    },
  ];
  