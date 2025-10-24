const axios = require('axios')

async function getTodos() {
    try{
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    const data = response.data;


    const completedTodo = data.filter(todo => todo.completed);
    const uncompletedTodo = data.filter(todo => !todo.completed)

    const total = data.length;
    const completed = completedTodo.length;
    const uncompleted = uncompletedTodo.length;

    const percentCompleted = (completed/total)*100;
    const percentUncompleted = (uncompleted/total)*100;

    const percent = (completed/data);

    console.log(`Total: ${total}`)
    console.log(`Completed: ${completed} (${percentCompleted.toFixed(0)}%)`)
    console.log(`Uncompleted: ${uncompleted} (${percentUncompleted.toFixed(0)}%)`)

    const barLength = 20;
    const filledLength = (percentCompleted/100)*barLength;
    const bar = "█".repeat(filledLength) + "░".repeat(barLength-filledLength);
    console.log(`Progresss: ${bar} ${percentCompleted}%`);

    } catch(error) {
        console.log(`Error: ${error.message}`)
    }
}

getTodos()
