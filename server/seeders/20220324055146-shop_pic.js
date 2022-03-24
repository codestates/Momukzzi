'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = []

    for (let i=1; i<51; i++){
      for (let j=1; j<6; j++){
        let data = {
          shop_id : i,
          pic_URL : "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEwMjVfMTUy%2FMDAxNjM1MTI1MzE2MDky.8kZL4XPkHJVw_akCdoGU9hDHJF7VhrCICltZzf93jSwg.TFcJzNzoYL1FVFGUXZAGTrL0vjutzU-XBJdgXfvcUbcg.JPEG.eunkyung425%2FKakaoTalk_20211005_131817266_05.jpg&type=sc960_832",
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
    return queryInterface.bulkInsert("shop_pics", datas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("shop_pics", null, {});
  }
};
