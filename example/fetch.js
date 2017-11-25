/*
 * @Author: qujun
 * @Date:   2017-11-20 15:16:38
 * @Last Modified by:   qujun
 * @Last Modified time: 2017-11-20 15:47:03
 */

let fetch = (url = '', data = {}, type = 'GET', method = 'fetch') => {
    let base = 'http://localhost:3111'
    url = base+url;
    type = type.toUpperCase();
    if (type == 'GET') {
        let dataStr = ''; //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }
    return new Promise((resolve, reject) => {
        let requestObj;
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
        } else {
            requestObj = new ActiveXObject;
        }

        let sendData = '';
        if (type == 'POST') {
            sendData = JSON.stringify(data);
        }

        requestObj.open(type, url, true);
        requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
            if (requestObj.readyState == 4) {
                if (requestObj.status == 200) {
                    let obj = requestObj.response
                    if (typeof obj !== 'object') {
                        obj = JSON.parse(obj);
                    }
                    resolve(obj)
                } else {
                    reject(requestObj)
                }
            }
        }
    })
}