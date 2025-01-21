import React, { useState, useContext, useEffect } from 'react';
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa6";
import majorList from '../assets/majorList';
import { useNavigate } from 'react-router-dom';
import { ProfileInfoContext } from '../context/profileInfoContext';
import { FoodProfileInfoContext } from '../context/foodProfileInfo';
import MoveToPrevBtn from './button/moveToPrevBtn';
interface ToggleListProps {
    button?: boolean; 
    multi?: boolean;
    setModalOpen?: (isOpen: boolean) => void;
}

const ToggleList: React.FC<ToggleListProps> = ({button, multi, setModalOpen}) =>{
    const navigate = useNavigate();
    const {major, setMajor} = useContext(ProfileInfoContext);
    const {majors, setMajors} = useContext(FoodProfileInfoContext);
    const [selectedAll, setSelectedAll] = useState<string[]>([]);
    const [openItems, setOpenItems] = useState<number[]>([]);
    const handleToggle = (id: number) => {
        if (openItems.includes(id)) {
            setOpenItems(openItems.filter(itemId => itemId !== id));
        } else {
            setOpenItems([...openItems, id]);
        }
    };
    const handleMajor = (major:string, college:string, all:string[]) =>{
        if (multi) {
            if (major === "all") {
                if (selectedAll.includes(college)){
                    setMajors(majors.filter((m) => !all.includes(m)));
                    setSelectedAll(selectedAll.filter((m) => m !== college));
                }else{
                    setSelectedAll([...selectedAll, college]);
                    const newMajors = all.filter((m) => !majors.includes(m));
                    setMajors([...majors, ...newMajors]); 
                }
            }else{
                if (majors.includes(major)) {
                    setMajors(majors.filter((m) => m !== major));
                } else {
                    setMajors([...majors, major]);
                }
            }
        } else {
            setMajor(major);
        }
    };
    useEffect(() => {
        const updatedSelectedAll = majorList.reduce((acc: string[], curr) => {
            const { college, majors: collegeMajors } = curr;
    
            if (collegeMajors.every((m) => majors.includes(m)) && !acc.includes(college)) {
                acc.push(college);
            } else if (!collegeMajors.every((m) => majors.includes(m)) && acc.includes(college)) {
                acc = acc.filter((c) => c !== college);
            }
    
            return acc;
        }, []);
    
        setSelectedAll(updatedSelectedAll);
    }, [majors, majorList]);
    return(
        <>
            <Container>
            {majorList.map(item => (
                <div key={item.id}>
                    <Toggle key={item.id} onClick={() => handleToggle(item.id)} $isOpened={openItems.includes(item.id)}>
                        {item.college}
                        <FaChevronDown style={{color:"#AAAAAA"}}/>
                    </Toggle>
                    {openItems.includes(item.id) && (
                        <>  
                            {multi && 
                                <Detail 
                                    onClick={()=>handleMajor("all", item.college, item.majors)} 
                                    $isSelected={selectedAll.includes(item.college)}
                                >
                                    {`${item.college} 전체`}
                                </Detail>
                            }
                            {item.majors.map((maj, index) => (
                                <Detail
                                    key={`major-${item.id}-${index}`}
                                    onClick={() => handleMajor(maj, item.college, item.majors)}
                                    $isSelected={multi ? majors.includes(maj) : major === maj}
                                >
                                    {maj}
                                </Detail>
                            ))}
                        </>
                    )}
                </div>
            ))}
            {button ? (
                <BtnContainer>
                    <MoveToPrevBtn/>
                    <Btn onClick={()=>navigate("/setProfile/hobby")}>다음</Btn>
                </BtnContainer>
            ) : (

                <Btn2 onClick={()=>setModalOpen?.(false)}>저장</Btn2>

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
const Btn = styled.button`
    width:160px;
    height:48px;
    color:#326DC1;
    font-size:15px;
    font-weight:600;
    background-color:#E7F2FE;
    border-radius:100px;
    border:none;
    &:focus {
        outline: none;
        border:none;
    }
`;
const Btn2 = styled.button`
    width:312px;
    height:48px;
    color:#326DC1;
    font-size:15px;
    font-weight:600;
    background-color:#E7F2FE;
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