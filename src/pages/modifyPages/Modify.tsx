import React, { useState } from "react";
import styled from "styled-components";
import BasicNavbar from "../../components/navbar/BasicNavbar";
import ModifyButton from "../../components/button/ModifyButton";
import { Icon } from "@iconify/react";
import GroupEmoji2 from "../../components/GroupIcon2";

const Modify = () => {
    return (
        <>
            <BasicNavbar title = "프로필 수정"/>
            <Wrapper>
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
                <Category><Icon icon="fluent-color:food-20" width="20" height="20" />밥</Category>
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
            </SecondProfile>
            <SecondProfile>
                <Category><Icon icon="fluent-color:sport-16" width="20" height="20" />운동</Category>
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
            </SecondProfile>
            <SecondProfile>
                <Category><GroupEmoji2 />공동구매</Category>
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
            </SecondProfile>
            <SecondProfile>
                <Category><Icon icon="fluent-color:edit-24" width="20" height="20" />공부</Category>
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
                    <ModifyButton text="전공 ›"
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
            </SecondProfile>
            </Wrapper>
        </>
    )
}

export default Modify;


const Wrapper = styled. div`

`
const OriginProfile = styled.div`
    padding:0 38px 25px 38px;
    border-bottom: 4px solid #F3F3F3;
`

const SecondProfile = styled.div`
    padding:0 38px 25px 38px;
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
const Category = styled.div`
    display:flex;
    align-items:center;
    padding-bottom:10px;
    font-weight:bold;
    font-size:14px;
    gap:2px;
`
