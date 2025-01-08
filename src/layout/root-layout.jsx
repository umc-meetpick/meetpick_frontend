// 모든 페이지에서 공유되는 레이아웃
// 하단 네비게이션 바를 고정정
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavBar from "../components/BottomNavbar";

const RootLayout= () => {
  return (
    <>
      <div style={{ paddingBottom: "80px" }}>
        {/* Outlet은 자식 라우트 컴포넌트가 렌더링되는 자리 */}
        <Outlet />
      </div>
      <BottomNavBar />
    </>
  );
};

export default RootLayout;
