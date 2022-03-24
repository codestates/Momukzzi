'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = []

    for (let i=1; i<51; i++){
      for (let j=1; j<6; j++){
        let menudata = {
          shop_id : i,
          menu_name : "shop_id"+ i +" menu_name" + j,
          price : "5,000",
          createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
          updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "")
        }
        datas.push(menudata)
      }
    }
    return queryInterface.bulkInsert("menus", datas, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("menus", null, {});
  }
};
