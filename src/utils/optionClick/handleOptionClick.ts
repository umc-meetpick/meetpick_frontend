import foodProfileQuery from "../../assets/queries/foodProfileQuery";
import exerciseProfileQuery from "../../assets/queries/exerciseProfileQuery";
import studyProfileQuery from "../../assets/queries/studyProfileQuery";
import intervalQ from "../intervalQuestions";

interface OptionClick{
    option:string;
    type?: string;
    state:string;
    addMessage: (message: any) => void; 
    modalOpen?:boolean;
    setModalOpen?: (m:boolean)=>void;
    setModalOpenS?: (m:boolean)=>void;
    setModalOpenS2?: (m:boolean)=>void;
    setModalOpenD?: (m:boolean)=>void;
    currentQueryIndex: number
    setCurrentQueryIndex: (nextQueryIndex: number) => void;
    setChatDisable?: (m:boolean)=>void;
    nextOption:()=>void;
    setGender: (g:string)=>void;
    setStudentNum: (s:string)=>void;
    setMbtiList: (m:string[])=>void;
    mbtiList:string[];
    setOptionSelectEnd: (s:boolean) => void;
}
const handleOptionClick = ({option, type, state, addMessage, modalOpen,
    setModalOpen, setModalOpenS, setModalOpenS2, setModalOpenD, currentQueryIndex,
    setChatDisable, setCurrentQueryIndex, nextOption, setOptionSelectEnd,
    setGender, setStudentNum,  setMbtiList, mbtiList}: OptionClick): void => {
    const query = (state == "혼밥") ? foodProfileQuery : ((state == "운동") ? exerciseProfileQuery : studyProfileQuery)

    if (type == "gender" ){
        setGender(option);
        addMessage({ question: [option], direction: "outgoing" });
    }else if (type == "major" && option != "상관없어!"){
        setModalOpen?.(true); 
    }else if (type == "studentNum" && option != "상관없음"){
        setStudentNum(option);
        addMessage({ question: [option+"로 부탁해~"], direction: "outgoing" });
    }else if (type == "age" && option == "메이트 나이 설정하기"){
        setModalOpenS?.(true); 
    }else if (type == "mbti"){
        addMessage({ question: [option], direction: "outgoing" });
        if (option === "상관없어") {
            setOptionSelectEnd(true); 
            const nextQueryIndex = currentQueryIndex + 5;
            if (nextQueryIndex < query.length && !modalOpen) {
              setCurrentQueryIndex(nextQueryIndex);  
              setTimeout(() => {
                const questions = query[nextQueryIndex]?.question || [];
                intervalQ({ questions, setCurrentQueryIndex, nextQueryIndex, addMessage, setOptionSelectEnd });
              }, 100); 
            }
          }
    }else if (type?.includes("mbti") ) {
        setOptionSelectEnd(false);
        if (option == "상관없어!"){
            setMbtiList([...mbtiList, "x"]);
        }else{
            const mbtiMap: { [key: string]: string } = {
                EI: option === "활기찬" ? "E" : "I",
                SN: option === "현실적" ? "S" : "N",
                TF: option === "객관적" ? "T" : "F",
                JP: option === "체계적" ? "J" : "P",
            };
        
            const mbtiKey = type.split("-")[1]; 
            const mbtiValue = mbtiMap[mbtiKey];
            setMbtiList([...mbtiList, mbtiValue]);
        }
    }else if (type == "hobby" && option == "같으면 좋겠어"){
        //같을경우
        addMessage({ question: [option], direction: "outgoing" });
    } else if (type == "date"){
        setModalOpenD?.(true);
    }else if (type == "peopleNum"){
        setModalOpenS2?.(true); 
        setChatDisable?.(false);
    }
    else{
        addMessage({ question: [option], direction: "outgoing" });
    }
    
    if (!((type == "major" && option != "상관없어!") || 
        (type == "age" && option != "상관없어") || 
        type == "mbti" && option=="상관없어" ||
        type == "date" || type == "menu"|| type == "peopleNum")){
            nextOption();
    }
};

export default handleOptionClick;