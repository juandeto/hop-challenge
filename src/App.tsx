import { FormEvent, useRef, useState } from 'react'
import FormTask from './components/form';
import StatusColumn from './components/statusColumn';
import { Task, Status } from 'types';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmitTask(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    const formData = new FormData(e.currentTarget);
    const description = formData.get('description') as string

    if(!description?.trim().length) return      
  
    const newTask: Task = {
        description,
        status: "todo",
        id: uuidv4(),
      }

      setTasks([newTask, ...tasks])

      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
  }

  
  function handleTaskChange(id: string, newStatus: Status) {
    let newtasks = []
    if(newStatus === "deleted") {
      newtasks = tasks.filter((task) =>task.id !== id);
    } else {
      newtasks = tasks.map((task) => task.id === id ? 
                        { ...task, status: newStatus } : task);
    }

    setTasks(newtasks);
  }

  
  const todoTasks    = tasks.filter(task => task.status === 'todo')
  const ongoingTasks = tasks.filter(task => task.status === 'doing')
  const doneTasks    = tasks.filter(task => task.status === 'done')

  return (
    <main className='container h-screen mx-auto flex-col p-3'>
        <h1 className='text-center text-4xl md:text-5xl'>Tablero Kan Ban</h1>
        <FormTask inputRef={inputRef} handleSubmitTask={handleSubmitTask} />
        <section>
          <div className='flex flex-col md:flex-row justify-stretch items-start gap-2'>
            <StatusColumn
              testId="todo-container"
              title="Sin realizar"
              tasks={todoTasks}
              handleTaskAction={handleTaskChange}
              labelActionButton="Comenzar"
              newStatus="doing"
            />
              <StatusColumn 
              testId="doing-container"
              title="En proceso"
              tasks={ongoingTasks}
              handleTaskAction={handleTaskChange}
              labelActionButton="Finalizada"
              newStatus="done"
            />
             <StatusColumn 
              testId="done-container"
              title="Realizado"
              tasks={doneTasks}
              handleTaskAction={handleTaskChange}
              labelActionButton="Eliminar"
              newStatus="deleted"
            />
          </div>
        </section>
    </main>
  )
}

export default App
