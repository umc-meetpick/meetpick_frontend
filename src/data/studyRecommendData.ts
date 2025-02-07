export interface RecommendDataType {
    id:number;
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
      id:1,
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
      id:2,
      category:"study",
      text1: "마음이 숭숭",
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
    {
      id:3,
      category:"study",
      text1: "제이든",
      text2: "#남성 #24살 #24학번",
      text3:"#건축학부",
      number1: "0",
      number2: "3",
      $backgroundColor: "#C0E5FF",
      width: "160px",
      color: "#5D5D5D",
      detail1: "교양",
      detail2: "책과 글쓰기",
      detail3: "여성만",
      detail4:"25~26살",
      gender: "남성",
      grade: "18학번",
      time : "20:00",
      date: "화",
      study:"교양"
    },
    {
      id:4,
      category:"study",
      text1: "디아",
      text2: "#여성 #23살 #23학번",
      text3:"#AI융합학부",
      number1: "2",
      number2: "6",
      $backgroundColor: "#EEF5FD",
      width: "160px",
      color: "#5D5D5D",
      detail1: "자격증",
      detail2: "OPIC(오픽)",
      detail3: "선배, 동기",
      detail4: "23살~28살",
      gender: "여성",
      grade: "23학번",
      time:"13:00",
      date:"월",
      study:"자격증"
    },
    {
        id:5,
        category:"study",
        text1: "베티",
        text2: "#여성 #27살 #18학번",
        text3: "#생명공학과",
        number1: "4",
        number2: "5",
        $backgroundColor: "#EEF5FD",
        width: "160px",
        color: "#5D5D5D",
        detail1: "교양",
        detail2: "합창과 악보",
        detail3: "남성만",
        detail4:"선배, 동기",
        gender: "여성",
        grade: "20학번",
        time:"13:00",
        date:"목",
        study:"교양"
      },
      {
        id:6,
        category:"study",
        text1: "미기",
        text2: "#여성 #20살 #26학번",
        text3: "#식품공학과",
        number1: "1",
        number2: "3",
        $backgroundColor: "#C0E5FF",
        width: "160px",
        color: "#5D5D5D",
        detail1: "교양",
        detail2: "음악과 종교",
        detail3: "여성만",
        detail4:"선배, 동기",
        gender: "남성",
        grade: "23학번",
        time:"11:00",
        date:"수",
        study:"교양"
      },
      {
        id:7,
        category:"study",
        text1: "피기",
        text2: "#남성 #26살 #20학번",
        text3: "#영어영문학과",
        number1: "2",
        number2: "8",
        $backgroundColor: "#C0E5FF",
        width: "160px",
        color: "#5D5D5D",
        detail1: "자격증",
        detail2:"SQLD",
        gender: "남성",
        grade: "19학번",
        time:"19:00",
        date:"금",
        study:"자격증"
      },
  ];
  