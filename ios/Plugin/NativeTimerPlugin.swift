import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(NativeTimerPlugin)
public class NativeTimerPlugin: CAPPlugin {
    
    var timers : [String:Timer] = [];
    @objc func setTimeout(_ call: CAPPluginCall) {
        let delay = call.getString("value") ?? 1;
        let id = call.getString("id");
        let timer1 = Timer.scheduledTimer(withTimeInterval: delay / 1000, repeats: false, block: { (a1 :Any) in
               self.timers.remove(id)
               call.resolve()
            })
            RunLoop.current.add(timer1, forMode: RunLoopMode.commonModes)
           self.timers[id] = timer1
    }
    @objc func clearTimer(_ call: CAPPluginCall) {
        let id = call.getString("id");
        endTimer(id)
        call.resolve()
    }
    
    func endTimer(_ id:String){
        if(let timer = self.timers[id]){
            timer.invalidate()
        }
    }
}
