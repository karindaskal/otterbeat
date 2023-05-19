const { createClient } = require('redis');
const RedisPort = 6379
const myCache = createClient(RedisPort);
myCache.on('error', err => console.log('Redis Client Error', err));

myCache.connect();
const addToChase = async (key, value) => {
    try {
        if (key) {

            let data = await getDataParse(key)
            data.push(value)
            await setKey(key, data)
        }
    }
    catch (err) {
        throw new Error(err.message);
    }


}
const delateFronCache = async (key, value) => {
    try {
        let arr = await getDataParse(key)
        arr = arr.filter(element => element != null)
        arr = arr.filter(element => element._id != value)
        await setKey(key, arr)
    } catch (err) {
        throw new Error(err.message);
    }


}
const hasKey = async (key) => {
    try {
        const has = await myCache.exists(key)
        return has == 1
    }
    catch (err) {
        throw new Error(err.message);
    }
}
const getDataParse = async (key) => {
    try {
        let data = await myCache.get(key)
        date = data.trim()
        data = JSON.parse(data)
        return data;
    }
    catch (err) {
        throw new Error(err.message);
    }

}
const setKey = async (key, value) => {
    try {
        await myCache.set(key, JSON.stringify(value))
    } catch (err) {
        throw new Error(err.message);
    }

}

module.exports = { addToChase, delateFronCache, hasKey, getDataParse, setKey };
