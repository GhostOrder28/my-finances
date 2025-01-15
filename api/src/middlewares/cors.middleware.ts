const corsOptions = {
  origin: [
    `https://${process.env.CLIENT_DOMAIN}`,
    `https://www.${process.env.CLIENT_DOMAIN}`,
    "https://localhost:443",
    "https://localhost"
  ],
  credentials: true,
}

export default corsOptions
