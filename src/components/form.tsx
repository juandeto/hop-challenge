import { RefObject, FormEvent } from "react"

type FormTaskProps = {
    handleSubmitTask: (e: FormEvent<HTMLFormElement>) => void,
    inputRef: RefObject<HTMLInputElement>
}

export default function FormTask({inputRef, handleSubmitTask }: FormTaskProps) {

    return (
        <form className='flex justify-center px-2 md:p-5 my-8' action="POST" onSubmit={handleSubmitTask}>
          <input className='p-2 rounded-l-xl text-black md:w-1/3' ref={inputRef} type='text' name="description" placeholder='Escribí tu tarea acá' />
          <button className='bg-primary rounded-r-xl hover:bg-primaryHover transition-colors uppercase' type='submit'>agregar</button>
        </form>
    )
}