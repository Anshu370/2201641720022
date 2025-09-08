import logToAffordmed from '../Logging/logMiddleware.js';
import shortid from 'shortid';
import ShortUrl from '../models/urlModel.js';


export const createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url) {
    await logToAffordmed("backend", "error", "handler", "Missing URL field");
    return res.status(400).json({ error: "URL is required" });
  }

  const code = shortcode || shortid.generate();
  const expiry = new Date(Date.now() + validity * 60000);

  try {
    const existing = await ShortUrl.findOne({ shortcode: code });
    if (existing) {
      return res.status(409).json({ error: "Shortcode already exists" });
    }

    const shortUrl = new ShortUrl({
      originalUrl: url,
      shortcode: code,
      expiry
    });

    await shortUrl.save();

    await logToAffordmed("backend", "info", "service", `Shortened URL created: ${code}`);
    res.status(201).json({
      shortlink: `https://hostname:port/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redirectToOriginal = async (req, res) => {
  const code = req.params.shortcode;
  try {
    const entry = await ShortUrl.findOne({ shortcode: code });

    if (!entry) {
      await logToAffordmed("backend", "error", "router", "Shortcode not found");
      return res.status(404).json({ error: "Shortcode not found" });
    }

    if (new Date() > entry.expiry) {
      await logToAffordmed("backend", "warn", "service", "Shortcode expired");
      return res.status(410).json({ error: "Shortcode expired" });
    }

    entry.clicks.push({
      timestamp: new Date(),
      referrer: req.get("referer") || "direct",
      location: "MockLocation - India"
    });

    await entry.save();
    res.redirect(entry.originalUrl);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUrlStats = async (req, res) => {
  const code = req.params.shortcode;

  try {
    const entry = await ShortUrl.findOne({ shortcode: code });

    if (!entry) {
      return res.status(404).json({ error: "Shortcode not found" });
    }

    res.json({
      clicks: entry.clicks.length,
      url: entry.originalUrl,
      createdAt: entry.createdAt,
      expiry: entry.expiry,
      analytics: entry.clicks
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
