import { Button, Layout, Menu, MenuProps } from "antd";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
const { Header, Content, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Option1",
  },

  {
    key: "2",
    label: "Option2",
    children: [
      {
        key: "3",
        label: "OptionA",
      },
      {
        key: "4",
        label: "OptionB",
      },
    ],
  },
];

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful", { duration: 2000 });
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          className="demo-logo-vertical text-white"
          style={{
            margin: "12px",
            marginLeft: "30px",
            fontSize: "20px",
            color: "orange",
            fontWeight: "bold",
          }}
        >
          Smartphone Management
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <h1>main content should be here</h1>
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
