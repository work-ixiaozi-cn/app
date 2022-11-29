import { contextBridge, desktopCapturer, DesktopCapturerSource, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  mainView: {
    webrtc: (video: HTMLVideoElement, func: (resources: DesktopCapturerSource[]) => string) => {
      ipcRenderer.invoke('MainView/webrtc').then(async resources => {
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            // @ts-ignore
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: func(resources),
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        }).then(stream => {
          video.srcObject = stream
          video.onloadedmetadata = (e) => video.play()
        })
      })
    },
    record: () => {
      console.log("record.......")
      ipcRenderer.send('MainView/record')
    },
    close: () => {
      console.log("close.......")
      ipcRenderer.send('MainView/close')
    },
  },
});