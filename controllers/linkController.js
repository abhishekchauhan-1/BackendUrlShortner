const randomString = require("randomstring");
const Link = require("../model/link");
const User = require("../model/user");

exports.shortenUrl = async (req, res) => {
  try {
    const originalUrl = req.body.url;
    const code = randomString.generate(8);
    const userId = req.user._id;

    const link = await Link.create({
      originalURL: originalUrl,
      shortenedURL: `https://url-4s79.onrender.com/${code}`,
      visited: 0,
      code: code,
      user: userId,
    });

    const user = await User.findById(userId);
    user.links.push(link._id);
    await user.save();

    return res
      .status(200)
      .json({
        shortenLink: link.shortenedURL,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};




exports.getUserStatistics = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("links");

    const statistics = {
      totalGeneratedUrls: user.links.length,
      allUrls: user.links.map(link => ({
        originalURL: link.originalURL,
        shortenedURL: link.shortenedURL,
        visits: link.visited,
        expiredLinks: link.expiredLinks,
      })),
      expiredLinkCount: user.links.reduce((count, link) => count + link.expiredLinkCount, 0),
    };

    res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



