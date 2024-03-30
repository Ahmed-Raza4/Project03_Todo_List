#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
//array
let todoList = [];
//function
let mainMenu = async () => {
    const { action } = await inquirer.prompt({
        "type": "list",
        "name": "action",
        "message": "what would you like to do?",
        "choices": ["Add Task", "Views List", "Mark as Complete", "Delete Task", "Exit"],
    });
    switch (action) {
        case "Add Task":
            await addTask();
            break;
        case "Views List":
            viewList();
            break;
        case "Mark as Complete":
            await markAsCompleted();
            break;
        case "Delete Task":
            await deleteTask();
            break;
        case "Exit":
            console.log(chalk.bold.blueBright("Good Bye"));
            return;
    }
    mainMenu();
};
let addTask = async () => {
    let { task } = await inquirer.prompt({
        type: "input",
        name: "task",
        message: "Enter the Task",
    });
    todoList.push({ task, completed: false });
    console.log(chalk.bold.green("Task Added Successfully"));
};
let viewList = () => {
    console.log(chalk.bgYellow.bold.white("***** To Do List ***** "));
    todoList.forEach((item, index) => {
        console.log(`${index + 1}).[${item.completed ? 'x' : ' '}] ${item.task}`);
    });
    console.log(" ********************** ");
};
let markAsCompleted = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: "Enter the index of the task to mark as complete",
    });
    if (index < 1 || index > todoList.length) {
        console.log(chalk.bold.red("Invalid Task Number, Please Try Again"));
        return;
    }
    todoList[index - 1].completed = true;
    console.log(chalk.bold.green("Task Marked as Completed"));
};
let deleteTask = async () => {
    let { index } = await inquirer.prompt({
        type: "number",
        name: "index",
        message: "Enter the index of the task to delete",
    });
    if (index < 1 || index > todoList.length) {
        console.log(chalk.bold.red("Invalid Task Number, Please Try Again"));
        return;
    }
    todoList.splice(index - 1, 1);
    console.log(chalk.bold.green("Task Deleted Successfully"));
};
mainMenu();
