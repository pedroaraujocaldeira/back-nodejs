const { Model, DataTypes } = require('sequelize');
const { tokenTypes } = require('../config/tokens');

class Session extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM(tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD),
          allowNull: true,
        },
        expires: {
          type: Date,
          allowNull: true,
        },
        blacklisted: {
          type: Boolean,
          default: false,
        },
      },
      { sequelize }
    );
  }

  static associate(models) {
    super.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Session;
