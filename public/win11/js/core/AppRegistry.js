import { State } from './State.js';
import { WindowManager } from './WindowManager.js';
import { bus } from './EventBus.js';
import { ICONS } from '../utils/icons.js';

/** @type {Map<string, object>} */
const apps = new Map();

export const AppRegistry = {
  register(def) {
    apps.set(def.id, {
      icon: ICONS[def.id] || '📦',
      category: 'apps',
      defaultWidth: 860,
      defaultHeight: 580,
      singleInstance: true,
      installable: true,
      builtIn: false,
      ...def,
    });
  },

  get(id) {
    return apps.get(id);
  },

  all() {
    return [...apps.values()];
  },

  installed() {
    const installed = State.get().installedApps;
    return this.all().filter((a) => installed.includes(a.id));
  },

  catalog() {
    return this.all().filter((a) => a.installable);
  },

  launch(appId, opts = {}) {
    const app = apps.get(appId);
    if (!app) {
      console.warn('Unknown app', appId);
      return null;
    }
    if (!State.isInstalled(appId) && app.installable) {
      bus.emit('ui:toast', { title: 'App nicht installiert', body: `Installiere „${app.name}“ im Store.` });
      return null;
    }

    return WindowManager.open({
      appId: app.id,
      title: opts.title || app.name,
      icon: app.icon,
      width: opts.width || app.defaultWidth,
      height: opts.height || app.defaultHeight,
      singleInstance: app.singleInstance && !opts.forceNew,
      mount: (host, meta) => app.mount(host, meta, opts),
    });
  },
};

export default AppRegistry;
