import express from 'express'
import { generateCode, activateCode, blacklistUser, unblacklistUser, getVerifiedUsers, getActiveUsers } from './adminpanel.js'
import { startBot, stopBot, getBotCode, setBotCode } from './botManager.js'

const router = express.Router()

let activeUsers = new Set()

router.post('/generatecode', async (req, res) => {
  const code = await generateCode()
  res.json({ code })
})

router.post('/activatecode', async (req, res) => {
  const { code } = req.body
  const success = await activateCode(code)
  res.json({ success })
})

router.post('/blacklist', async (req, res) => {
  const { username } = req.body
  const success = await blacklistUser(username)
  res.json({ success })
})

router.post('/unblacklist', async (req, res) => {
  const { username } = req.body
  const success = await unblacklistUser(username)
  res.json({ success })
})

router.get('/verifiedusers', (req, res) => {
  const count = getVerifiedUsers()
  const active = getActiveUsers(activeUsers)
  res.json({ verifiedCount: count, activeUsers: active })
})

router.post('/bot/start', async (req, res) => {
  const { token } = req.body
  const started = await startBot(token)
  res.json({ success: started })
})

router.post('/bot/shutdown', async (req, res) => {
  const stopped = await stopBot()
  res.json({ success: stopped })
})

router.get('/bot/code', (req, res) => {
  res.json({ code: getBotCode() })
})

router.post('/bot/code', (req, res) => {
  const { code } = req.body
  setBotCode(code)
  res.json({ success: true })
})

export function setActiveUsers(usersSet) {
  activeUsers = usersSet
}

export default router
