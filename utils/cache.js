const { createClient } = require('redis');
const RedisPort = 6379
const myCache = createClient(RedisPort);
myCache.on('error', err => console.log('Redis Client Error', err));

myCache.connect();
const addToChase = async (key, value) => {

    if (key) {

        let data = await getDataParse(key)
        data.push(value)
        await setKey(key, data)
    }



}
const delateFronCache = async (key, value) => {

    let arr = await getDataParse(key)
    arr = arr.filter(element => element != null)
    arr = arr.filter(element => element._id != value)
    await setKey(key, arr)



}
const hasKey = async (key) => {

    const has = await myCache.exists(key)
    return has == 1

}
const getDataParse = async (key) => {

    let data = await myCache.get(key)
    date = data.trim()
    data = JSON.parse(data)
    return data;


}
const setKey = async (key, value) => {

    await myCache.set(key, JSON.stringify(value))


}

module.exports = { addToChase, delateFronCache, hasKey, getDataParse, setKey };
