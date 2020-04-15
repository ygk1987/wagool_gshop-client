/* 
操作storage数据的工具函数模块
*/
import UUID from 'uuidjs'

/* 
获取UUID值
  将生成的UUID保存到localStorage中
  读取从localStorage中读取
*/
export function getUUID() {
  // 从localStorage中读取
  let uuid = localStorage.getItem('UUID_KEY')
  // 如果没有, 生成一个新的, 并保存到localStorage
  if (!uuid) {
    uuid = UUID.generate() // c3fbac45-b996-4876-808d-9060eea91c72
    localStorage.setItem('UUID_KEY', uuid)  
  }

  return uuid
}
