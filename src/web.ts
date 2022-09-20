import { WebPlugin } from '@capacitor/core';

import type { NativeTimerPlugin } from './definitions';


const timerMap = new Map<number,any>()

export class NativeTimerWeb extends WebPlugin implements NativeTimerPlugin {
    setTimeout(d: { delay: number; id: number }): Promise<any>{
        return new Promise(res=>{
          const t =  setTimeout(() => {
            timerMap.delete(d.id)
                res(d) 
            }, d.delay);
          timerMap.set(d.id,t)
        })
    };
    clearTimer(d: { id: number }){
        return new Promise(res=>{
            if(timerMap.has(d.id)){
                clearTimeout(timerMap.get(d.id))
            }
            res(d)
        })
    }
}
  