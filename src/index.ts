import { registerPlugin, Capacitor } from '@capacitor/core';

import type { NativeTimerPlugin } from './definitions';

const NativeTimerPlug = registerPlugin<NativeTimerPlugin>('NativeTimer', {
  web: () => import('./web').then(m => new m.NativeTimerWeb()),
});

export * from './definitions';

let timerId = 0;
const tasks = new Set<number>();
const originTimeout = window.setTimeout.bind(window);
const originTimeoutClear = window.clearTimeout.bind(window);
const originInterval = window.setInterval.bind(window);
const originIntervalClear = window.clearInterval.bind(window);
export const NativeTimer = {
  setTimeout(callback: () => void, delay = 0, id = timerId++) {
    if (!Capacitor.isNativePlatform()) {
      return originTimeout(callback, delay) as any as number;
    }
    delay = Math.max(0, Math.round(delay * 0.995));
    if (delay < 10) {
      callback();
      return id;
    }
    tasks.add(id);
    NativeTimerPlug.setTimeout({ delay, id }).then(() => {
      if (tasks.has(id)) {
        tasks.delete(id);
        callback();
      }
    });
    return id;
  },
  clearTimeout(id: number) {
    if (!Capacitor.isNativePlatform()) {
      return originTimeoutClear(id);
    }
    tasks.delete(id);
    NativeTimerPlug.clearTimer({ id });
  },
  setInterval(callback: () => void, interval = 1000) {
    if (!Capacitor.isNativePlatform()) {
      return originInterval(callback, interval);
    }
    const run = () => {
      if (!tasks.has(id)) {
        return;
      }
      callback();
      NativeTimer.setTimeout(
        () => {
          run();
        },
        interval,
        id,
      );
    };
    const id = NativeTimer.setTimeout(() => {
      run();
    }, interval);
    return id;
  },
  clearInterval(id: number) {
    if (!Capacitor.isNativePlatform()) {
      return originIntervalClear(id);
    }
    NativeTimer.clearTimeout(id);
  },
};
