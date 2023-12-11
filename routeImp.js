const listModel = require("./model.js")

const getList = async (req, res) => {
    // console.log(req.params.email);
    const data = await listModel.findOne({ email: req.params.email });
    // console.log(data);
    let arr = [];
    if(data)
    for (let i = 0; i < data.list.length; i++) {
        arr.push(data.list[i]);
    }
    // console.log(arr);
    return res.json(arr);
}

const addList = async(req, res) => {
    const data = req.body;
    const findUser = await listModel.findOne({ email: data.email });
    // console.log(data,findUser,"naveen");
    if (findUser == null) {
        const dataAdded = await listModel.create(data);
        console.log("User created");
        return res.json("User created Successfully");
    }
    else {
        const addTodo = await listModel.findOneAndUpdate({ email: data.email }, { $push: { list: data.todo } }, { new: true, useFindAndModify: false, runValidators: true, upsert: true });
        console.log("Todo Added",addTodo);
        return res.json("Added Successfully");
    }
}
const deleteList = async(req,res) => {
    const index = req.params.id;
    const email = req.params.email;
    let data = await listModel.findOne({ email: email });
    data = data.list;
    data.splice(index, 1);
    const update = await listModel.findOneAndUpdate({ email: email }, { $set: { list: data } }, { new: true, useFindAndModify: false, runValidators: true, upsert: true });
    return res.json({ message: update.list.length });
}
const updateList = async (req, res) => {
    const index = req.params.id;
    const email = req.params.email;
    console.log(req.body, index, email);
    let data = await listModel.findOne({ email: email });
    data = data.list;
    // data.splice(index, 1, req.body.todo);
    data[index][0] = req.body.updatedTodo;
    // console.log(req.body,data);

    const update = await listModel.findOneAndUpdate({ email: email }, { $set: { list: data } }, { new: true, useFindAndModify: false, runValidators: true, upsert: true });
    return res.json({ message: update.list.length });
}
module.exports = {
    getList,
    addList,
    deleteList,
    updateList
}