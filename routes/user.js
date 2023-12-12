const {
  getAllUsers,
  getUserWithId,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { objectId } = require("../middlewares/objectId");
const {
  verfiytokenAndAdmin,
  verfiytoken_Admin_HimSelf,
} = require("../middlewares/verfiyToken");

const router = require("express").Router();

router.route("/").get(verfiytokenAndAdmin, getAllUsers);

router
  .route("/:id")
  .get(objectId, getUserWithId)
  .put(verfiytoken_Admin_HimSelf, objectId, updateUser)
  .delete(verfiytoken_Admin_HimSelf, objectId, deleteUser);

module.exports = router;
