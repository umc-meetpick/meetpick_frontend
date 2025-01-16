import ProfileSelectedBorder from "../profileSelectedBorder";
import ToggleList from "../ToggleList";
import styled from "styled-components";
import { useContext } from "react";
import { FoodProfileInfoContext } from "../../context/foodProfileInfo";

interface ToggleListModalProps {
    setModalOpen: (isOpen: boolean) => void;
}

const ToggleListModal: React.FC<ToggleListModalProps> = ({setModalOpen}) =>{
    const { majors } = useContext(FoodProfileInfoContext);
    return(
        <Background>
            <Container>
                <Selected>
                    <ProfileSelectedBorder input={[...majors]} multi/>
                </Selected>
                <ToggleList multi={true} setModalOpen={setModalOpen} />
            </Container>
        </Background>
    )
}
export default ToggleListModal;

const Background = styled.div`
    width:393px;
    height: 100%;
    background-color:rgba(0,0,0,0.2);
    position: fixed;
    top: 0;
    left: 0;
`;
const Container = styled.div`
    width: calc(100vw); 
    max-width: 393px; 
    height: calc(100vh - 200px);
    border: 1px solid white;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 75px;
    overflow-y: auto;
    border-radius: 30px 30px 0 0;
`;
const Selected= styled.div`
    margin-top: calc(-100vh + 850px);
    height:30px;
`;