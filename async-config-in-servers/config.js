// const fakeApi = () => new Promise((res) => setTimeout(() => res(12345), 5_000));

const originalApiData = () =>
  axios.get("https://loveapi.ml/numbersapi/1/trivia").then((res) => res.data);

const config = {};
let isLoaded = false;

module.exports = async function asyncConfig() {
  if (!isLoaded) {
    config.VALUE = await originalApiData();
    isLoaded = true;
    return config;
  } else {
    return config;
  }
};
