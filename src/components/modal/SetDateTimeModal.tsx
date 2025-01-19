import styled from "styled-components";
import { LuDot } from "react-icons/lu";
import { BsXCircleFill } from "react-icons/bs";
import { useState, useContext } from "react";
import { FoodProfileInfoContext } from "../../context/foodProfileInfo";

interface SetDateTimeModalProps {
    title: string;
    setModalOpen: (isOpen: boolean) => void;
}
interface Selected {
    [key: string]: string[]; // 키는 string, 값은 string[] 배열
}

const SetDateTimeModal: React.FC<SetDateTimeModalProps> = ({title, setModalOpen}) =>{
    const { dateTime, setDateTime } = useContext(FoodProfileInfoContext);
    const [selectedDate, setSelectedDate] = useState("");
    const [selected, setSelected] = useState<{ [key: string]: string[] }>({});
    const dates = ["월", "화", "수", "목", "금"];
    const lunchTimes = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]
    const dinnerTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
    
    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        setSelected((prev) => {
            if (prev[date]) {
                return prev; 
            }
            const newSelected = { ...prev, [date]: [] };
            const sortedSelected = Object.keys(newSelected)
                .sort((a, b) => dates.indexOf(a) - dates.indexOf(b))
                .reduce<Selected>((acc, key) => {
                    acc[key] = newSelected[key];
                    return acc;
                }, {} as Selected);

            return sortedSelected;
        });
    };

    const handleTimeClick = (date: string, time: string) => {
        if (!selected[date]) return; 

        setSelected((prev) => {
            const times = prev[date];
            if (times.includes(time)) {
                return {
                    ...prev,
                    [date]: times.filter((t) => t !== time),
                };
            }
            return {
                ...prev,
                [date]: [...times, time],
            };
        });
    };

    const handleSend = () =>{
        setDateTime({...dateTime, ...selected});
        console.log(dateTime)
        setModalOpen(false);
    }
    return(
        <Background>
            <Container>
                <Title>{title}</Title>
                <InputWrapper>
                    <SubTitle>요일</SubTitle>
                    <Date>
                        {dates.map((date) => (
                            <Box 
                                key={date} 
                                onClick={()=>handleDateClick(date)}
                                $isSelected={date == selectedDate}
                            >
                                {date}
                            </Box>
                        ))}
                    </Date>
                    <hr/>
                    <SubTitle>점심</SubTitle>
                    <Time>
                        {lunchTimes.map((lunchTime) => (
                            <Box2 
                                key={lunchTime} 
                                onClick={()=>handleTimeClick(selectedDate, lunchTime)}
                                $isSelected={selected[selectedDate]?.includes(lunchTime)|| false}
                            >
                                {lunchTime}
                            </Box2>
                        ))}
                    </Time>
                    <SubTitle>저녁</SubTitle>
                    <Time>
                        {dinnerTimes.map((dinnerTime) => (
                            <Box2 
                                key={dinnerTime} 
                                onClick={()=>handleTimeClick(selectedDate, dinnerTime)}
                                $isSelected={selected[selectedDate]?.includes(dinnerTime)|| false}
                            >
                                {dinnerTime}
                            </Box2>
                        ))}
                    </Time>
                </InputWrapper>
                { selectedDate && 
                    <Selected>
                        <div>선택한 요일 및 시간정보</div>
                        {Object.entries(selected)?.map(([date, time]) => (
                            <SelectedContent key={date}>
                                <Div>
                                    <LuDot size={20} style={{ color: '#606366', marginTop:'5px' }} />
                                    <div>{date}: {time.join(", ")}</div>
                                </Div>
                                <BsXCircleFill 
                                    style={{ color: '#C2C5CC', marginTop:'8px' }}
                                    onClick={() => {
                                        setSelected(prev => {
                                            const newSelected = { ...prev }; 
                                            delete newSelected[date];
                                            return newSelected; 
                                        });
                                    }}
                                />
                            </SelectedContent>
                        ))}
                    </Selected>
                }
                <Btn 
                    onClick={handleSend}
                    disabled={!(selected[selectedDate]?.length > 0)}
                >
                    {selectedDate && selected[selectedDate].length > 0  ? "선택 완료" : "요일과 시간을 선택해주세요"  }
                </Btn>
            </Container>
        </Background>
    )
}
export default SetDateTimeModal;

const Background = styled.div`
    width:100%;
    max-width:393px;
    height: 100%;
    background-color:rgba(0,0,0,0.2);
    position: fixed;
    top: 0;
    left: 0;
`;
const Container = styled.div`
    width: calc(100vw); 
    max-width: 393px; 
    height: calc(100vh - 150px);
    border: 1px solid white;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    bottom: 75px;
    overflow-y: auto;
    border-radius: 30px 30px 0 0;
`;
const InputWrapper = styled.div`
    width: 80%;
    height: 450px;
    color: #636363;
    margin-bottom: 20px;
`;
const Title= styled.div`
    margin-top: 30px;
    margin-bottom:30px;
    height:30px;
    font-size:17px;
    font-weight:500;
    color:#000000;
`;
const SubTitle = styled.div`
    margin-top:20px;
    margin-bottom:10px;
`;
const Date = styled.div`
    display:flex;
    justify-content: space-between;
    font-size:14px;
`;
const Time = styled.div`
    display:grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: repeat(2, auto); 
    gap:10px;
    margin-bottom:10px;
    font-size:14px;
`;
const Box =  styled.button<{$isSelected:boolean}>`
    width: 40px;
    height:40px;
    display:flex;
    justify-content: center;
    border:${({$isSelected})=> $isSelected ? "1px solid #007AFF" : "1px solid #E7E7E7"};
    background-color: ${({$isSelected}) => $isSelected ? "#EFF3FE" : "white"};
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1); 
    margin-bottom:10px;
    &:focus {
        outline: none; 
    }
`;
const Box2 =  styled.button<{$isSelected:boolean}>`
    width: 80px;
    height:40px;
    display:flex;
    justify-content: center;
    border:${({$isSelected})=> $isSelected ? "1px solid #007AFF" : "1px solid #E7E7E7"};
    background-color: ${({$isSelected}) => $isSelected ? "#EFF3FE" : "white"};
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1); 
    &:focus {
        outline: none; 
    }
`;
const Selected = styled.div`
    width: 80%;
    margin-bottom:40px;
`;
const SelectedContent = styled.div`
    color: #606366;
    font-size:14px;
    height: 30px;
    display:flex;
    line-height:30px;
    justify-content: space-between;
`;
const Div = styled.div`
    display:flex;
    margin-left: 5%;
`;
const Btn = styled.button<{disabled:boolean}>`
    width: 80%;
    height:48px;
    font-size:15px;
    font-weight:600;
    color: ${({disabled}) => disabled ? "#ADADAD" : "#326DC1"};
    background-color: ${({disabled}) => disabled ? "#F3F4F8" : "#E7F2FE"};
    margin-bottom:20px;
    border:none;
    &:focus {
        outline: none;
        border:none;
    }
`;