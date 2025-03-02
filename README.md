# meetpick_frontend
![스크린샷 2025-02-23 184523](https://github.com/user-attachments/assets/142fbc8e-20c3-404e-bf09-b7e392da197a)

## 프로젝트 소개
> UMC 7기 최종 프로젝트로 진행한 MeetPick 프로젝트 입니다. <br/>
> MeetPick은 에브리타임에서 함께 무언가를 할 사람을 찾는 글은 많지만, 직접적인
> 연결까지는 어렵다는 점을 발견해 밥, 운동, 공부를 함께 할 사람을 찾고자 만든 서비스입니다. 

## 개발 기간 
> 2025.01.04 ~ 2025.02.21

## 👥 FE 팀원(Contributors)
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/taeyoung0524">
          <img src="https://github.com/taeyoung0524.png" width="100">
        </a>
      <td align="center">
        <a href="https://github.com/Limhari0301">
          <img src="https://github.com/Limhari0301.png" width="100">
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/seoyoon127">
          <img src="https://github.com/seoyoon127.png" width="100">
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">탱/서태영</td>
      <td align="center">마리/임하리</td>
      <td align="center">이서/이서윤</td>
    </tr>
  </tbody>
</table>

## 📌 역할 분담 
✅ 탱/서태영(팀장)
 - 회원가입
 - 추천리스트 / 전체리스트
 - 신청 페이지
 - 찜 페이지
 - 로그인 후 알림 
 - 마이페이지 수정
 - 공용 하단바

✅ 마리/임하리 
 - 홈페이지
 - 로그인
 - 마이페이지 - 신청
 - 신고하기

✅ 이서/이서윤
 - 1차 프로필 작성
 - 2차 프로필 작성(채팅)
 - API 초기 설정

## ✨ 기술 스택 
<div>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/typescript-F7DF1E?style=for-the-badge&logo=typescript&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
</div>

## 🌐 Cowork Tools 
<div>
<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>
<img src="https://img.shields.io/badge/notion-E53888?style=for-the-badge&logo=notion&logoColor=white"/>
<img src="https://img.shields.io/badge/figma-89AC46?style=for-the-badge&logo=figma&logoColor=white"/>
<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"/>
</div>

## 🎯 Commit convention
```
CHORE: 코드 수정, 내부 파일 수정
FEAT: 새로운 기능 추가
FIX: 버그, 오류 수정
DOCS: README 등의 문서 수정
REFACTOR: 기능 변경 없이 구조 개선
TEST: 테스트 코드 추가 및 수정
```

## 🪴 Branch Convention (GitHub Flow)
- `main`: 배포 가능한 브랜치, 항상 배포 가능한 상태를 유지
- `feature/{description}`: 새로운 기능을 개발하는 브랜치
  - 예: `feature/add-login-page`
### 🌊Flow
1. `feature` 브랜치에서 새로운 브랜치를 생성.
2. 작업을 완료하고 커밋 메시지에 맞게 커밋.
3. Pull Request를 생성 / 팀원들의 리뷰.
4. 리뷰가 완료되면 `develop` 브랜치로 병합.
5. `main` 브랜치로 병합 후, 배포.
**예시**:
```
# 새로운 기능 개발
git checkout -b feature/add-login-page
# 작업 완료 후, develop 브랜치로 병합
git checkout develop
git pull origin develop   # 최신 develop 브랜치를 로컬로 가져오기
git merge feature/add-login-page   # feature 브랜치를 develop 브랜치에 병합
git push origin develop 
