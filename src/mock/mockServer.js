//使用mockjs来定义mock接口
import Mock from 'mockjs';
import banners from './banners.json'; //webpack自动解析成了js数组
import floors from './floors.json'; //webpack自动解析成了js数组

/*定义返回banners数据接口*/
Mock.mock('/mock/banners', {code: 200, data: banners});

/*定义返回floors数据接口*/
Mock.mock('/mock/floors', {code: 200, data: floors});

// export default ?? //注意,mock不需要使用export向外暴露

//但必须要执行一次 ==> 这两个接口才可以访问
//在入口js中引入一下即可
console.log('mockServer执行了...');

