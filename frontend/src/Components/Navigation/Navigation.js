import React from "react";
import styled from "styled-components";
import user from "../../img/user.png";
import { menuItems } from "../../utils/menuitems";

function Navigation({ active, setActive }) {
  return (
    <NavStyled>
      <div className="user-sec">
        <img src={user} alt="" />
        <div className="text">
          <h2>Frank Xie</h2>
          <p>Personal Budget Tracker</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? "active" : ""}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  backdrop-filter: blur(6px);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-sec {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      background: #ffffff;
      border: 2px solid #e5e7eb;
      padding: 0.2rem;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.04);
    }
    h2 {
      color: #1f2937;
      font-size: 1.5rem;
      font-weight: 600;
    }
    p {
      color: #6b7280;
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin: 0.8rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #6b7280;
      padding: 0.8rem 1rem;
      border-radius: 12px;
      position: relative;

      &:hover {
        background: #e0f2fe;
        color: #1f2937;
      }

      i {
        color: inherit;
        font-size: 1.5rem;
        transition: all 0.3s ease;
      }
    }
  }

  .active {
    background: #dbeafe;
    color: #1d4ed8 !important;
    font-weight: 600;
    i {
      color: #1d4ed8 !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #3b82f6;
      border-radius: 0 8px 8px 0;
    }
  }
`;

export default Navigation;
