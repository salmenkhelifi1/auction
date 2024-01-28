"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the table
    await queryInterface.dropTable("chat");
  },

  down: async (queryInterface, Sequelize) => {
    // If needed, you can define the logic to recreate the table in the down function
    // Example: await queryInterface.createTable('YourTableName', { ... });
  },
};
