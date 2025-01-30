const express = require("express");
const { createDistributor, getDistributors, deleteForm } = require("../controllers/distributor.controller");
const upload = require("../middlewares/multer");
const { createBanner, getBanners, getSingleBanner, deleteBanner, updateBannerStatus, updatebanner } = require("../controllers/banner.controller");
const { createInquiry, getInquiries, deleteInquiry } = require("../controllers/inquiry.controller");
const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog } = require("../controllers/blog.controller");
const router = express.Router();

// Middleware to handle file uploads
const fileUpload = upload.fields([
    { name: 'officeAndGodownImage', maxCount: 5 },
    { name: 'gstImage', maxCount: 1 },
    { name: 'fssaiImage', maxCount: 1 },
    { name: 'partner1Image', maxCount: 1 },
    { name: 'partner2Image', maxCount: 1 },
    { name: 'anyOtherDocImage', maxCount: 1 },
]);

router.post("/create_distributor", fileUpload, createDistributor);
router.get('/get_distributor', getDistributors);
router.delete('/delete_form/:id', deleteForm);

// banner router here 
router.post('/create_banner',upload.single('image'), createBanner)
router.get('/get_banners', getBanners)
router.get('/get_banner/:id', getSingleBanner)
router.put('/update_banner/:id',upload.single('image'), updatebanner)
router.delete('/delete_banner/:id', deleteBanner)
router.put('/update_status/:id', updateBannerStatus)

// inquiry router here 

router.post('/create_inquiry', createInquiry)
router.get('/get_inquiries', getInquiries)
router.delete('/delete_inquiry/:id', deleteInquiry)

// blog router here 
router.post('/create_blog',upload.single('image'), createBlog)
router.get('/get_blogs', getAllBlogs)
router.get('/get_blog/:id', getSingleBlog)
router.put('/update_blog/:id',upload.single('image'), updateBlog)
router.delete('/delete_blog/:id', deleteBlog)

module.exports = router;