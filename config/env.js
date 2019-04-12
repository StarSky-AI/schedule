//根据不同的环境更改不同的baseUrl
let baseUrl = '';

if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://tsgc.qhd58.net/public/index.php';
    

} else if (process.env.NODE_ENV == 'production') {
    //baseUrl = '测试地址';
    //baseUrl = '预发布地址';
    baseUrl = 'http://tsgc.qhd58.net/public/api';
}

export {
    baseUrl,//导出baseUrl
}

