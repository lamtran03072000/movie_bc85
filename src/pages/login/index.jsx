import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { userService } from "../../service/userService";
import { useDispatch, useSelector } from "react-redux";
import { setInfoUserAction } from "../../stores/user";
import { keysLocalStorage, localStorageUtil } from "../../util/localStorage";
import { Navigate, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import CatHeroAnimation from "../../asset/CatHero.json";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { infoUser } = useSelector((state) => state.userSlice);

  // cách 1 : không bị render giao diện
  // if (infoUser) {
  //   return <Navigate to="/" replace />;
  // }

  // cách 2 : có bị render giao diện

  // useEffect(() => {
  //   // kiểm tra infoUser có tồn tại không => có tồn tại => đã đăng nhập => đá nó về trang chủ

  //   if (infoUser) {
  //     navigate("/");
  //   }
  // }, [infoUser]);

  const onFinish = async (values) => {
    try {
      console.log("Success:", values);

      const responseLogin = await userService.login(values);
      console.log("responseLogin: ", responseLogin);

      const infoUser = responseLogin.data.content;
      // Lưu thông tin user vào redux
      dispatch(setInfoUserAction(infoUser));
      // Lưu thông tin user vào localStorage
      localStorageUtil.set(keysLocalStorage.INFO_USER, infoUser);
      // đá user về trang chủ
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl flex items-center">
      {/* icon */}

      <div className="w-40">
        <Lottie animationData={CatHeroAnimation} />
      </div>

      <div>
        <h3 className="text-2xl font-bold">Form login</h3>

        {/* form antd */}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="taiKhoan"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="matKhau"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* form antd */}
      </div>
    </div>
  );
};

export default LoginPage;
