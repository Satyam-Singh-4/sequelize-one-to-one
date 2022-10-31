const db = require("../Models/dbconfig");
const user = db.user;
const address = db.address;

const addUser = async (req, res) => {
  try {
    const resp = await user.create(req.body, {
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

const bulkupdate = async (req, res) => {
  try {
    const id=req.body.id;
    delete req.body.id
    const resp = await user.bulkCreate(req.body, {
      upsertKeys: [{ id: id }],

      updateOnDuplicate: ["user_name","email"],
    });

    res.send(resp);

    console.log(resp);
    res.status(201).json({
      result: "updated successfully" + resp,
    });
  } catch (error) {
    res.status(400).json({
      message: "unable to update the record",
      res:error
    });
  }
};

const bulkDelete = async (req, res) => {
  try {
    const resp=await user.destroy({where:{

    }})
    res.status(201).json({
        message:"deleted record::"+resp
    })
  } catch (error) {
    res.status(400).json({
      message: "unable to  the record"+error,
    });
  }
};

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
