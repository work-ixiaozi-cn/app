import { DesktopCapturerSource } from 'electron';
import { Channels } from 'main/preload'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage(channel: Channels, args: unknown[]): void;
        on(
          channel: Channels,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: Channels, func: (...args: unknown[]) => void): void;
      };
      inject: {
        maximize(): void;
        minimize(): void;
        restore(): void;
        isMaximized(): Promise<boolean>;
        actived(state: boolean): void;
      };
    };
  }
}

export {}
