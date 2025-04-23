import { useState, createContext, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const getIncomes = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}get-income`);
      setIncomes(data);
      console.log(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load incomes");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while deleting income"
      );
      console.error("Delete income error:", err.message);
    }
  };

  const totalIncome = () =>
    incomes.reduce((total, income) => total + income.amount, 0);

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  const getExpenses = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}get-expense`);
      setExpenses(data);
      console.log(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load expenses");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while deleting expense"
      );
      console.error("Delete expense error:", err.message);
    }
  };

  const totalExpenses = () =>
    expenses.reduce((total, expense) => total + expense.amount, 0);

  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    return history
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
