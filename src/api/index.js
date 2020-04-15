/*
  包含所有接口请求函数
  函数的返回值是promise

  基本技能： 能根据接口定义文档定义接口请求函数
*/

import ajax from "./ajax";
import mockAjax from './mockAjax';

//获取3级分类列表: /api/product/getBaseCategoryList
export const reqBaseCategoryList = () => ajax('/product/getBaseCategoryList');

//请求mock的接口,获取轮播列表数据
export const reqBanners = () => mockAjax.get('/banners')
//请求mock的接口,获取所有楼层的列表数据
export const reqFloors = () => mockAjax.get('/floors')
//请求搜索匹配的商品相关数据
export const reqProductList = (searchParams) => ajax.post('/list', searchParams);

// 详情Detail接口
// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`)

// 获取添加购物车商品相关信息(修改购物项数量)
//skuNum指定为改变的数量,如果是减少就是负数
export const reqAddToCart = (skuId, skuNum) => ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
// 获取购物车数据列表
export const reqCartList = () => ajax.get('/cart/cartList')
// 指定购物项的选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqCheckCartItem = (skuId, isChecked) => ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
// 删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartItem = (skuId) => ajax.delete(`/cart/deleteCart/${skuId}`)

//登录 /api/user/passport/login
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password})
// 退出登陆 /user/passport/logout
export const reqLogout = ()=>ajax.get('/user/passport/logout') //后台需要删除对应的数据
// 注册Register接口
export const reqRegister = (userInfo) => ajax.post('/user/passport/register', userInfo)



//测试mock接口请求函数
// reqBanners().then(result =>{
//   console.log('result', result);
// })

// reqProductList({});

 