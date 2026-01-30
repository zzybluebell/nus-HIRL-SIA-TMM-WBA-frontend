const downloadFile = (path, targetName) => {
  var a = document.createElement('a')
  a.href = path
  a.download = targetName
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export { downloadFile }
