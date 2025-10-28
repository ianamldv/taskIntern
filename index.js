const axios = require('axios')

async function getTodos() {
    try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
    console.log(response)
    return response.data;
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return [];
    }

    };

async function showFirst10() {
    const data = await getTodos();
    const first10 = data.slice(0, 10);
    console.log("Fetching todos...");

    first10.forEach(todo => {
        const status = todo.completed ? '✓' : 'x';
        console.log(`${todo.id}. [${status}] ${todo.title}`);
        });
    console.log("           ");
    };

async function showCompleted() {
    const data = await getTodos();    
    const completedTodo = data.filter(todo => todo.completed);
    console.log(completedTodo);
    console.log(`Total: ${completedTodo.length}`)
}

async function showUncompleted() {
    const data = await getTodos();    
    const uncompletedTodo = data.filter(todo => !todo.completed);
    console.log(uncompletedTodo);
    console.log(`Total: ${uncompletedTodo.length}`)
}

async function showStatistics() {
    const data = await getTodos();
    const total = data.length;
    const completedTodo = data.filter(todo => todo.completed);
    const uncompletedTodo = data.filter(todo => !todo.completed)
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
    };

const command = process.argv[2];


(async () => {
    if (command === 'first10') {
        await showFirst10();
    } else if (command === 'stats') {
        await showStatistics()
    } else if (command === 'completed') {
        await showCompleted();
    } else if (command === 'uncompleted') {
        await showUncompleted();
    } else if (command === 'all') {
        await getTodos();
    } else {
        console.log(`
    Explanation:

    node index.js all -> shows all todos
    node index.js stats -> shows statistics 
    node index.js first10 -> shows first todos
    node index.js completed -> shows only the completed todos
    node index.js uncompleted -> shows only the uncompleted todos
            `)
    };
})
();
