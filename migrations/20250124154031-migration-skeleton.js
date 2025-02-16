"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("Fellows", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },

      firstname: Sequelize.STRING,
      othername: Sequelize.STRING,
      surname: Sequelize.STRING,

      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      img_url: Sequelize.STRING,
      sex: Sequelize.STRING,
      currentLevel: Sequelize.STRING,
      cohortId: Sequelize.UUID,
      CARTAGraduate: Sequelize.STRING,
      shortBio: Sequelize.TEXT,
      institutionId: Sequelize.STRING,
      faculty: Sequelize.STRING,
      department: Sequelize.STRING,
      PhDResearchTitle: Sequelize.STRING,
      PhDResearchInstitute: Sequelize.STRING,
      areaOfSpecialization: Sequelize.STRING,
      researchInterest: Sequelize.STRING,
      ORCIDNumber: Sequelize.STRING,
      googleScholarProfile: Sequelize.STRING,
      researchGateProfile: Sequelize.STRING,

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Fellows");
  },
};
