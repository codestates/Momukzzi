'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = []

    for (let i=1; i<51; i++){
      for (let j=1; j<51; j++){
        let data = {
          user_id : i,
          shop_id : j,
          comment : "user_id "+i+ " has make comment to shop_id "+ j,
          star : 3,
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
    return queryInterface.bulkInsert("reviews", datas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("reviews", null, {});
  }
};
