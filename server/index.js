const app = require("./app");

const seed = require("../script/seed");

const setUp = async() => {
  try {
    await seed();
    const PORT = process.env.PORT || 6600;
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

setUp();
