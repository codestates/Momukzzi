'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = []

    for (let i = 1; i < 51; i++){
      for (let j= 1; j < 11; j++){
        let data = {
          shop_id : i,
          tag_id : j,
          createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
          updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "")
        }
        datas.push(data)
      }
    }

    return queryInterface.bulkInsert("shop_tags", datas, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("shop_tags", null, {});
  }
};
