import { rgbToHex } from "../utils";

export function getTagNameStartUnity (htmlElement, set) {
  //转义头部标签
  const align = htmlElement.style['text-align']
  const line_height = htmlElement.style['line-height']
  let color = rgbToHex(htmlElement.style['color'])
  let size = htmlElement.style['font-size'].replace('px',"")
  let str = "";
  switch (htmlElement.nodeName.toLocaleLowerCase()) {
    // unity 解析需要拆分出color和size单独字段
    //  <b style="color:rgb(1,1,1);font-size:15px"></b>
    //  ===>
    //
    case "strong":
    case "b":
      str += '<b>'
      if (color) {
        str += `<color=${color}>`
      }
      if (size) {
        str += `<size=${size}>`
      }
      return str;
    case "em":
    case "i":
      return "<i>";
    case "p":
    case "div":
      if(line_height) {
        str += `<line-height=${line_height*100}%>`
      }
      if(align){
        str +=  `<align=${align}>`
      }
      return str
    case "font":
      color = htmlElement.color
      size = htmlElement.size
      if (color) {
        str += `<color=${color}>`;
      }
      if (size) {
        // <font size="1"></font> 字号转化
        const index = set.fontSize.code.indexOf(+size);
        str += `<size=${set.size ? set.size[index]: size }>`
      }
      return str;
    case "span":
      if (color) {
        str += `<color=${color}>`
      }
      if (size) {
        str += `<size=${size}>`
      }
      return str;
    case "a":
      const { name, type } = htmlElement
      if(type === 'gameSystemLink') { // 内部链接
        if (name) {
          str += `<link=openSystem__@@__${name.slice(1)}>`
        }
      } else { // 外部链接
        if (name) {
          str += `<link=openUrl__@@__${name.slice(1)}>`
        }
      }
      return str
    case "u":
      return '<u>'
    default:
      return ""
  }
}

export function getTagNameEndUnity (htmlElement) {
  const align = htmlElement.style['text-align']
  const line_height = htmlElement.style['line-height']
  let color = rgbToHex(htmlElement.style['color'])
  let size = htmlElement.style['font-size'].replace('px',"")
  let str = "";
  const { firstElementChild, lastElementChild } = htmlElement
  switch (htmlElement.nodeName.toLocaleLowerCase()) {
    case "strong":
    case "b":
      if (size) {
        str += `</size>`
      }
      if (color) {
        str += `</color>`
      }
      str += "</b>"
      return str;
    case "em":
    case "i":
      return "</i>";
    case "br":
      return '<br>'
    case "p":
    case "div":
      if(align){
        str +=  '</align>'
      }
      if(line_height) {
        str += '</line-height>'
      }
      /**
       * 以下情况则不转义
       * <div><br></div>
       * */
      if (lastElementChild && firstElementChild === lastElementChild ) {
        if (lastElementChild.nodeName === "BR") {
          return str
        } else if (firstElementChild.nodeName === "FONT" && firstElementChild?.firstElementChild?.nodeName === "BR") {
          return str
        } else {
          return str += "<br>"
        }
      }else {
        return str += "<br>"
      }
    case "font":
      color = htmlElement.color
      size = htmlElement.size
      if (size) {
        str += `</size>`
      }
      if (color) {
        str += `</color>`;
      }
      return str;
    case "span":
      if (size) {
        str += `</size>`
      }
      if (color) {
        str += `</color>`
      }
      return str;
    case "a":
      str += `</link>`
      return str
    case "u":
      return '</u>'
    default:
      return ""
  }
}