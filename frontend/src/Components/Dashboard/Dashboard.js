import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import History from "../../History/History";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/icons";

function Dashboard() {
  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const calculateProfitSince = (daysAgo: number) => {
    const now = new Date();
    const targetDate = new Date();
    targetDate.setDate(now.getDate() - daysAgo);

    const recentIncome = incomes
      .filter((item) => new Date(item.date) >= targetDate)
      .reduce((acc, item) => acc + item.amount, 0);

    const recentExpenses = expenses
      .filter((item) => new Date(item.date) >= targetDate)
      .reduce((acc, item) => acc + item.amount, 0);

    return recentIncome - recentExpenses;
  };

  const statsData = [
    {
      title: "This Week's Balance",
      amount: calculateProfitSince(7),
    },
    {
      title: "Last 30 Days",
      amount: calculateProfitSince(30),
    },
    {
      title: "Total Income",
      amount: totalIncome(),
    },
    {
      title: "Total Expense",
      amount: totalExpenses(),
    },
    {
      title: "Total Balance",
      amount: totalBalance(),
      isBalance: true,
    },
  ];

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="amount-con">
            {statsData.map(({ title, amount, isBalance }, index) => (
              <div
                className={`stat-item ${isBalance ? "balance" : ""}`}
                key={index}
              >
                <h2>{title}</h2>
                <p className={amount < 0 ? "negative" : "positive"}>
                  {dollar} {amount}
                </p>
              </div>
            ))}
          </div>

          <div className="history-con">
            <History />
            <h2 className="salary-title">
              Min <span>Income</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {incomes.length > 0
                  ? `$${Math.min(...incomes.map((item) => item.amount))}`
                  : "-"}
              </p>
              <p>
                {incomes.length > 0
                  ? `$${Math.max(...incomes.map((item) => item.amount))}`
                  : "-"}
              </p>
            </div>
            <h2 className="salary-title">
              Min <span>Expense</span>Max
            </h2>
            <div className="salary-item">
              <p>
                {expenses.length > 0
                  ? `$${Math.min(...expenses.map((item) => item.amount))}`
                  : "-"}
              </p>
              <p>
                {expenses.length > 0
                  ? `$${Math.max(...expenses.map((item) => item.amount))}`
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;

    .amount-con {
      grid-column: 1 / 4;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin-top: 2rem;

      .stat-item {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 24px;
        padding: 2rem 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.04);

        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          text-align: center;
          color: #1f2937;
          font-weight: 600;
        }
        p {
          font-size: 3.5rem;
          font-weight: 700;
          color: #1f2937;

          &.positive {
            color: var(--color-green);
          }
          &.negative {
            color: red;
          }
        }
      }

      .balance {
        grid-column: span 2;
        p {
          font-size: 4.5rem;
          opacity: 0.7;
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;

      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
      }

      .salary-title {
        font-size: 1.2rem;
        color: #6b7280;
        span {
          font-size: 1.8rem;
          color: #1f2937;
        }
      }

      .salary-item {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 24px;
        padding: 1.2rem;
        box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.04);
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        p {
          font-weight: 600;
          font-size: 1.6rem;
          color: #1f2937;
        }
      }
    }
  }
`;

export default Dashboard;
