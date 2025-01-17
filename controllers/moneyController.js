const Money = require("../models/Money");

exports.getAllMonies = async (req, res) => {
  const { sort } = req.query;

  let order = [];
  if (sort) {
    if (Array.isArray(sort)) {
      sort.forEach((sortParam) => {
        const [key, direction] = sortParam.split(":");
        const dir =
          direction.toUpperCase() == "DESC" ? direction.toUpperCase() : "ASC";
        order.push([key, dir]);
      });
    } else {
      const [key, direction] = sort.split(":");
      order.push([key, direction]);
    }
  }

  try {
    const monies = await Money.findAll({ order });
    res.json(monies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMoneyById = async (req, res) => {
  try {
    const money = await Money.findByPk(req.params.id);
    if (!money) {
      return res.status(404).json({ message: "Money not found" });
    }
    res.json(money);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMoney = async (req, res) => {
  const { name, number, company, date, status, user } = req.body.data;
  try {
    const newMoney = await Money.create({
      name,
      number,
      company,
      date,
      status,
      user,
    });
    res.status(201).json(newMoney);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMoney = async (req, res) => {
  const { name, number, company, date, status, user } = req.body.data;
  try {
    const money = await Money.findByPk(req.params.id);
    if (!money) {
      return res.status(404).json({ message: "Money not found" });
    }

    money.name = name || money.name;
    money.number = number || money.number;
    money.company = company || money.company;
    money.date = date || money.date;
    money.status = status || money.status;
    money.user = user || money.user;
    money.updated_at = new Date();

    await money.save();
    res.json(money);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMoney = async (req, res) => {
  try {
    const money = await Money.findByPk(req.params.id);
    if (!money) {
      return res.status(404).json({ message: "Money not found" });
    }
    await money.destroy();
    res.json({ message: "Money deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllMonies = async (req, res) => {
  try {
    const allMoney = await Money.findAll();

    if (allMoney.length === 0) {
      return res.status(404).json({ message: "No money records found" });
    }

    const moneyData = allMoney.map((record) => ({
      name: record.name,
      number: record.number,
      company: record.company,
      date: record.date,
      status: record.status,
      user: record.user,
    }));

    const dates = allMoney.map((record) => record.date);
    const firstDate = new Date(Math.min(...dates));
    const lastDate = new Date(Math.max(...dates));

    await MoneyArchive.create({
      money: moneyData,
      date: [firstDate, lastDate],
    });

    await Money.destroy({ where: {} });
    res.json({ message: "Money data archived successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
