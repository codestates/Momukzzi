'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let datas = []
    let pic = [
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2021_03_26_1074%2Fea28a1c2-8df4-11eb-97dd-48df37ae3fca_03.jpg&type=sc960_832',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA4MDNfMTQw%2FMDAxNjI3OTI1NjU5ODQ5.te5MuLazPhepwpCF8o_TR3S6y-YJUXo7tWOaLmJiRjAg.nztGY0pzGc7haBQNQQwNuvlKqIN4A3a7iKBmLyoI2hog.JPEG.maryyeong%2F%25B6%25B1%25BA%25BA%25C0%25CC2.jpg&type=a340',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA3MjFfMTU3%2FMDAxNTk1MzA0NzgyODI3.GluHn_atfvA6lKMqPSo4wreVt6xVijzzEW64IP0d4hYg.9_1MIP8S80CHGV14cjXjCcOO1e1HwWkwac60UvzmCUYg.JPEG.hdkdog%2F2020_06_18_%25B3%25A1%25B5%25B7-407.jpg&type=a340',
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fmodo-phinf.pstatic.net%2F20211210_210%2F1639102655285MFYn4_JPEG%2FmosaD5mBog.jpeg&type=a340',
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTEyMjhfMjY2%2FMDAxNjQwNjc0MjgzODI1.tgluoEtAWl77e3lUuQ7LbFVATj4ME9bvi9W6et8cIjcg.HZPHLxs3C6CHxjSsRLTcW2SbqLty-ZqFL-_Ef_qZORAg.JPEG.deepof%2F%253DGER_02334.jpg&type=a340'
    ]
    for (let i=1; i<2501; i++){
      for (let j=0; j<5; j++){
        let data = {
          review_id : i,
          pic_URL : pic[j],
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
    return queryInterface.bulkInsert("review_pics", datas, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("review_pics", null, {});
  }
};
