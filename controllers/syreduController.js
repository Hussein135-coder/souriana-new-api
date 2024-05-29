// controllers/SyreduController.js
const Syredu = require("../models/Syredu");
const { Op } = require("sequelize");
exports.getAllSyredu = async (req, res) => {
  const { sort, filters } = req.query;

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

  console.log(filters);
  let where = {};
  if (filters) {
    if (filters.date) {
      const dates = filters.date.$eq;
      if (Array.isArray(dates)) {
        where.date = {
          [Op.or]: dates.map((date) => ({ [Op.eq]: date })),
        };
      } else {
        where.date = {
          [Op.eq]: dates,
        };
      }
    }
    // Add more filters as needed
  }

  try {
    const statistics = await Syredu.findAll({ order, where });
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSyreduById = async (req, res) => {
  try {
    const statistic = await Syredu.findByPk(req.params.id);
    if (!statistic) {
      return res.status(404).json({ message: "Statistic not found" });
    }
    res.json(statistic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSyredu = async (req, res) => {
  const { name, likes, members, insta, date } = req.body;
  try {
    const newStatistic = await Syredu.create({
      name,
      likes,
      members,
      insta,
      date,
    });
    res.status(201).json(newStatistic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSyredu = async (req, res) => {
  const { name, likes, members, insta, date } = req.body;
  try {
    const statistic = await Syredu.findByPk(req.params.id);
    if (!statistic) {
      return res.status(404).json({ message: "Statistic not found" });
    }

    statistic.name = name || statistic.name;
    statistic.likes = likes || statistic.likes;
    statistic.members = members || statistic.members;
    statistic.insta = insta || statistic.insta;
    statistic.date = date || statistic.date;
    statistic.updated_at = new Date();

    await statistic.save();
    res.json(statistic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSyredu = async (req, res) => {
  try {
    const statistic = await Syredu.findByPk(req.params.id);
    if (!statistic) {
      return res.status(404).json({ message: "Statistic not found" });
    }
    await statistic.destroy();
    res.json({ message: "Statistic deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllSyredu = async (req, res) => {
  try {
    await Syredu.destroy({ where: {}, truncate: true });
    res.json({ message: "All statistics deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
