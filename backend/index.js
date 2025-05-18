const express = require('express')
const app = express()
const {User,Todo} = require('./db')
const zod = require('zod')
const jwt = require('jsonwebtoken')
require('dotenv').config({path:'./.env'})
const authMiddlware = require('./middleware')
const cors = require('cors')
const JWT_SECRET = process.env.JWT_SECRET


app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Welcome to Todo app')
})

const signupBody = zod.object({
    username  : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})

app.post('/signup',async(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const {success} = signupBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:'Invalid inputs'
        })
    }

    const response = await User.findOne({username})
    if(response!=null){
        return res.status(411).json({
            message:'User with same username already exists'
        })
    }
    const newUser = await User.create({
        username,
        password,
        firstName,
        lastName
    })
    const userId = newUser._id

    const token = jwt.sign({userId},JWT_SECRET)

    if(newUser){
        res.status(200).json({
            message:'New user successfully created',
            token : token
        })
    }

})

const signinBody = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: 'Invalid inputs'
        });
    }

    const response = await User.findOne({ username, password });

    if (!response) {
        return res.status(411).json({
            message: "Wrong credentials"
        });
    }

    const userId = response._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.status(200).json({
        message: 'User signed in successfully',
        token: token
    });
});


app.post('/createTodo',authMiddlware,async(req,res)=>{
    const title = req.body.title
    const description = req.body.description
    const userId = req.userId

    const newTodo = await Todo.create({
        title,
        description,
        userId
    })
    if(newTodo){
        res.status(200).json({
            message:'New Todo added'
        })
    }
})

app.get('/todos',authMiddlware,async(req,res)=>{
    const userId = req.userId
    const Todos = await Todo.find({userId:userId})
    res.json({
        todo : Todos.map(todo=>({
            title : todo.title,
            description : todo.description,
            done : todo.done,
            _id : todo._id
        }))
    })
})

app.put('/updateTodo', authMiddlware, async (req, res) => {
  try {
    const userId = req.userId;
    const todoId = req.body.todoId;

    // Get the todo to read current 'done' value
    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Toggle the 'done' field
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { done: !todo.done },
      { new: true }
    );

    return res.status(200).json({
      message: 'Todo updated successfully',
      updatedTodo
    });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.delete('/deleteTodo',authMiddlware, async(req,res)=>{
    const userId = req.userId
    const todoId = req.body.todoId
    const deleteTodo = await Todo.findOneAndDelete({_id:todoId,userId:userId})
    if(deleteTodo){
        res.status(200).json({
            message:'Todo deleted successfully'
        })
    }
})


app.listen(3000,()=>{
    console.log('Listening on port 3000')
})