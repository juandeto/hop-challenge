import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import App from "./App";

describe("todo list", (): void => {
    afterEach(cleanup)

    it('it should have the correct title', (): void => {
        render(<App />)

        screen.getByText(/tablero kan ban/i)
    })

    it('should render an input with right placeholder and a button with "add" as label', (): void => {
        render(<App />)

        screen.getByPlaceholderText(/escribí tu tarea acá/i)
        screen.getByRole("button", {name: /agregar/i})
    })

    it('should have three columns with correct titles', ():void => {
        render(<App />)
        const columns = screen.getAllByRole('heading', {level: 2})

        expect(columns).toHaveLength(3)
        expect(columns[0].textContent).toMatch(/sin realizar/i)
        expect(columns[1].textContent).toMatch(/en proceso/i)
        expect(columns[2].textContent).toMatch(/realizado/i)
    })

    it('input should work', ():void => {
        render(<App />)

        const input: HTMLInputElement = screen.getByRole("textbox")
        
        fireEvent.change(input, {target: {value: "comprar milanesas"}})
        expect(input.value).toEqual("comprar milanesas");
    })

    it('after submitting input has to clear and task has to exist in the first row of to-do column', ():void => {
        render(<App />)

        const input: HTMLInputElement = screen.getByRole("textbox")
        
        fireEvent.change(input, {target: {value: "comprar milanesas"}})
        
        expect(input.value).toEqual("comprar milanesas");

        const submitButton = screen.getByRole("button", {name: /agregar/i})
        fireEvent.click(submitButton)
        expect(input.value).toEqual("");

        const todoContainer = screen.getByTestId("todo-container")
        expect(todoContainer.textContent).toMatch("comprar milanesas")
    })

    it('task can be moved between columns', (): void => {
        render(<App />)

        const input: HTMLInputElement = screen.getByRole("textbox")
        
        fireEvent.change(input, {target: {value: "comprar milanesas"}})
        
        expect(input.value).toEqual("comprar milanesas");

        const submitButton = screen.getByRole("button", {name: /agregar/i})
        fireEvent.click(submitButton)
        expect(input.value).toEqual("");

        const todoContainer = screen.getByTestId("todo-container")
        expect(todoContainer.textContent).toMatch("comprar milanesas")

        const startButton = todoContainer.querySelector('button')
        expect(startButton?.textContent).toMatch(/comenzar/i)

        if(startButton){
            fireEvent.click(startButton)
        }

        const doingContainer = screen.getByTestId("doing-container")
        expect(doingContainer.textContent).toMatch("comprar milanesas")

        const finishButton = doingContainer.querySelector('button')
        expect(finishButton?.textContent).toMatch(/finalizada/i)

        if(finishButton){
            fireEvent.click(finishButton)
        }

        const doneContainer = screen.getByTestId("done-container")
        expect(doneContainer.textContent).toMatch("comprar milanesas")

        const deleteButton = doneContainer.querySelector('button')
        expect(deleteButton?.textContent).toMatch(/eliminar/i)

        if(deleteButton){
            fireEvent.click(deleteButton)
        }

        expect(doneContainer.textContent).not.toMatch("comprar milanesas")
    })

})