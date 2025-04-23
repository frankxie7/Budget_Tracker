import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import {
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  medical,
  money,
  piggy,
  plane,
  smile,
  stocks,
  trash,
  tv,
} from "../../utils/icons";
import Button from "../Button/Button";

function IncomeComponent({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "investments":
        return stocks;
      case "bank":
        return card;
      case "benefits":
        return medical;
      case "bonuses":
        return piggy;
      case "other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "food":
        return food;
      case "subscriptions":
        return tv;
      case "entertainment":
        return smile;
      case "clothing":
        return clothing;
      case "travelling":
        return plane;
      case "payments":
        return money;
      case "other":
        return circle;
      default:
        return "";
    }
  };

  console.log("type", type);

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">
        {type === "expense" ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="btn-con">
            <Button
              icon={trash}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"var(--primary-color"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"var(--color-green)"}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #f2f7fb;
  border: 2px solid #d6e6f2;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 18px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #2c3e50;

  .icon {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: #eaf4f8;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #d6e6f2;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;
      color: #3c4f63;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      background: #ffffff;
      border-radius: 12px;
      padding: 1rem 1.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1.2rem;

        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #1b98e0;
          opacity: 0.9;
        }
      }
    }
  }
`;

export default IncomeComponent;
