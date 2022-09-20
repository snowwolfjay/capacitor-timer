export interface NativeTimerPlugin {
    setTimeout(d: { delay: number; id: number }): Promise<any>;
    clearTimer(d: { id: number }): Promise<any>;
  }
  