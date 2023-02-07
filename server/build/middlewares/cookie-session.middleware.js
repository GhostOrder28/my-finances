export const cookieSessionOptions = {
    name: 'session',
    sameSite: 'none',
    secure: true,
    // secureProxy: true,
    maxAge: 24 * 60 * 60 * 1000,
    keys: (process.env.COOKIE_SESSION_KEY_1 && process.env.COOKIE_SESSION_KEY_2) ? [process.env.COOKIE_SESSION_KEY_1, process.env.COOKIE_SESSION_KEY_2] : undefined
};
