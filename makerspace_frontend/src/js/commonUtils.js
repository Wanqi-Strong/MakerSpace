class commonUtils {

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
    toFixed(x, length = 2) {
        return Number.parseFloat(x).toFixed(length);
    }

    // check data type
    getDataType(data) {
        let typeString = "";
        try {
            typeString = Object.prototype.toString.call(data).slice(8, -1);
        } catch (e) {
            throw new Error(`get type of data failed ：${e.message}`);
        }
        if (typeString === "Number" && isNaN(Number(data))) typeString = "NaN";
        return typeString;
    };

    // check is data empty
    isEmpty(data) {
        let result = false;
        switch (this.getDataType(data)) {
            case "Null":
            case "Undefined":
                result = true;
                break;
            case "String":
                result = data === "";
                break;
            case "Object":
            case "Array":
                result = Object.keys(data).length === 0;
                break;
            case "Set":
            case "Map":
                result = data.size === 0;
                break;
            default:
                result = false;
                break;
        }
        return result;
    };
}
export default new commonUtils();