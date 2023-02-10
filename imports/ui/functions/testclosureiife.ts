const testIife = (function createTestIife() {
  let cijfer = 100;

  function addsix() {
    cijfer = cijfer + 6;
  }

  function getCijfer() {
    return cijfer;
  }
  return {addsix, getCijfer};
})();

export default testIife;
