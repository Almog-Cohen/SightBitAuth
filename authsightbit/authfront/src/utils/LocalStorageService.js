// Manage our local storage tokens
const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem("accessToken", tokenObj.accessToken);
    localStorage.setItem("refreshToken", tokenObj.refreshToken);
  }

  return {
    getService: _getService,
    setToken: _setToken,
  };
})();
export default LocalStorageService;
