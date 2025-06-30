// here the reason of async is that when the data is collected from body,we have to wait for if we dont wait and the save func will execute first the empty obj is stored and we have the msg that you have put data in db correctlt though its not correct.
import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user:req.user._id
  });


  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created Successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "There is Error in Todo Creation" });
  }
};

export const fetchAllTodo = async (req, res) => {
  try {
      //for fetching all todos present in database
    const todos = await Todo.find({user:req.user._id}); 
    res.status(201).json({ message: "all Todos fetched Successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "There is Error in Todo Fetching" });
  }
};
export const updateTodo = async (req,res) => {
    try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body ,{
        new: true,
    })
    res.status(201).json({message:"Updating successfully",updatedTodo})
    } catch (error) {
     console.log(error);
    res.status(400).json({ message: "There is Error in Todo Updating" });
    }
}
export const deleteTodo = async (req,res) => {
    try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
    if(!deleteTodo){
      res.status(404).json({message:"no todo found"})
    }
    res.status(201).json({message:"deleted successfully"})
    } catch (error) {
     console.log(error);
    res.status(400).json({ message: "There is Error in Todo Deleting" });
    }
}
