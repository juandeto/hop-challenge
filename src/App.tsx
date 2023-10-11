import FormTask from './components/form';
import { FormEvent, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Task, Status } from 'types';
import StatusColumn from './components/statusColumn';

function App() {
  const [list, setList] = useState<Task[]>([])
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

      setList([newTask, ...list])

      if (inputRef.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
  }

  
  function handleTaskChange(id: string, newStatus: Status) {
    if(newStatus === "deleted") {
      setList((prevTasks) => {
        return prevTasks.filter((task) =>
          task.id !== id
        );
      });
    } else {
      setList((prevTasks) => {
        return prevTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        );
      });

    }
  }

  
  const todoTasks = list.filter(task => task.status === 'todo')
  const ongoingTasks = list.filter(task => task.status === 'doing')
  const doneTasks = list.filter(task => task.status === 'done')

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
