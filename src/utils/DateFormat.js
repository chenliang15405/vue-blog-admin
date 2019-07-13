const parseTime = (dateStr, format) => {
  if (!dateStr) {
    return null
  }
  console.log(dateStr, format)
  var time = new Date(dateStr)
  const year = time.getFullYear().toString().padStart(2, '0')
  const month = (time.getMonth() + 1).toString().padStart(2, '0')
  const day = time.getDate().toString().padStart(2, '0')
  const hh = time.getHours().toString().padStart(2, '0')
  const mm = time.getMinutes().toString().padStart(2, '0')
  const ss = time.getSeconds().toString().padStart(2, '0')
  if (format) {
    if (format === 'yyyy-mm-dd') {
      return `${year}-${month}-${day}`
    } else if (format === 'hh:mm:ss') {
      return `${hh}:${mm}:${ss}`
    }
  }
  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`
}

const statusWordFilter = status => {
  const statusMap = {
    true: '启动',
    false: '禁用'
  }
  return statusMap[status]
}

export { parseTime, statusWordFilter }
