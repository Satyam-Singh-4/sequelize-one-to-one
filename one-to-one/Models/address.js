module.exports = (sequelize, DataTypes) => {
  const address = sequelize.define("address", {
    a_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return address;
};
//module.exports=user
