import classes from "./index.module.scss";
import { Form, Input, Button, message, Space } from "antd";
// rules
import { required as requiredRule } from "../../../Form/rules";
import { login } from "../../../Api/Auth";
import { useNavigate, Link } from "react-router-dom";

export function SignIn() {
  const Navigate = useNavigate();

  function onFinish({ account, password }) {
    new Promise((resolve, reject) => {
      login(account, password, (result) => {
        const { code, msg } = result;
        if (code === -1) {
          message.error(msg);
          reject();
          return;
        }
        const token = result.token;
        resolve({ token });
      });
    })
      .then(({ token }) => {
        // 存储token
        localStorage.setItem("token", token);
      })
      .then(() => {
        Navigate("/");
      })
      .catch(() => {});
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }

  return (
    <div className={classes.box}>
      <h2>登录</h2>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="账号" name="account" rules={[requiredRule("账号")]}>
          <Input placeholder="手机号" />
        </Form.Item>

        <Form.Item label="密码" name="password" rules={[requiredRule("密码")]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Space direction="vertical">
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to="/signUp">注册</Link>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
