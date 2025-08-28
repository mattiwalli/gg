let todos = JSON.parse(localStorage.getItem("todos")) || [];

const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo, i) => {
    const li = document.createElement("li");
    li.textContent = todo.done ? "[✓] " + todo.text : todo.text;
    li.style.cursor = "pointer";
    li.onclick = () => {
      todos[i].done = !todos[i].done;
      save();
      render();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      todos.splice(i, 1);
      save();
      render();
    };

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

addBtn.onclick = () => {
  const text = input.value.trim();
  if (text) {
    todos.push({ text, done: false });
    input.value = "";
    save();
    render();
  }
};

clearBtn.onclick = () => {
  if (confirm("Rensa alla todos?")) {
    todos = [];
    save();
    render();
  }
};

render();
