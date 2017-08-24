function parse(data) {
    let res = []

    console.log(data);

    data.userChooseList.forEach(function (element, index) {
        let itemObj = {};
        itemObj.key = productTitleMap[element.productConfigId]
        itemObj.val = producetValMap[element.list[0]]
        if (element.productConfigId === 3) {
            //对数字做特殊处理 id为3为数字
            itemObj.val = element.list[0];
        }
        //多个val做处理 字符串拼接
        if (element.list.length >= 2) {
            for (let i = 1; i < element.list.length; i++){
                itemObj.val += "|"+producetValMap[element.list[i]];
            }
        }
        res.push(itemObj)
            
    }, this);
    return res;
}

const serverMap = {
    1: "使命召唤",
    2: "神秘海域",
    3: "消逝的光芒",
    4: "英雄联盟"
}

const producetValMap = {
    101: "普通版",
    102: "豪华版",
    103: "典藏版",
    201: "一个月",
    202: "三个月",
    203: "永久",
    401: "DLC1",
    402: "DLC2",
    403:"DLC3"
}

const productTitleMap = {
    1: "产品类型",
    2: "时长",
    3: "数量",
    4: "DLC"
}

export default {
    parse
}