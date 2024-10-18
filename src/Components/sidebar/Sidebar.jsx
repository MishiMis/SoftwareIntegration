
import { Button, Menu } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { items } from "./links";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          { collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>

        <div>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            inlineCollapsed={collapsed}
            items={items}
            className="min-h-[80vh]"
          />
        </div>
      </div>
    </>
  );
};
