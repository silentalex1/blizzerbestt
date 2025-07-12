const generateCodeBtn = document.getElementById('generateCodeBtn')
const codeDisplay = document.getElementById('codeDisplay')
const blacklistInput = document.getElementById('blacklistInput')
const blacklistBtn = document.getElementById('blacklistBtn')
const unblacklistInput = document.getElementById('unblacklistInput')
const unblacklistBtn = document.getElementById('unblacklistBtn')
const checkUsersBtn = document.getElementById('checkUsersBtn')
const usersOutput = document.getElementById('usersOutput')
const logoutBtn = document.getElementById('logoutBtn')

const botTokenInput = document.getElementById('botToken')
const startBotBtn = document.getElementById('startBotBtn')
const shutdownBotBtn = document.getElementById('shutdownBotBtn')
const viewCodeBtn = document.getElementById('viewCodeBtn')
const editCodeBtn = document.getElementById('editCodeBtn')
const botCodeEditor = document.getElementById('botCodeEditor')
const saveCodeBtn = document.getElementById('saveCodeBtn')
const cancelEditBtn = document.getElementById('cancelEditBtn')

generateCodeBtn.onclick = async () => {
  const res = await fetch('/api/manager/generatecode', { method: 'POST' })
  const data = await res.json()
  codeDisplay.value = data.code || ''
}

blacklistBtn.onclick = async () => {
  const username = blacklistInput.value.trim()
  if(!username) return
  const res = await fetch('/api/manager/blacklist', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username })
  })
  const data = await res.json()
  usersOutput.textContent = data.success ? `${username} blacklisted.` : `Failed to blacklist ${username}.`
  blacklistInput.value = ''
}

unblacklistBtn.onclick = async () => {
  const username = unblacklistInput.value.trim()
  if(!username) return
  const res = await fetch('/api/manager/unblacklist', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username })
  })
  const data = await res.json()
  usersOutput.textContent = data.success ? `${username} unblacklisted.` : `Failed to unblacklist ${username}.`
  unblacklistInput.value = ''
}

checkUsersBtn.onclick = async () => {
  const res = await fetch('/api/manager/verifiedusers')
  const data = await res.json()
  usersOutput.textContent = `Verified users: ${data.verifiedCount}\nActive users: ${data.activeUsers.length ? data.activeUsers.join(', ') : 'None'}`
}

logoutBtn.onclick = () => {
  sessionStorage.clear()
  location.href = 'index.html'
}

startBotBtn.onclick = async () => {
  const token = botTokenInput.value.trim()
  if(!token) return
  const res = await fetch('/api/manager/bot/start', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ token })
  })
  const data = await res.json()
  usersOutput.textContent = data.success ? 'Bot started.' : 'Failed to start bot.'
}

shutdownBotBtn.onclick = async () => {
  const res = await fetch('/api/manager/bot/shutdown', { method: 'POST' })
  const data = await res.json()
  usersOutput.textContent = data.success ? 'Bot shutdown.' : 'Failed to shutdown bot.'
}

viewCodeBtn.onclick = async () => {
  const res = await fetch('/api/manager/bot/code')
  const data = await res.json()
  botCodeEditor.value = data.code || ''
  botCodeEditor.style.display = 'block'
  saveCodeBtn.style.display = 'none'
  cancelEditBtn.style.display = 'none'
}

editCodeBtn.onclick = async () => {
  const res = await fetch('/api/manager/bot/code')
  const data = await res.json()
  botCodeEditor.value = data.code || ''
  botCodeEditor.style.display = 'block'
  saveCodeBtn.style.display = 'inline-block'
  cancelEditBtn.style.display = 'inline-block'
}

saveCodeBtn.onclick = async () => {
  const code = botCodeEditor.value
  const res = await fetch('/api/manager/bot/code', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ code })
  })
  const data = await res.json()
  if(data.success) {
    botCodeEditor.style.display = 'none'
    saveCodeBtn.style.display = 'none'
    cancelEditBtn.style.display = 'none'
    usersOutput.textContent = 'Bot code saved.'
  }
}

cancelEditBtn.onclick = () => {
  botCodeEditor.style.display = 'none'
  saveCodeBtn.style.display = 'none'
  cancelEditBtn.style.display = 'none'
}
