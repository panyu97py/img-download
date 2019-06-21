import html2canvas from 'html2canvas'
export default ({ data, type = 'dom', fileName = 'img' }) => {
  if (type === 'dom') {
    html2canvas(data, {
      backgroundColor: null
    }).then(canvas => {
      let imgUrl = canvas.toDataURL('image/png')
      dowmLoadImg(imgUrl, fileName)
    })
  } else if (type === 'base64') {
    dowmLoadImg(data, fileName)
  }
}
/** 下载图片 */
const dowmLoadImg = (imgUrl, fileName) => {
  if (window.navigator.msSaveOrOpenBlob) {
    var bstr = atob(imgUrl.split(',')[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    var blob = new Blob([u8arr])
    window.navigator.msSaveOrOpenBlob(blob, fileName + '.' + 'png')
  } else {
    // 这里就按照chrome等新版浏览器来处理
    const a = document.createElement('a')
    a.href = imgUrl
    a.setAttribute('download', fileName)
    a.click()
  }
}
