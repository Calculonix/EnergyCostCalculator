export const analytics = {
  track(eventName, properties = {}) {
    if (globalThis.__WATTCOST_DEV__) console.debug(`[analytics] ${eventName}`, properties);
  },
};
