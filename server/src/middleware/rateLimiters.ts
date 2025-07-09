import rateLimit from "express-rate-limit";

export const publiclimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export const authedlimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

export const adminlimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5000,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
