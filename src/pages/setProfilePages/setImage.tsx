import { useContext} from "react"
import SetProfileNavbar from '../../components/navbar/BasicNavbar';
import ProgressBar from '../../components/progressbar/ProgressBar';
import styled from "styled-components";
import MoveNextRoundBtn from "../../components/button/MoveNextRoundBtn";
import original from "../../assets/profileImg/original.png"
import hamburger from "../../assets/profileImg/hamburger.png"
import study from "../../assets/profileImg/study.png"
import scarf from "../../assets/profileImg/scarf.png"
import hoodie from "../../assets/profileImg/hoodie.png"
import scholar from "../../assets/profileImg/scholar.png"
import headset from "../../assets/profileImg/headset.png"
import boxing from "../../assets/profileImg/boxing.png"
import witch from "../../assets/profileImg/witch.png"
import { ProfileInfoContext } from '../../context/profileInfoContext';
import ProfileSelectedBorder from "../../components/profileSelectedBorder";
import MoveToPrevBtn from "../../components/button/MoveToPrevBtn";

const SetImage = () =>{
    const {nickname, setImage, imgNum, setImgNum} = useContext(ProfileInfoContext);
    const handleSelected = (num:number, profile:string) =>{
        setImgNum(num);
        setImage(profile);
    }
    return(
        <>
            <SetProfileNavbar title={"프로필 작성"}/>
            <ProgressBar progress={28}/>
            <ProfileSelectedBorder input={[nickname]}/>
            <Container>
                <Title>원하는 프로필을 선택하세요!</Title>
                <ImageWrapper>
                    <ProfileRound src={original} alt="기본본" $isSelected={1==imgNum} onClick={()=>handleSelected(1, original)}/>
                    <ProfileRound src={hamburger} alt="햄버거" $isSelected={2==imgNum} onClick={()=>handleSelected(2, hamburger)}/>
                    <ProfileRound src={study} alt="공부" $isSelected={3==imgNum} onClick={()=>handleSelected(3, study)}/>
                    <ProfileRound src={scarf} alt="목도리" $isSelected={4==imgNum} onClick={()=>handleSelected(4, scarf)}/>
                    <ProfileRound src={hoodie} alt="후드" $isSelected={5==imgNum} onClick={()=>handleSelected(5, hoodie)}/>
                    <ProfileRound src={scholar} alt="학사모" $isSelected={6==imgNum} onClick={()=>handleSelected(6, scholar)}/>
                    <ProfileRound src={headset} alt="헤드셋" $isSelected={7==imgNum} onClick={()=>handleSelected(7, headset)}/>
                    <ProfileRound src={boxing} alt="복싱" $isSelected={8==imgNum} onClick={()=>handleSelected(8, boxing)}/>
                    <ProfileRound src={witch} alt="마녀" $isSelected={9==imgNum} onClick={()=>handleSelected(9, witch)}/>
                </ImageWrapper>
            </Container>
            <BtnContainer>
                <MoveToPrevBtn/>
                <MoveNextRoundBtn nextPage={"/setProfile/studentNum"} width={160}/>
            </BtnContainer>
        </>
    )
}
export default SetImage

const Container = styled.div`
    margin-top:100px;
    margin: 0 auto;
    width:80%;
    height:380px;
    font-family: "Pretendard Variable";
`;
const Title = styled.div`
    font-size:21px;
    font-weight:700;
    color:black;
    width:302px;
    height:23px;
    line-height:23px;
`;
const ImageWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: repeat(2, auto); 
    gap:10px;
    margin-top:40px;
`;
const ProfileRound = styled.img<{$isSelected: boolean}>`
    width:80px;
    height:80px;
    border:${({$isSelected}) => ($isSelected ? "1px solid #007AFF" : "1px solid #CECECE")};
    border-radius:100px;
`;
const BtnContainer = styled.div`
    width:80%;
    margin: 0 auto;
`;