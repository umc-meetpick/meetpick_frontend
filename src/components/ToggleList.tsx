import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa6";
import majorList from '../assets/majorList';
import studyLists from '../assets/studyLists';
import { useNavigate } from 'react-router-dom';
import { ProfileInfoContext } from '../context/profileInfoContext';
import { FoodProfileInfoContext } from '../context/foodProfileInfo';
import { ExerciseProfileInfoContext } from '../context/exerciseInfoContext';
import { StudyProfileInfoContext } from '../context/studyInfoContext';
import MoveToPrevBtn from './button/MoveToPrevBtn';

interface ToggleListProps {
    button?: boolean; 
    multi?: boolean;
    setModalOpen?: (isOpen: boolean) => void;
    type?:string;
}

const ToggleList: React.FC<ToggleListProps> = ({button, multi, setModalOpen, type}) =>{
    const navigate = useNavigate();
    const lists = (type == "study") ? studyLists : majorList;
    function useProfileContext(type: string) {
        if (type == "food"){
            return useContext(FoodProfileInfoContext);
        }else if (type == "exercise"){
            return useContext(ExerciseProfileInfoContext);
        }else{
            return useContext(StudyProfileInfoContext);
        }
    }
    const {major, setMajor} = useContext(ProfileInfoContext);
    const { majors, setMajors, selectedMajors, setSelectedMajors } = useProfileContext(type || "");
    const { subject, setSubject, subjectType, setSubjectType} = useContext(StudyProfileInfoContext)
    const [openItems, setOpenItems] = useState<number[]>([]);
    const [value, setValue] = useState("");
    
    const handleToggle = (id: number) => {
        if (openItems.includes(id)) {
            setOpenItems(openItems.filter(itemId => itemId !== id));
        } else {
            setOpenItems([...openItems, id]);
        }
    };
    const handleMajor = (major:string, title:string, all:string[]) =>{
        if (type == "study"){
            setSubjectType(title)
            setSubject(`${title}-${major}`)
        }else{
            if (multi) {
                if (major === "all") {
                    if (selectedMajors.includes(title)){
                        setMajors(majors.filter((m) => !all.includes(m)));
                        setSelectedMajors(selectedMajors.filter((m) => m !== title));
                    }else{
                        setMajors([...majors.filter((m) => all.includes(m)),...all]); 
                        setSelectedMajors([...selectedMajors.filter((m) => !all.includes(m)), title]);
                    }
                }else{
                    if (!majors.includes(title)){
                        if (majors.includes(major)) {
                            setMajors(majors.filter((m) => m !== major));
                            setSelectedMajors(selectedMajors.filter((m) => m !== major));
                        } else {
                            setSelectedMajors([...selectedMajors,major]);
                            setMajors([...majors, major]);
                        }
                    }
                }
            } else {
                setMajor(major);
            }
        }
    };
    return(
        <>
            <Container>
            {lists?.length > 0 && lists.map(item => (
                <div key={item.id}>
                    <Toggle key={item.id} onClick={() => handleToggle(item.id)} $isOpened={openItems.includes(item.id)}>
                        {item.title}
                        <FaChevronDown style={{color:"#AAAAAA"}}/>
                    </Toggle>
                    {openItems.includes(item.id) && (
                        <>  
                            {multi && 
                                <Detail 
                                    onClick={()=>handleMajor("all", item.title+" 전체", item.items)} 
                                    $isSelected={selectedMajors.includes(item.title+" 전체")}
                                    key={item.id}
                                >
                                    {`${item.title} 전체`}
                                </Detail>
                            }
                            {item.items.map((i, index) => (
                            <React.Fragment key={`fragment-${item.id}-${index}`}>
                                <Detail
                                key={`major-${item.id}-${index}`}
                                onClick={() => handleMajor(i, item.title, item.items)}
                                $isSelected={multi ? majors.includes(i) 
                                    : (type == "study" ? (subject.split('-')[1] === i && subjectType == item.title) : major == i)}
                                >
                                {i}
                                </Detail>
                                {(i == "기타" && (subject.split('-')[1] === i || value != "")) && subjectType == item.title &&
                                    <Input 
                                        placeholder="스터디 과목을 입력해주세요!" 
                                        value={value}
                                        onChange={(e)=>{setValue(e.target.value)}}
                                        onBlur={(e) => setSubject(e.target.value)}
                                    />}
                            </React.Fragment>
                            ))}
                        </>
                    )}
                </div>
            ))}
            {button ? (
                <BtnContainer>
                    <MoveToPrevBtn/>
                    <Btn onClick={()=>navigate("/setProfile/hobby")} $isDisable={major==""}>다음</Btn>
                </BtnContainer>
            ) : (

                <Btn2 
                    onClick={()=>{
                        setModalOpen?.(false);
                    }} 
                    disabled={type == "study" ? subject === "" || subject === "기타" : majors.length === 0}
                    $isDisable={type == "study" ? subject === "" :  majors.length === 0}
                >
                    저장
                </Btn2>

            )}
            </Container>
        </>
    )
}
export default ToggleList;

const Container = styled.div`
    width:312px;
    height:500px;
    margin-top:20px;
    max-height: calc(100vh - 150px);
    position:relative;
    overflow-y:auto;
    overflow-x:hidden;
`;
const Toggle = styled.button<{$isOpened:boolean;}>`
    width:312px;
    height:48px;
    color: #5A5A5A;
    font-size:15px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    border:none;
    background-color:${({$isOpened})=> $isOpened ? "#F9FAFB" : "#FFFFFF"};
    border-top: 1px solid #D9D9D9;
    border-bottom: 1px solid #D9D9D9;
    &:hover {
        border: none;
        border-top: 1px solid #D9D9D9;
        border-bottom: 1px solid #D9D9D9;
        outline: none;
    }
    &:focus {
        border: none;
        border-top: 1px solid #D9D9D9;
        border-bottom: 1px solid #D9D9D9;
        outline: none;
    }
`;
const Detail = styled.button<{$isSelected: boolean}>`
    width:296px;
    height:48px;
    align-items: center;
    color:${({$isSelected})=>$isSelected ? "#007AFF" : "#7D7D7D"};
    border:none;
    &:focus {
        border: none;
        outline: none;
    }
`;
const Btn = styled.button<{$isDisable:boolean}>`
    width:160px;
    height:48px;
    color:${({$isDisable})=>$isDisable ? "#373E4B" : "#326DC1"};
    font-size:15px;
    font-weight:600;
    background-color:${({$isDisable})=>$isDisable ? "#F4F5F9" : "#E7F2FE"};
    border-radius:100px;
    border:none;
    &:focus {
        outline: none;
        border:none;
    }
`;
const Btn2 = styled.button<{$isDisable:boolean}>`
    width:312px;
    height:48px;
    color:${({$isDisable})=>$isDisable ? "#373E4B" : "#326DC1"};
    font-size:15px;
    font-weight:600;
    background-color:${({$isDisable})=>$isDisable ? "#F4F5F9" : "#E7F2FE"};
    margin-top:43px;
    margin-bottom:20px;
    border:none;
    &:focus {
        outline: none;
        border:none;
    }
`;
const BtnContainer = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
    margin: 30px auto;
`;
const Input = styled.input`
    width:100%;
    height:40px;
    border: 1px solid #5A5A5A;
    border-radius: 3px;
    &:focus {
        outline: none;
        border: 1px solid #5A5A5A;
    }
`;