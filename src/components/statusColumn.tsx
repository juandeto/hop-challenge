import { Status, Task } from '../types'

type StatusColumnProps = {
    tasks: Task[],
    title: string,
    handleTaskAction: (id: string, newStatus: Status) => void,
    labelActionButton: string,
    testId: string,
    newStatus: Status
}

export default function StatusColumn({tasks, title, handleTaskAction, labelActionButton, newStatus, testId}: StatusColumnProps) {
    return (
        <div data-testid={testId} className="flex-grow w-full md:basis-[33%]">
        <h2 className="text-center border-b-2">{title}</h2>
        <div className="task-container">
        {tasks.map(task => <div className="border my-2 rounded-sm hover:shadow-md hover:shadow-primary" key={task.id}>
          <p className="p-2">{task.description}</p>
          <button className='ml-auto block m-2' onClick={() => handleTaskAction(task.id, newStatus)}>{labelActionButton}</button>
        </div>)}
        </div>
      </div>
    )
}