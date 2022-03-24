'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = []

    for (let i = 1; i < 51; i++ ){
      let shopinfo = {
        shop_name : "shop_name" + i,
        genus : "genus" + i,
        location : "location" + i,
        total_review : 1,
        star_avg : 3,
        work_time : "9:00 ~ 22:00",
        holiday : "일요일",
        createdAt: new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, ""),
        updatedAt: new Date()
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "")
      }

      datas.push(shopinfo)
    }
    return queryInterface.bulkInsert("shops", datas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("shops", null, {});
  }
};
