const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StockOut = sequelize.define('StockOut', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    tableName: 'stock_out',
    timestamps: false,
    underscored: true
});

module.exports = StockOut;