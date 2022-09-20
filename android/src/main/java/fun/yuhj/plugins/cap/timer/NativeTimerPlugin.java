package fun.yuhj.plugins.cap.timer;


import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.HashMap;
import java.util.Timer;
import java.util.TimerTask;

@CapacitorPlugin(name = "NativeTimer")
public class NativeTimerPlugin extends Plugin {

  private final HashMap<Integer, Timer> timerMap = new HashMap<>();

  public void endTask(int time) {
    Timer t = timerMap.get(time);
    if (t == null) {
      return;
    }
    t.cancel();
    timerMap.remove(time);
  }

  @PluginMethod()
  public void setTimeout(PluginCall call) {
    int delay = call.getInt("delay", 0);
    int id = call.getInt("id", 0);
    Timer timer = new Timer();
    endTask(id);
    timerMap.put(id, timer);
    timer.schedule(new TimerTask() {
      @Override
      public void run() {
        call.resolve();
        timerMap.remove(id);
      }
    }, delay);
  }

  @PluginMethod()
  public void clearTimer(PluginCall call) {
    String id = call.getString("id");
    if (id == null) {
      return;
    }
    endTask(Integer.parseInt(id));
    call.resolve();
  }
}