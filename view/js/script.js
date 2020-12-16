const form = document.forms.namedItem("form");
const input = document.getElementById("task");
let tasks = [];

/*================================================
CREATE TASK
==================================================*/
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const xhr = new XMLHttpRequest();
  const formData = new FormData(form);

  const input_task = document.getElementsByClassName("input_task");
  const validation = document.getElementsByClassName("validation");

  let arrayTasks = JSON.parse(localStorage.getItem("tasks"));
  if (arrayTasks !== null) {
    tasks = arrayTasks;
  }

  if (input.value === "") {
    input_task[0].classList.add("validation_input");
    validation[0].classList.add("validation_show");
  } else {
    input_task[0].classList.remove("validation_input");
    validation[0].classList.remove("validation_show");

    xhr.open("POST", "ajax/task.ajax.php");
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        tasks.push(JSON.parse(xhr.response));
        addElement(JSON.parse(xhr.response));
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } else {
        console.log("Error en la petición: Codigo - " + xhr.status);
      }
    });
    xhr.send(formData);
    input.value = "";
  }
});

const ul = document.getElementById("list");
/*================================================
DETECTAR EVENTO Y EJECUTAR LA ACCION CORRESPONDIENTE
==================================================*/
ul.addEventListener("click", (e) => {
  const target = getEventTarget(e);

  if (target.tagName === "BUTTON") {
      deleteTaskElemnt(e);
  }
  if (target.tagName === "INPUT") {
      updateTask(e);
  }
});

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}
/*================================================
UPDATE STATUS TASK
==================================================*/
const updateTask = (e) => {
  const xhr = new XMLHttpRequest();
  const idTaskStatus = e.target.getAttribute("idTask");
  const formData = new FormData();
  let status;
  const spanStatus = e.target.parentNode.nextSibling.firstChild;
  spanStatus.classList.remove("pending");
  spanStatus.classList.add("complited");
  if (e.target.checked) {
    status = 1;
    spanStatus.classList.replace("pending", "complited");
    spanStatus.textContent = "Completada";
  } else {
    status = 0;
    spanStatus.classList.replace("complited", "pending");
    spanStatus.textContent = "Pendiente";
  }
  xhr.open("POST", "ajax/task.ajax.php");
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      updateStatus(idTaskStatus, status);
    } else {
      console.log("Error en la petición: Codigo - " + xhr.status);
    }
  });
  formData.append("idTaskStatus", idTaskStatus);
  formData.append("status", status);
  xhr.send(formData);
};
/*================================================
DELETE TASK
==================================================*/
const deleteTaskElemnt = (e) => {
  const xhr = new XMLHttpRequest();

  const idTask = e.target.getAttribute("idTask");

  xhr.open("DELETE", `ajax/task.ajax.php?idTask=${idTask}`);
  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      deleteTask(idTask);
      e.target.parentNode.parentNode.remove();
    } else {
      console.log("Error en la petición: Codigo - " + xhr.status);
    }
  });
  xhr.send();
};
/*================================================
FUNCION PARA AÑADIR LAS TAREAS A LA LISTA
==================================================*/
const addElement = (task) => {
  const ul = document.getElementById("list");

  const fragment = document.createDocumentFragment();

  const li = document.createElement("li");
  li.classList.add("box", "list_element");

  const divInfo = document.createElement("div");
  const divAction = document.createElement("div");

  divInfo.classList.add("info");
  divAction.classList.add("action");

  const checkbox = document.createElement("input");
  checkbox.classList.add("check_status");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("idTask", task.id);

  const p = document.createElement("p");
  p.textContent = task.text;

  divInfo.appendChild(checkbox);
  divInfo.appendChild(p);

  const span = document.createElement("span");
  span.classList.add("status", "pending");
  span.textContent = "Pendiente";

  const button = document.createElement("button");
  button.classList.add("btn_delete");
  button.setAttribute("idTask", task.id);
  button.textContent = "X";

  divAction.appendChild(span);
  divAction.appendChild(button);

  li.appendChild(divInfo);
  li.appendChild(divAction);

  fragment.append(li);

  ul.appendChild(fragment);
};

/*================================================
SE CARGAN LOS DATOS DEL DOM PARA CREAR LAS TAREAS
==================================================*/
let allTask = "";
if (localStorage.getItem("tasks") !== null) {
  let arrayTasks = JSON.parse(localStorage.getItem("tasks"));

  const ul = document.getElementById("list");
  arrayTasks.map((task) => {
    allTask += '<li class="box list_element">' + '<div class="info">';
    if (task.completed == 1) {
      allTask += `<input type="checkbox" class="check_status" idTask=${task.id} checked>`;
    } else {
      allTask += `<input type="checkbox" class="check_status" idTask=${task.id}>`;
    }
    allTask += `<p>${task.text}</p>` + "</div>" + '<div class="action">';
    if (task.completed == 1) {
      allTask += '<span class="status complited">Completada</span>';
    } else {
      allTask += '<span class="status pending">Pendiente</span>';
    }
    allTask +=
      `<button class="btn_delete" id="delete_task" idTask=${task.id}>X</button>` +
      "</div>" +
      "</li>";
  });
  ul.innerHTML = allTask;
}
/*================================================
QUITAR DEL DOM LA TAREA ELIMINADA
==================================================*/
const deleteTask = (idTask) => {
  const arrayTasks = JSON.parse(localStorage.getItem("tasks"));
  const newArrayTasks = JSON.stringify(
    arrayTasks.filter((task) => task.id !== idTask)
  );
  localStorage.setItem("tasks", newArrayTasks);
};

/*================================================
ACTUALIZAR EL STATUS EN EL DOM
==================================================*/
const updateStatus = (idTask, status) => {
  const arrayTasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < arrayTasks.length; i++) {
    if (arrayTasks[i].id === idTask) {
      arrayTasks[i].completed = status;
    }
  }
  const newArrayTasks = JSON.stringify(arrayTasks);
  localStorage.setItem("tasks", newArrayTasks);
};
