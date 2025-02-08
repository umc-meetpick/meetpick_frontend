import ProfileSelectedBorder from "../profileSelectedBorder";
import ToggleList from "../ToggleList";
import styled from "styled-components";
import { useContext } from "react";
import { FoodProfileInfoContext } from "../../context/foodProfileInfo";
import { ExerciseProfileInfoContext } from "../../context/exerciseInfoContext";
import { StudyProfileInfoContext } from "../../context/studyInfoContext";

interface ToggleListModalProps {
    setModalOpen: (isOpen: boolean) => void;
    type:string;
}

const ToggleListModal: React.FC<ToggleListModalProps> = ({setModalOpen, type}) =>{
    function useProfileContext(type: string) {
        if (type == "food"){
            return useContext(FoodProfileInfoContext);
        }else if (type == "exercise"){
            return useContext(ExerciseProfileInfoContext);
        }else{
            return useContext(StudyProfileInfoContext);
        }
    }
    const { selectedMajors } = useProfileContext(type);
    const isSmall = window.innerHeight < 700; 

    return(
        <Wrapper>
            <Background $isSmall={isSmall}/>
            <Container $isSmall={isSmall}>
                <Selected $isSmall={isSmall}>
                    {type !== "study" && selectedMajors.length ==0 && <div> 원하는 전공을 모두 선택해주세요! </div> }
                    <ProfileSelectedBorder input={[...selectedMajors]} multi/>
                </Selected>
                <ToggleList multi={type == "study" ? false : true} setModalOpen={setModalOpen} type={type} />
            </Container>
        </Wrapper>
    )
}
export default ToggleListModal;

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
`;
const Background = styled.div<{$isSmall:boolean;}>`
    width:100%;
    max-width:393px;
    height: 100%;
    background-color:rgba(0,0,0,0.2);
    position: fixed;
    bottom:0;
`;
const Container = styled.div<{$isSmall:boolean;}>`
    width: calc(100vw); 
    max-width: 393px; 
    height: calc(100vh * 0.8);
    border: 1px solid white;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: ${({$isSmall})=>$isSmall ? "-38px" : "-30px"};
    overflow-y: auto;
    border-radius: 30px 30px 0 0;
`;
const Selected= styled.div<{$isSmall:boolean;}>`
    margin-top: ${({$isSmall})=>$isSmall ? "70px" : "0px"};
    height:30px;
`;