const app = require("./src/app");
const sequelize = require("./config/database")

const PORT = process.env.PORT || 5000;

// Test connection
sequelize.authenticate()
    .then(() => console.log("Database connected"))
    .catch(err => {
        console.error("Database connection failed:", err.message);
        process.exit(1);
    });

// Sync models
sequelize.sync({ alter: false })
    .then(() => console.log("Models synced"))
    .catch(err => console.error("Sync failed:", err));

app.listen(5000, () => console.log(`Server is running on PORT ${PORT}`));
