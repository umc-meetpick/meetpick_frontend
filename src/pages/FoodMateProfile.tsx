import styled from "styled-components";
import BasicNavbar from "../components/navbar/BasicNavbar";
const FoodMateProfile = () =>{
    return(
        <>
            <BasicNavbar title="혼밥 MATE"></BasicNavbar>
            <Container>
                <div>혼밥MATE</div> 
            </Container>
        </>
    )
}
export default FoodMateProfile;

const Container = styled.div`
    height:calc(100vh - 140px);
    background: linear-gradient(to bottom, #FBFDFF, #D1E8FF);
`;