const Visit = require("../models/visit");

const visitController = {
  registerVisit: async (postId, userId) => {
    try {
      const existingVisit = await Visit.findOne({ postId, userId }).exec();

      if (existingVisit) {
        return { case: "User has already registered a visit for this post" };
      }

      await Visit.create({ postId, userId });

      return { success: true };
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  },
  getVisitCountByPostId: async (postId) => {
    try {
      const visitCount = await Visit.countDocuments({ postId }).exec();

      return { count: visitCount };
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  },
};

module.exports = visitController;
