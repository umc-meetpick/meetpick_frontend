interface IntervalType {
    questions: string[];
    setCurrentQueryIndex: (nextQueryIndex: number) => void;
    nextQueryIndex: number;
    addMessage: (message: any) => void; 
    setOptionSelectEnd?: (s:boolean) => void;
}

const intervalQ = async ({ questions, setCurrentQueryIndex, nextQueryIndex, addMessage, setOptionSelectEnd}: IntervalType) => {
    let currentIndex = 0;

    const interval = setInterval(() => {
        if (questions && currentIndex < questions.length) {
            if (currentIndex === questions.length - 1) {
                addMessage({
                    question: [questions[currentIndex]],
                    direction: "incoming",
                    type: "last"
                });
                setOptionSelectEnd?.(false);
            } else {
                addMessage({
                    question: [questions[currentIndex]],
                    direction: "incoming"
                });
            }

            currentIndex++;
        } else {
            clearInterval(interval);
            setOptionSelectEnd?.(false);
            setCurrentQueryIndex(nextQueryIndex); 
        }
    }, 700);
};

export default intervalQ;
