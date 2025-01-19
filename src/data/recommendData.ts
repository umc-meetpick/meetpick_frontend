export interface RecommendDataType {
    text1: string;
    text2: string;
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
  }
  
  export const recommendData: RecommendDataType[] = [
    {
      text1: "베티",
      text2: "#여성 #23살 #20학번",
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
    },
    {
      text1: "마음이 숭숭",
      text2: "#여성 #22살 #24학번",
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
    },
    {
      text1: "제이든",
      text2: "#남성 #27살 #18학번",
      number1: "0",
      number2: "3",
      $backgroundColor: "#EEF5FD",
      width: "160px",
      color: "#5D5D5D",
      detail1: "한식, 양식, 중식",
      detail2: "25~28살",
      gender: "남성",
      grade: "18학번",
    },
    {
      text1: "탱",
      text2: "#여성 #23살 #23학번",
      number1: "2",
      number2: "6",
      $backgroundColor: "#C0E5FF",
      width: "160px",
      color: "#5D5D5D",
      detail1: "베트남식",
      detail2: "여성만",
      detail3: "선배, 동기",
      detail4: "20~21살",
      gender: "여성",
      grade: "23학번",
    },
    {
        text1: "밍밍",
        text2: "#여성 #26살 #20학번",
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
      },
      {
        text1: "미기",
        text2: "#남성 #23살 #23학번",
        number1: "1",
        number2: "3",
        $backgroundColor: "#EEF5FD",
        width: "160px",
        color: "#5D5D5D",
        detail1: "한식",
        detail2: "여성만",
        detail3: "23~25살",
        gender: "남성",
        grade: "23학번",
      },
      {
        text1: "피기",
        text2: "#남성 #26살 #19학번",
        number1: "2",
        number2: "8",
        $backgroundColor: "#EEF5FD",
        width: "160px",
        color: "#5D5D5D",
        detail1: "한식, 일식",
        gender: "남성",
        grade: "19학번",
      },
  ];
  