'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = []

    for (let i = 1; i < 51; i++ ){
      let data = {
        user_id : i,
        title : "title" + i,
        content : "this is title "+ i + "'s content",
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

    return queryInterface.bulkInsert("articles", datas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
    await queryInterface.bulkDelete("articles", null, {});
  }
};
