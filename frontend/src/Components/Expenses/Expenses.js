import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import IncomeComponent from "../IncomeComponent/IncomeComponent";
import ExpenseForm from "./ExpenseForm";

function Expenses() {
  const { addIncome, expenses, getExpenses, deleteExpense, totalExpenses } =
    useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">
          Total Expense: <span>${totalExpenses()}</span>
        </h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((income) => {
              const { _id, title, amount, date, category, description, type } =
                income;
              console.log(income);
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
                  deleteItem={deleteExpense}
                />
              );
            })}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  color: #2c3e50;

  h1 {
    color: #3c4f63;
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
export default Expenses;
