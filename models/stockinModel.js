const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const StockIn = sequelize.define('StockIn', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'stock-in',
    timeStamps: false,
    underscored: true
})

module.exports = StockIn;