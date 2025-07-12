export function setupAdminRoutes(app, adminCodes, blacklisted, saveData) {
  app.post('/api/activateAdminCode', async (req, res) => {
    const { code } = req.body
    if (adminCodes.includes(code)) {
      adminCodes = adminCodes.filter(c => c !== code)
      await saveData()
      return res.json({ success: true })
    }
    res.json({ success: false })
  })

  app.post('/api/blacklistUser', async (req, res) => {
    const { username } = req.body
    if (username && !blacklisted.includes(username)) {
      blacklisted.push(username)
      await saveData()
      return res.json({ success: true })
    }
    res.json({ success: false })
  })

  app.post('/api/unblacklistUser', async (req, res) => {
    const { username } = req.body
    if (username && blacklisted.includes(username)) {
      blacklisted = blacklisted.filter(u => u !== username)
      await saveData()
      return res.json({ success: true })
    }
    res.json({ success: false })
  })
}
