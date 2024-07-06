module.exports = {
  default:
    "--require-module @babel/register --require features/**/*.js --require support/**/*.js --format progress",
};

require("dotenv").config();
