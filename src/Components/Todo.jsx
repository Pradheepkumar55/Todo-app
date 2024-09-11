import React , {useState} from 'react'
import './Todo.css'

const Todo = () => {
    const[todos ,setTodos] = useState([]);
    const[task ,setTask] =useState('');
    const[description,setDescription] = useState('');
    const[statusFilter,setStatusFilter] = useState('all');

    const handelAddTodo= () =>{
        if(task.trim() && description.trim()){
            const newTodo = {
                task,
                description,
                status :'Not Completed',
            };
            setTodos([...todos,newTodo]);
            setTask('');
            setDescription('');
        };
    }    


        const handelDeleteTodo = (index) =>{
            const newTodos = todos.filter((_, i)=> i !==index);
            setTodos(newTodos);
        };

        const handelEditTodo =(index) => {
            const editedTask = prompt('Edit task:',todos[index].task);
            const editedDescription = prompt('Edit description:',todos[index].description);
            const editedStatus = todos[index].status
            if(editedTask && editedDescription){
                const newTodos = [...todos];
                newTodos[index] = {task:editedTask, description:editedDescription,status: editedStatus};
                setTodos(newTodos);
            }
        };

        const handelStatusChange = (index,status) =>{
            const newTodos = [...todos];
            newTodos[index].status = status;
            setTodos(newTodos);

        };

        const handelStatusFilterChange =(e) =>{
            setStatusFilter(e.target.value);
        };

        const filteredTodos = todos.filter(todo => {
             if(statusFilter === 'all') return true;
             return todo.status === statusFilter;
        });
    


return (
    <div className="container mt-5">
    <h1 className="text-center mb-4" style={{color: '#12ac89'}}>My Todo</h1>
    <div className="row mb-3">
      <div className="col">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="form-control"
          placeholder="Todo Name"
          style={{border: '2px solid #12ac89'}}
        />
      </div>
      <div className="col">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          placeholder="Todo Description"
          style={{border: '2px solid #12ac89'}}
        />
      </div>
      <div className="col-auto">
        <button onClick={handelAddTodo} className="btn btn-success" style={{border: 'none'}}>Add Todo</button>
      </div>
    </div>
    <div className="row mb-4 justify-content-end">
      <div className="col-auto">
        <div className="form-group">
          <h5>Status Filter:</h5>
          <select className="form-control" value={statusFilter} onChange={handelStatusFilterChange} style={{width: '150px'}}>
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>
      </div>
    </div>
    <div className="row">
      <h5>My Todos</h5>
      {filteredTodos.map((todo, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card" style={{backgroundColor: '#12ac89', color: 'white'}}>
            <div className="card-body">
              <h5 className="card-title">Name: {todo.task}</h5>
              <p className="card-text">Description: {todo.description}</p>
              <div className="form-group">
                <label>Status:</label>
                <select
                  className="form-control"
                  value={todo.status}
                  onChange={(e) => handelStatusChange(index, e.target.value)}
                  style={{backgroundColor: '#f8f9fa'}}
                >
                  <option value="Completed">Completed</option>
                  <option value="Not Completed">Not Completed</option>
                </select>
              </div>
              <button className="btn btn-primary mr-2" onClick={() => handelEditTodo(index)} style={{backgroundColor: '#007bff', border: 'none'}}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handelDeleteTodo(index)} style={{backgroundColor: '#dc3545', border: 'none', marginLeft: '15px'}}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}


export default Todo
