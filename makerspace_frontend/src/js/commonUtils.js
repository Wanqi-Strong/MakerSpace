class commonUtils{

    // set sessionStorage in browser
    setSessionStorage(key, val) {
        try {
            sessionStorage.setItem(key, JSON.stringify(val));
            return true;
        } catch (e) {
            console.log("fail to set SessionStorage: " + e.message);
            return false;
        }
    }

    // get sessionStorage by key in browser
    getSessionStorage(key) {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (e) {
            console.log("fail to get SessionStorage: " + e.message);
            return null;
        }
    }

    // format number using fixed-point notation
    toFixed(x,length = 2) {
        return Number.parseFloat(x).toFixed(length);
      }
}
export default new commonUtils();