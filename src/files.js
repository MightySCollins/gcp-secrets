const childProcess = require('child_process')

function openEditor(path) {
  const editor = process.env.EDITOR || 'vi'

  return new Promise(((resolve, reject) => {
    let child = childProcess.spawn(editor, [path], {
      stdio: 'inherit',
    })
    child.on('exit', code => {
      if (code === 0) {
        resolve(path)
      } else {
        reject(new Error(`${editor} has non zero exit code: ${code}`))
      }
    })
  }))
}

module.exports = {openEditor}
