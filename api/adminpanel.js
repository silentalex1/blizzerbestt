import fs from 'fs/promises'
import path from 'path'
const dataFile = path.join(process.cwd(), 'api', 'data.json')

let adminCodes = []
let blacklisted = []
let users = {}

async function loadData() {
  try {
    const d = JSON.parse(await fs.readFile(dataFile, 'utf8'))
    users = d.users || {}
    adminCodes = d.adminCodes || []
    blacklisted = d.blacklisted || []
  } catch {
    users = {}
    adminCodes = []
    blacklisted = []
  }
}

async function saveData() {
  await fs.writeFile(dataFile, JSON.stringify({ users, adminCodes, blacklisted }, null, 2))
}

await loadData()

export async function generateCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const len = Math.floor(Math.random() * 3) + 7
  let code = 'blizzardadmin_'
  for(let i=0; i<len; i++) code += chars[Math.floor(Math.random()*chars.length)]
  adminCodes.push(code)
  await saveData()
  return code
}

export async function activateCode(code) {
  if(adminCodes.includes(code)) {
    adminCodes = adminCodes.filter(c => c !== code)
    await saveData()
    return true
  }
  return false
}

export async function blacklistUser(username) {
  if(users[username]) {
    delete users[username]
    blacklisted.push(username)
    await saveData()
    return true
  }
  return false
}

export async function unblacklistUser(username) {
  if(blacklisted.includes(username)) {
    blacklisted = blacklisted.filter(u => u !== username)
    await saveData()
    return true
  }
  return false
}

export function getVerifiedUsers() {
  const verified = Object.keys(users).length
  return verified
}

export function getActiveUsers(activeSet) {
  return Array.from(activeSet)
}
