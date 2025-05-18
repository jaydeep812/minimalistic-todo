import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

// src/pages/TodoDashboard.jsx
function TodoDashboard() {
  const token  = localStorage.getItem('token')
  const firstName = localStorage.getItem('firstName')
  const [todos,setTodos] = useState([])
  const navigate = useNavigate()
  async function markAsDone(todoId) {
      const res = await axios.put(
      'http://localhost:3000/updateTodo',
      { todoId },
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    const updatedTodo = res.data.updatedTodo;

    setTodos((prev) =>
      prev.map((todo ) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      )
    );
  }

  async function deleteTodo(todoId) {
  const res = await axios.delete('http://localhost:3000/deleteTodo', {
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    data: { todoId },
  });

  if (res.status === 200) {
    setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
  }
}
  useEffect(()=>{
   axios.get('http://localhost:3000/todos',{
      headers:{
        Authorization : 'Bearer '+ token
      }
    })
    .then(response=>{
      setTodos(response.data.todo)
      // console.log(response.data.todo)
    })
  },[])
  return (
    <div className="min-h-screen bg-white p-4 relative">
      {/* Header */}
      <header className="text-center text-3xl font-architects font-bold border-b-2 border-black py-4">
        Hello {firstName}
      </header>

      {/* Todo Cards */}
      <div className="flex justify-center items-center gap-8 flex-wrap mt-10">
        {todos.map((todo) => (
          <div key={todo._id} className={`w-60 h-60 rounded-2xl border-4 border-black font-architects flex flex-col justify-start items-center p-4 text-2xl transition-all duration-300 ${todo.done ? "bg-green-100 opacity-60" : ""}`}>
            <div className={`font-bold text-center text-3xl border-b-2 border-black w-full mb-2 pb-1 ${todo.done ? 'line-through' : ''}`}>
              {todo.title}
            </div>
            <div className={`text-center text-xl whitespace-pre-wrap w-full overflow-hidden break-words ${todo.done ? 'line-through' : ''}`}>
              {todo.description}
            </div>
            <div className="mt-auto w-full flex justify-between px-2">
              <svg onClick={() => markAsDone(todo._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <svg onClick={() => deleteTodo(todo._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-20 absolute bottom-6 right-6 cursor-pointer" onClick={()=>navigate('/createTodo')}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </div>
  )
}

export default TodoDashboard
