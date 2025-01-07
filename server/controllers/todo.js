const collectiontodo = require('../models/todolist')


const addList = async (req, res) => {

    const userID = req.userData.userId

    const listData = {

        user_id: userID,
        title: req.body.title,
        completed: req.body.completed,
        date: new Date()
    }

    try {

        const listDatas = await collectiontodo.create(listData)
        console.log(listDatas)

        return res.status(200).json({
            success: true, message: 'Added List'

        })

    }catch (error){

        console.error(error)
        return res.status(500).json({
            success:'false', message:'An Error Occured'
        })
    }
}


const loadList = async (req, res) => {

    const userID = req.userData.userId

    try {

        const listData = await collectiontodo.find({user_id: userID})

        console.log(listData)

        return res.status(200).json({
            success: true, message: 'List Loaded', list: listData
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            success: 'false', message:'Error Occured'
        })
    }

}


const deleteList = async (req, res) => {

    const listId = req.params.id

    try {

        const deleteList = await collectiontodo.findOneAndDelete({_id: listId})

        return res.status(200).json({
            success: true, message: "List Deleted",
            dlist: deleteList
        })
    } catch (error) {

        res.status(500).json({
            success: 'false',
            message: 'Error Occured'
        })
    }


}

const updateCompleted = async (req, res) => {

    const { id } = req.params
    const { completed } = req.body

    try {

        const updatedTask = await collectiontodo.findByIdAndUpdate(
            id,
            {completed},
            {new: true}
        )

        if (!updatedTask) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            task: updatedTask,
        });
       

    } catch (error) {

        console.error(error);
        res.status(500).json({ success: false, message: 'Error occurred' });

    }

}

module.exports = {
    addList, deleteList, loadList, updateCompleted
}