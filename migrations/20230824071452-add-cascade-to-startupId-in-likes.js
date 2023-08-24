"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "ALTER TABLE Likes DROP CONSTRAINT Likes_ibfk_2;"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Likes ADD CONSTRAINT Likes_ibfk_2 FOREIGN KEY (startupId) REFERENCES Startups (id) ON DELETE CASCADE;"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "ALTER TABLE Likes DROP CONSTRAINT Likes_ibfk_2;"
    );
    await queryInterface.sequelize.query(
      "ALTER TABLE Likes ADD CONSTRAINT Likes_ibfk_2 FOREIGN KEY (startupId) REFERENCES Startups (id);"
    );
  },
};
