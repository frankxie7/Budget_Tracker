import React from "react";
import styled from "styled-components";
import user from "./img/user.png";

function Navigation() {
  return (
    <NavStyled>
      <div className="user-sec">
        <img src={user} alt="" />
        <div className="text">
          <h2>Frank Xie</h2>
          <p>Money</p>
        </div>
      </div>
      <ul className="menu-items"></ul>
    </NavStyled>
  );
}

// const NavStyled = styled.nav``;

// export default Navigation;
