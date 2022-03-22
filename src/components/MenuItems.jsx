import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/">
        <NavLink to="/">🖼 Menu</NavLink>
      </Menu.Item>
      <Menu.Item key="/collection">
        <NavLink to="/collection">🖼 collection</NavLink>
      </Menu.Item>
      <Menu.Item key="/compte">
        <NavLink to="/compte">🖼 Compte</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
