const express = require("express");
const router = express.Router();

const { getList, addList, deleteList ,updateList} = require("./routeImp.js");

router.get("/list/:email",getList);
router.post("/putList",addList);
router.delete("/delete/:id/:email", deleteList);
router.put("/update/:id/:email", updateList);


module.exports = router;