import React, { useState, useContext } from 'react';
import styled from "styled-components";
import { FaChevronDown } from "react-icons/fa6";
import majorList from '../assets/majorList';
import { useNavigate } from 'react-router-dom';
import { ProfileInfoContext } from '../context/profileInfoContext';

const ToggleList: React.FC = () =>{
    const navigate = useNavigate();
    const {major, setMajor} = useContext(ProfileInfoContext);
    const [openItems, setOpenItems] = useState<number[]>([]);
    const handleToggle = (id: number) => {
        if (openItems.includes(id)) {
            setOpenItems(openItems.filter(itemId => itemId !== id));
        } else {
            setOpenItems([...openItems, id]);
        }
    };
    const handleMajor = (major:string) =>{
        setMajor(major)
    };
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
                        item.majors.map((maj, index) => (
                            <Detail key={`major-${item.id}-${index}`} onClick={()=>handleMajor(maj)} $isSelected={major===maj}>
                                {maj}
                            </Detail>
                        ))
                    )}
                </div>
            ))}
            <Btn onClick={()=>navigate("/setProfile/hobby")}>다음</Btn>
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
    width:312px;
    height:48px;
    color:#326DC1;
    font-size:15px;
    font-weight:600;
    background-color:#E7F2FE;
    border-radius:100px;
    margin-top:43px;
    border:none;
    &:focus {
        outline: none;
        border:none;
    }
`;