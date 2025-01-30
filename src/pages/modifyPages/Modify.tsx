import React, {useState} from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import ModifyButton from "../../components/button/ModifyButton";
import { Icon } from "@iconify/react";

const Modify = () => {

     const [activeButton, setActiveButton] = useState("혼밥"); // 현재 활성화된 탭 상태 

     const handleButtonClick = (button:string) => {
        setActiveButton(button);
    };

    return (
        <>
            <Wrapper>
            <BasicNavbar title = "프로필 수정" before={true}/>
            <OriginProfile>
                <Title>기본 프로필</Title>
                <Button>
                    <ModifyButton text="닉네임"
                        $backgroundColor="#EAF4FF"
                        width="136px"
                        color="#686868"
                        
                    />
                    <ModifyButton text="프로필 사진 "
                        $backgroundColor="#EAF4FF"
                        width="136px"
                        color="#686868"
                    />
                </Button>
                <Button>
                    <ModifyButton text="MBTI "
                        $backgroundColor="#EAF4FF"
                        width="136px"
                        color="#686868"
                    />
                    <ModifyButton text="학번 / 전공 "
                        $backgroundColor="#EAF4FF"
                        width="136px"
                        color="#686868"
                    />
                </Button>
                <Button>
                    <ModifyButton text="취미 "
                        $backgroundColor="#EAF4FF"
                        width="136px"
                        color="#686868"
                    />
                    <ModifyButton text="연락수단 "
                        $backgroundColor="#EAF4FF"
                        width="136px"
                        color="#686868"
                    />
                </Button>
            </OriginProfile>
            <SecondProfile>
                <Title>2차 프로필</Title>
                <Buttons>
                    <Category
                    active = {activeButton === "혼밥"}
                    onClick ={() => handleButtonClick("혼밥")}
                    >
                        <Icon icon="fluent-color:food-20" width="15" height="15" />
                        혼밥
                    </Category>
                    <Category
                    active = {activeButton === "운동"}
                    onClick ={() => handleButtonClick("운동")}
                    >
                        <Icon icon="fluent-color:sport-16" width="15" height="15" />
                        운동
                    </Category>
                    <Category
                    active = {activeButton === "공부"}
                    onClick ={() => handleButtonClick("공부")}
                    >
                        <Icon icon="fluent-color:edit-24" width="15" height="15" />
                        공부
                    </Category>
                </Buttons>
                
                
                {activeButton === "혼밥" && (
                    <>
                        <Button>
                            <ModifyButton text="성별 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="학번 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                         </Button>
                        <Button>
                            <ModifyButton text="나이 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="전공 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                        <Button>
                            <ModifyButton text="MBTI "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="취미 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                        <Button>
                            <ModifyButton text="시간대 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="음식 종류 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                        <Button>
                            <ModifyButton text="인원수 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="하고 싶은 말 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                    </>
                )}
                {activeButton === "운동" && (
                    <>
                        <Button>
                            <ModifyButton text="운동 종류 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="시간대 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                         </Button>
                        <Button>
                            <ModifyButton text="인원수 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="운동장소 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                        <Button>
                            <ModifyButton text="성별 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="학번 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                        <Button>
                            <ModifyButton text="나이 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="전공 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                        <Button>
                            <ModifyButton text="MBTI "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="취미 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                        <Button>
                            <ModifyButton text="하고 싶은 말 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                    </>
                )}
                {activeButton === "공부" && (
                    <>
                        <Button>
                            <ModifyButton text="과목 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="시간대 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                         </Button>
                        <Button>
                            <ModifyButton text="인원수 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                            <ModifyButton text="공부장소 "
                                $backgroundColor="#EAF4FF"
                                width="136px"
                                color="#686868"
                            />
                        </Button>
                        
                    </>
                )}
            </SecondProfile>
            
            </Wrapper>
        </>
    )
}

export default Modify;


const Wrapper = styled. div`
    font-family: "Pretendard Variable";
    padding:0 30px;
`
const OriginProfile = styled.div`
    border-bottom: 4px solid #F3F3F3;
    margin: 0 12px;
`

const SecondProfile = styled.div`
    font-family: "Pretendard Variable";
    margin: 0 12px;
`

const Title = styled.p`
    font-weight:bold;
    font-size:14px;
    color:#393939;
`

const Button = styled.div`
    display:flex;
    gap:30px;
`

const Buttons = styled.div`
    display:flex;
    gap:10px;
    margin-bottom:10px;
`

const Category = styled.button<{ active: boolean }>`
    border:1px solid ${(props)=> (props.active ? "#1A6AFF" : "#E5E6E9")};
    background-color: ${(props)=> (props.active ? "#1A6AFF" : "white")};
    color: ${(props)=> (props.active ? "white" : "black")};
    border-radius:100px;
    width:68px;
    height:32px;
    font-size:13px;
    font-weight:400;
    padding:0 5px; 
    margin-bottom:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:2px;
`