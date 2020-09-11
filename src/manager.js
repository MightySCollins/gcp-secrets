const {SecretManagerServiceClient} = require('@google-cloud/secret-manager')

function getClient() {
  return new SecretManagerServiceClient()
}

function buildParentName(project, secret, version) {
  let parent = `projects/${project}`
  if (secret !== undefined) {
    parent += `/secrets/${secret}`
  }
  if (version !== undefined) {
    parent += `/versions/${version}`
  }
  return parent
}

function cleanSecretName(secretName) {
  let dict = {}
  const items = secretName.split('/')
  dict.project = items[1]
  if (items.length > 2) {
    dict.secret = items[3]
  }
  if (items.length > 4) {
    dict.version = items[5]
  }
  return dict
}

function formatTime(epoch) {
  let date = new Date(0)
  date.setUTCSeconds(epoch)
  return date
}

async function list(projectName) {
  let cleanedSecrets = []
  const [secrets] = await getClient().listSecrets({parent: buildParentName(projectName)})
  secrets.forEach(secret => {
    cleanedSecrets.push({
      name: cleanSecretName(secret.name).secret,
      created: formatTime(secret.createTime.seconds),
    })
  })
  return cleanedSecrets
}

async function getVersion(projectName, secretName, version = 'latest') {
  const [secretVersion] = await getClient().accessSecretVersion({name: buildParentName(projectName, secretName, version)})
  return {
    body: secretVersion.payload.data,
    version: cleanSecretName(secretVersion.name).version,
  }
}

async function update(projectName, secretName, buffer) {
  const [secret] = await getClient().addSecretVersion({
    parent: buildParentName(projectName, secretName),
    payload: {
      data: buffer,
    },
  })
  return secret
}

async function destroy(projectName, secretName, version) {
  const [secret] = await getClient().destroySecretVersion({
    name: buildParentName(projectName, secretName, version),
  })
  return secret
}

module.exports = {list, getVersion, update, destroy}
