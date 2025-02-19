import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../context/useChatContext";
import foodProfileQuery from "../assets/queries/foodProfileQuery";
import exerciseProfileQuery from "../assets/queries/exerciseProfileQuery";
import studyProfileQuery from "../assets/queries/studyProfileQuery";

const FirstAndLast = (state:string) =>{
    const query = (state == "혼밥") ? foodProfileQuery : ((state == "운동") ? exerciseProfileQuery : studyProfileQuery)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasRun = useRef(false);
    const {messages, resetMessages, addMessage} = useChatContext();
    const navigate = useNavigate();

    useEffect(() => {
        const hasWaveEmoji = messages.some((msg) =>
            msg.question?.includes("👋")
        );
        if (hasWaveEmoji) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                resetMessages();
                console.log(state)
                navigate("/waitForMate",{state}); 
            }, 3000);
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [messages, navigate]);
    
    useEffect(() => {
        if (!hasRun.current) {
          hasRun.current = true; 
          const questions = query[0].question;
          let index = 0
          if (messages.length === 0) {
            const interval = setInterval(() => {
                if (questions && index < questions.length) {
                    if (index == questions.length-1){
                        addMessage({ 
                            question: [questions[index]], 
                            direction: "incoming",
                            type: "last"
                        });
                    }else{
                        addMessage({ 
                            question: [questions[index]], 
                            direction: "incoming" 
                        });
                    }
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 500);
          }
        }
      }, [messages, addMessage, query]);
}
export default FirstAndLast;