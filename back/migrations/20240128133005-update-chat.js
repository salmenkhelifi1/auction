"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the columns exist before adding them
    const senderIdExists = await queryInterface
      .describeTable("Chat")
      .then((tableDefinition) => !!tableDefinition.senderId);
    const receiverIdExists = await queryInterface
      .describeTable("Chat")
      .then((tableDefinition) => !!tableDefinition.receiverId);

    if (!senderIdExists) {
      await queryInterface.addColumn("Chat", "senderId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Clients",
          key: "id",
        },
      });
    }

    if (!receiverIdExists) {
      await queryInterface.addColumn("Chat", "receiverId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Sellers",
          key: "id",
        },
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Chat", "senderId");
    await queryInterface.removeColumn("Chat", "receiverId");
  },
};
