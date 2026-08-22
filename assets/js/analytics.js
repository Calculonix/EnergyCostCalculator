export const analytics = {
  track(eventName, properties = {}) {
    if (globalThis.__WATTWISE_DEV__) console.debug(`[analytics] ${eventName}`, properties);
  },
};
