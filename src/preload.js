import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('whatsapp', {
  onQR: (callback) => ipcRenderer.on('whatsapp:qr', (_, qr) => callback(qr)),
  onReady: (callback) => ipcRenderer.on('whatsapp:ready', () => callback()),
  sendMessages: (messages) => ipcRenderer.invoke('whatsapp:send', messages)
})