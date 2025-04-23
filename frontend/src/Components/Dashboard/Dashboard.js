import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/icons";

function Dashboard() {
  const {
    getIncomes,
    getExpenses,
    incomes,
    expenses,
    totalIncome,
    totalExpenses,
    totalBalance,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const getStatAmount = (days: number) => {
    const now = new Date();
    const cutoff = new Date(now.setDate(now.getDate() - days));

    const earned = incomes
      .filter((inc) => new Date(inc.date) >= cutoff)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const spent = expenses
      .filter((exp) => new Date(exp.date) >= cutoff)
      .reduce((acc, curr) => acc + curr.amount, 0);

    return earned - spent;
  };

  const statBlocks = [
    { title: "This Week's Balance", amount: getStatAmount(7) },
    { title: "Last 30 Days", amount: getStatAmount(30) },
    { title: "Total Income", amount: totalIncome() },
    { title: "Total Expenses", amount: totalExpenses() },
    { title: "Total Balance", amount: totalBalance(), isMain: true },
  ];

  const renderStatItem = ({ title, amount, isMain }, key) => (
    <div className={`metric-box ${isMain ? "highlight" : ""}`} key={key}>
      <h3>{title}</h3>
      <span className={amount < 0 ? "neg" : "pos"}>
        {dollar} {amount}
      </span>
    </div>
  );

  const renderRangeBlock = (label: string, items: any[]) => {
    const values = items.map((i) => i.amount);
    const min = values.length ? Math.min(...values) : "-";
    const max = values.length ? Math.max(...values) : "-";

    return (
      <>
        <h4 className="range-title">
          Min <span>{label}</span> Max
        </h4>
        <div className="range-data">
          <p>{typeof min === "number" ? `$${min}` : "-"}</p>
          <p>{typeof max === "number" ? `$${max}` : "-"}</p>
        </div>
      </>
    );
  };

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>

        <div className="stats-con">
          <div className="metrics-wrapper">
            {statBlocks.map(renderStatItem)}
          </div>

          <div className="history-wrapper">
            <History />
            {renderRangeBlock("Income", incomes)}
            {renderRangeBlock("Expense", expenses)}
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: #eab308;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 1px;
    transition: transform 0.3s ease;
  }

  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .metrics-wrapper {
      grid-column: 1 / 4;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-top: 2rem;

      .metric-box {
        background: linear-gradient(145deg, #ffffff, #f0f3f5);
        border: 1px solid #e0e0e0;
        border-radius: 24px;
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.06),
          inset 0px 0px 10px rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1),
            inset 0px 0px 10px rgba(255, 255, 255, 0.4);
        }

        h3 {
          font-size: 1.6rem;
          margin-bottom: 1rem;
          text-align: center;
          color: #111827;
          font-weight: 600;
        }

        span {
          font-size: 3.2rem;
          font-weight: 700;
          color: #1f2937;

          &.pos {
            color: var(--color-green);
          }

          &.neg {
            color: #ef4444;
          }
        }
      }

      .highlight {
        grid-column: span 2;
        background: linear-gradient(145deg, #d1fae5, #a7f3d0);
        span {
          font-size: 4.2rem;
          opacity: 0.85;
          color: #065f46;
        }
      }
    }

    .history-wrapper {
      grid-column: 4 / -1;

      h4.range-title {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.2rem;
        color: #6b7280;

        span {
          font-size: 1.6rem;
          color: #111827;
        }
      }

      .range-data {
        background: rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(8px);
        border: 1px solid #d1d5db;
        border-radius: 20px;
        padding: 1.2rem 1.5rem;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        p {
          font-weight: 600;
          font-size: 1.5rem;
          color: #1f2937;
        }
      }
    }
  }
`;

export default Dashboard;
