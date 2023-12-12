const {
  CreateBook,
  GetAllBooks,
  GetBookWithId,
  updateBookWithId,
  DeleteBookWithId,
} = require("../controllers/book");
const { objectId } = require("../middlewares/objectId");
const { verfiytokenAndAdmin } = require("../middlewares/verfiyToken");

const router = require("express").Router();

router.route("/").post(verfiytokenAndAdmin, CreateBook).get(GetAllBooks);
router
  .route("/:id")
  .get(objectId, GetBookWithId)
  .put(objectId, updateBookWithId)
  .delete(objectId, DeleteBookWithId);

module.exports = router;
