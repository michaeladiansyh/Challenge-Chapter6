"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    queryInterface.bulkInsert("userGames", [
      {
        id: 1,
        username: "michaeladiansyh",
        password: "123456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        username: "agustina",
        password: "123123",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        username: "kurokuro",
        password: "456456",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
