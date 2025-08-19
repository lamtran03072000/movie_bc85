import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
// import { roleUser } from "../routers";

export const roleUser = {
  ADMIN: "quanTri",
  USER: "KhachHang",
};
const AuthCheck = ({ children, isNeedLogin, pagePermission }) => {
  const { infoUser } = useSelector((state) => state.userSlice);

  const localtion = useLocation();

  // trường hợp mã loại người dùng là admin thì đá về trang admin

  // nếu user là admin và đang ở trang khác ngoài admin thì sẽ chuyển hướng về trang admin, còn nếu đang ở trang admin thì sẽ bỏ qua điều kiện này
  if (
    infoUser?.maLoaiNguoiDung === roleUser.ADMIN &&
    infoUser &&
    !localtion.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin" replace />;
  }

  if (
    infoUser?.maLoaiNguoiDung === roleUser.USER &&
    infoUser &&
    pagePermission === roleUser.ADMIN
  ) {
    return <Navigate to="/" replace />;
  }

  //   trường hợp user muốn vào lại trang đăng nhập hoặc đăng ký khi đã login
  if (infoUser && !isNeedLogin) {
    return <Navigate to="/" replace />;
  }

  //   nếu user chưa login thì sẽ đá về trang login với 1 số pages : xem chi tiết
  if (!infoUser && isNeedLogin) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
};

export default AuthCheck;

// Quản trị

// bc85cap , 1234567

//  khách hàng
// bc85Abc , 123456
