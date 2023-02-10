export default function createTest() {
  let getal = 10;

  function addthree() {
    getal = getal + 3;
  }

  function getGetal() {
    return getal;
  }
  return {addthree, getGetal};
}
