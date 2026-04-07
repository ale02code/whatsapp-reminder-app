import pkg from 'whatsapp-web.js';
import { ipcMain } from 'electron';
const { Client, LocalAuth } = pkg;

let client;

ipcMain.handle('whatsapp:send', async (_, messages) => {
  try {
    for (const msg of messages) {
      const phone = msg.phone.replace(/[\s\-\+\(\)]/g, '')
      console.log('Enviando a:', phone)
      await client.sendMessage(`503${phone}@c.us`, msg.text)
      await new Promise(r => setTimeout(r, 3000))
    }
    return { success: true }
  } catch (error) {
    console.error('Error al enviar:', error)
    throw error
  }
})

export const initWhatsapp = (mainWindow) => {
  console.log('Iniciando WhatsApp...')

  client = new Client({
    authStrategy: new LocalAuth(),
  })

  client.on('qr', (qr) => {
    mainWindow.webContents.send('whatsapp:qr', qr)
  })

  client.on('ready', () => {
    mainWindow.webContents.send('whatsapp:ready')
  })

  client.initialize()
  console.log('initialize() llamado')
}