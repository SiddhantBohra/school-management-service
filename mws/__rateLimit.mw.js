module.exports = ({ cache, config }) => {
  const { WINDOW_SIZE_IN_SECONDS, MAX_REQUESTS_PER_WINDOW } = config.dotEnv;
  return async ({ req, res, next, end }) => {
    const ip = req.ip || req.connection.remoteAddress;
    const key = `rateLimit:${ip}`;

    try {
      // Get the current count for this IP
      if (!cache.key.exists({ key })) {
        await cache.key.set({ key, value: 0 });
      }
      const currentCount = (await cache.key.get({ key })) || 0;
      console.log(WINDOW_SIZE_IN_SECONDS, MAX_REQUESTS_PER_WINDOW);
      if (currentCount >= MAX_REQUESTS_PER_WINDOW) {
        return end({
          error: 'Too many requests',
          code: 429,
        });
      }

      // Increment the counter
      await cache.key.increment({ key });

      // Set expiry if it's a new key
      if (currentCount === 0) {
        await cache.key.expire({ key, expire: MAX_REQUESTS_PER_WINDOW });
      }
      // Add rate limit headers
      res.setHeader('X-RateLimit-Limit', WINDOW_SIZE_IN_SECONDS);
      res.setHeader(
        'X-RateLimit-Remaining',
        WINDOW_SIZE_IN_SECONDS - currentCount - 1,
      );

      next();
    } catch (error) {
      console.error('Rate limiting error:', error);
      // If Redis fails, allow the request but log the error
      next();
    }
  };
};
