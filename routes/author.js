const {
  GetAllAuthor,
  createAuthor,
  GetAuthorWithId,
  UpdateAuthor,
  deleteAuthorWithId,
  UploadImage,
} = require("../controllers/author");
const { objectId } = require("../middlewares/objectId");
const { upload } = require("../middlewares/uploadImage");
const { verfiytokenAndAdmin } = require("../middlewares/verfiyToken");

const router = require("express").Router();

router.route("/").get(GetAllAuthor).post( verfiytokenAndAdmin,upload.single('image'),createAuthor);
router
  .route("/:id")
  .get(objectId,GetAuthorWithId)
  .put(verfiytokenAndAdmin , objectId , upload.single("image"), UpdateAuthor)
  .delete( verfiytokenAndAdmin , objectId,deleteAuthorWithId);

router.route("/upload-image").post(upload.single("image"),UploadImage)

module.exports = router;
