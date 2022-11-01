const db = require("../Models/dbconfig");
const user = db.user;
const address = db.address;

const addUser = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const resp = await user.create(
      req.body,

      {
        include: {
          model: address,
        },
      },
      {
        transaction: t,
      }
    );
    await t.commit();
    res.status(200).json({
      result: resp,
    });
  } catch (error) {
    await t.rollback();
    res.status(400).json({
      message: "unable to save",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const emp = await user.findAll();
    res.status(201).json({
      result: emp,
      msg: "successfull",
    });
  } catch (error) {
    res.status(400).json({
      msg: "unable to find",
    });
  }
};

const findById = async (req, res) => {
  try {
    const result = await user.findByPk(req.params.id);
    res.status(200).json({
      Result: result,
    });
  } catch (error) {
    res.status(400).json({
      msg: "not available",
    });
  }
};

const updateDetails = async (req, res) => {
  try {
    const resp = await user.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({
      result: "updated successfully" + resp,
    });
  } catch (error) {
    res.status(400).json({
      message: "unable to update the record",
    });
  }
};

const deleteDetails = async (req, res) => {
  try {
    const resp = await user.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({
      result: "deleted successfully::" + resp,
    });
  } catch (error) {
    res.status(400).json({
      message: "unable to unable the record",
    });
  }
};

const bulkAdd = async (req, res) => {
  try {
    const resp = await user.bulkCreate(req.body, {
      include: {
        model: address,
      },
    });
    res.status(200).json({
      result: resp,
    });
  } catch (error) {
    res.status(400).json({
      message: "unable to save",
    });
  }
};

//bulk update
const bulkupdate = async (req, res) => {
  try {
    const user1 = req.body;
    var resp = 0;
    for (let index = 0; index <= user1.length - 1; index++) {
      const element = user1[index];
      console.log(element);
      resp = await user.update(element, {
        where: {
          id: element.id,
        },
      });
    }
    res.status(200).json({
      result: resp,
      message: "successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      message: "unable to update the record",
      res: error,
    });
  }
};

//bulk delete

const bulkDelete = async (req, res) => {
  try {
    const id1 = req.body;
    var resp;
    for (let index = 0; index <= id1.length - 1; index++) {
      const element = id1[index];
      console.log(element);
      resp = await user.destroy({
        where: {
          id: element.id,
        },
      });
    }
    res.status(201).json({
      message: "deleted record::" + resp,
    });
  } catch (error) {
    res.status(400).json({
      message: "unable to  the record" + error,
    });
  }
};

console.log("hi");

module.exports = {
  addUser,
  getAll,
  findById,
  updateDetails,
  deleteDetails,
  bulkAdd,
  bulkupdate,
  bulkDelete,
};
