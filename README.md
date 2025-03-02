# meetpick_frontend
![스크린샷 2025-02-23 184523](https://github.com/user-attachments/assets/142fbc8e-20c3-404e-bf09-b7e392da197a)


## 팀원(Contributors)
#### :loudspeaker: 팀명: 미기피기
<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/kelly121212">
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
      <td align="center">서태영</td>
      <td align="center">임하리</td>
      <td align="center">이서윤</td>
    </tr>
  </tbody>
</table>



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
