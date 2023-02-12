class commonUtils{
    setSessionStorage(key, val) {
        try {
            sessionStorage.setItem(key, JSON.stringify(val));
            return true;
        } catch (e) {
            console.log("fail to set SessionStorage: " + e.message);
            return false;
        }
      }

      getSessionStorage(key) {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            console.log("fail to get SessionStorage: " + e.message);
            return null;
        }
      }
}
export default new commonUtils();