// controllers/SyrController.js
const Syr = require("../models/Syr");

exports.getAllSyr = async (req, res) => {
  const { sort, filters, pagination } = req.query;

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

  let offset = 0;
  let limit = 20000;

  if (pagination) {
    if (pagination.start) {
      offset = parseInt(pagination.start, 10);
    }
    if (pagination.limit) {
      limit = parseInt(pagination.limit, 10);
    }
  }

  let where = {};
  if (filters) {
    if (filters.date) {
      if (filters.date.$eq) {
        where.date = {
          [Op.eq]: filters.date.$eq,
        };
      }
      // Handle other date filters if necessary
    }
    // Add more filters as needed
  }

  try {
    const statistics = await Syr.findAll({ order, where, limit, offset });
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSyrById = async (req, res) => {
  try {
    const statistic = await Syr.findByPk(req.params.id);
    if (!statistic) {
      return res.status(404).json({ message: "Statistic not found" });
    }
    res.json(statistic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSyr = async (req, res) => {
  const { name, likes, members, insta, date } = req.body;
  try {
    const newStatistic = await Syr.create({
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

exports.updateSyr = async (req, res) => {
  const { name, likes, members, insta, date } = req.body;
  try {
    const statistic = await Syr.findByPk(req.params.id);
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

exports.deleteSyr = async (req, res) => {
  try {
    const statistic = await Syr.findByPk(req.params.id);
    if (!statistic) {
      return res.status(404).json({ message: "Statistic not found" });
    }
    await statistic.destroy();
    res.json({ message: "Statistic deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllSyr = async (req, res) => {
  try {
    await Syr.destroy({ where: {}, truncate: true });
    res.json({ message: "All statistics deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
