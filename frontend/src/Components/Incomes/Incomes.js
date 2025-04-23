import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import Form from "../Form/Form";
import IncomeComponent from "../IncomeComponent/IncomeComponent";

function Incomes() {
  const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } =
    useGlobalContext();
  useEffect(() => {
    getIncomes();
  }, []);
  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Incomes</h1>
        <h2 className="total-income">
          Total Income: <span>${totalIncome()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              return (
                <IncomeComponent
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteIncome}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
}

const IncomesStyled = styled.div`
  display: flex;
  overflow: auto;
  color: #2c3e50;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: #eab308; /* Darker, richer yellow */
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 1px;
    transition: transform 0.3s ease;
  }

  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eaf4f8;
    border: 2px solid #d6e6f2;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1b98e0;
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    background: #f2f7fb;
    border-radius: 20px;
    padding: 2rem;

    .form-container {
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 15px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
      flex: 1;
      align-self: flex-start;
    }

    .incomes {
      flex: 2;
      background: #ffffff;
      padding: 1.5rem;
      border-radius: 15px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    }
  }
`;

export default Incomes;
