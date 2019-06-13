/**
 * Created by jiachenpan on 16/11/18.
 */
import { Message, MessageBox } from 'element-ui'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}
// 检查手机号格式
export function checkMobile(str) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  if (reg.test(str)) {
  } else {
    console.log(str);
    return Message({
      message: '手机号格式错误',
      type: 'error'
    })
  }
}
// 去左右空格;
export function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, '')
}
// 导出Excel
export function exportExcel() {
  /* generate workbook object from table */
  var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
  /* get binary string as output */
  var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
  try {
    FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), 'sheetjs.xlsx')
  } catch (e) {
    if ( typeof console !== 'undefined' ) console.log(e, wbout)
  }
  return wbout
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
