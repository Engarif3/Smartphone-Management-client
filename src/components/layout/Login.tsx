/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      username: "ashiq",
      password: "123456",
    },
  });
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onsubmit = async (data: any) => {
    const userInfo = {
      username: data.username,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const userFromToken = verifyToken(res.data.token);
    dispatch(setUser({ user: { user: userFromToken }, token: res.data.token }));

    if (userFromToken) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div>
        <label htmlFor="username">User Name:</label>
        <input type="text" id="username" {...register("username")} />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          {...register("password")}
          style={{ marginLeft: "12px" }}
        />
      </div>
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
