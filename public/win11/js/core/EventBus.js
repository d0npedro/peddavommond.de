/** Lightweight pub/sub event bus */

const listeners = new Map();

export const bus = {
  on(event, handler) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(handler);
    return () => bus.off(event, handler);
  },

  off(event, handler) {
    listeners.get(event)?.delete(handler);
  },

  emit(event, payload) {
    const set = listeners.get(event);
    if (!set) return;
    for (const handler of [...set]) {
      try {
        handler(payload);
      } catch (err) {
        console.error(`[EventBus] handler error on "${event}":`, err);
      }
    }
  },

  once(event, handler) {
    const wrap = (p) => {
      bus.off(event, wrap);
      handler(p);
    };
    return bus.on(event, wrap);
  },

  clear() {
    listeners.clear();
  },
};

export default bus;
