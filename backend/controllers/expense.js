const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    if (!title || !category || !date) {
      return res.status(400).json({ message: 'Missing required fields!' });
    } else if (amount < 0 || !amount === 'number') {
      return res
        .status(400)
        .json({ message: 'You must add a positive amount!' });
    }
    await expense.save();
    res.status(200).json({ message: 'Expense has been added!' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  console.log(expense);
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: 'Expense was successfully deleted.' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server Error' });
    });
};
