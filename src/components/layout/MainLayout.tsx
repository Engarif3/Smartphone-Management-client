import { Layout, Menu, MenuProps } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { createElement } from "react";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Option",
  },

  {
    key: "2",
    label: "Option2",
    children: [
      {
        key: "3",
        label: "Option",
      },
      {
        key: "4",
        label: "Option",
      },
    ],
  },
];

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh", backgroundColor: "white" }}>
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
            color: "orangere",
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
        <Header style={{ padding: 0 }} />
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
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
