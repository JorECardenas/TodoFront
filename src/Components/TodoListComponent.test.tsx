import {fireEvent, render, screen} from "@testing-library/react";
import TodoListComponent from "./TodoListComponent";


test("Todo List Component renders correctly", () => {

    render(<TodoListComponent/>)

    const createButton = screen.getByText("+ Create To Do")

    expect(createButton).toBeInTheDocument()


})

test("CreateTodoModal renders correctly", async () => {

    render(<TodoListComponent/>)

    const createButton = screen.getByText("+ Create To Do")

    fireEvent.click(createButton)

    const modaltitle = screen.getByText("Create To Do")

    expect(modaltitle).toBeInTheDocument();



})