'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = [
      {tag : "간편함",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "혼밥가능",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""), },
      {tag : "2인분 이상",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "맛없음",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "매움",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "고급스러움",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "레트로한 분위기",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "혼술가능",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "강력추천",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "이국적인 분위기",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "안내견출입가능",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "휴대폰충전기",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "친절함",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "시끄러운 분위기",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "빠른식사",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
      {tag : "간이 쌔다",
      createdAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),
    updatedAt: new Date()
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, ""),},
    ]

    return queryInterface.bulkInsert("tags", datas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("tags", null, {});
  }
};
