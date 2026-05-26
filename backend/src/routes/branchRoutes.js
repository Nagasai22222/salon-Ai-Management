const express = require('express');
const router = express.Router();
const { getBranches, createBranch, updateBranch, deleteBranch } = require('../controllers/branchController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.route('/')
  .get(getBranches)
  .post(protect, authorize('ADMIN'), createBranch);

router.route('/:id')
  .put(protect, authorize('ADMIN'), updateBranch)
  .delete(protect, authorize('ADMIN'), deleteBranch);

module.exports = router;
