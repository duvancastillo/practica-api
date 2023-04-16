const formulario = document.getElementById("formulario");
const pintarTodo = document.getElementById("pintarTodo");
const templateTodo = document.getElementById("templateTodo").content;
const alert = document.querySelector(".alert");

let todos = [];

const agregarTodo = (todo) => {
  const objetoTodo = {
    nombre: todo,
    uid: `${Date.now()}`,
  };
  todos.push(objetoTodo);
  pintarTodos();
};

const pintarTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
  pintarTodo.textContent = "";
  const fragmet = document.createDocumentFragment();
  todos.forEach((item) => {
    const clone = templateTodo.cloneNode(true);
    clone.querySelector(".lead").textContent = item.nombre;
    clone.querySelector(".btn").dataset.id = item.uid;

    fragmet.appendChild(clone);
  });

  pintarTodo.appendChild(fragmet);
};

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-danger")) {
    todos = todos.filter((item) => item.uid !== e.target.dataset.id);
    pintarTodos();
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  alert.classList.add("d-none");
  const data = new FormData(formulario);
  const [todo] = [...data.values()];
  if (!todo.trim()) {
    alert.classList.remove("d-none");
    return;
  }
  agregarTodo(todo);
});

document.addEventListener("DOMContentLoaded", (e) => {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    pintarTodos();
  }
});
