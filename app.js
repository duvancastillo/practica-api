const formulario = document.getElementById("formulario");
const cardsEstudiantes = document.getElementById("cardsEstudiantes");
const cardsProfesores = document.getElementById("cardsProfesores");
const templateEstudiantes = document.getElementById(
  "templateEstudiantes"
).content;
const templateProfesores =
  document.getElementById("templateProfesores").content;

const estudiantes = [];
const profesores = [];
//delegacion de eventos para los botones de aproba y reprobar 
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    if (e.target.matches(".btn-success")) {
      estudiantes.map((item) => {
        if (item.id === e.target.dataset.id) {
          item.setEstado = true;
        }
        return item;
      });
    }
    if (e.target.matches(".btn-danger")) {
      estudiantes.map((item) => {
        if (item.id === e.target.dataset.id) {
          item.setEstado = false;
        }
        return item;
      });
    }
    Persona.pintarPersona(estudiantes, "Estudiante");
  }
});
// clase general para luego heredar a estudiante  profesor
class Persona {
  constructor(nombre, edad, id) {
    this.nombre = nombre;
    this.edad = edad;
    this.id = id;
  }
  //metodp estatico para pintar tanto profesor como estudiate
  static pintarPersona(personas, tipo) {
    if (tipo === "Estudiante") {
      cardsEstudiantes.textContent = "";
      const fragmet = document.createDocumentFragment();
      personas.forEach((item) => {
        fragmet.appendChild(item.agregarEstudiante());
      });
      cardsEstudiantes.appendChild(fragmet);
    }
    if (tipo === "Profesor") {
      cardsProfesores.textContent = "";
      const fragmet = document.createDocumentFragment();
      personas.forEach((item) => {
        fragmet.appendChild(item.agregarProfesor());
      });
      cardsProfesores.appendChild(fragmet);
    }
  }
}
//clase de estiante herdando las propiedades de Persona
class Estudiante extends Persona {
  #estado = false;
  #estudiante = "estudiante";
  set setEstado(estado) {
    this.#estado = estado;
  }

  get getEstudiante() {
    return this.#estudiante;
  }
//agregadndo nuevo estudiante al templateEstudiante
  agregarEstudiante() {
    const clone = templateEstudiantes.cloneNode(true);
    clone.querySelector(".text-primary").textContent = this.nombre;
    clone.querySelector("h6").textContent = this.getEstudiante;
    clone.querySelector(".lead").textContent = this.edad;
    if (this.#estado) {
      clone.querySelector(".badge").className = "badge bg-success";
      clone.querySelector(".btn-success").disabled = true;
      clone.querySelector(".btn-danger").disabled = false;
    } else {
      clone.querySelector(".badge").className = "badge bg-danger";
      clone.querySelector(".btn-danger").disabled = true;
      clone.querySelector(".btn-success").disabled = false;
    }
    clone.querySelector(".badge").textContent = this.#estado
      ? "Aprobado"
      : "Reprobado";
    clone.querySelector(".btn-success").dataset.id = this.id;
    clone.querySelector(".btn-danger").dataset.id = this.id;
    return clone;
  }
}
//clase Profesor herando las propiedades de la clase general Persona
class Profesor extends Persona {
  #profesor = "profesor";
  //agregando profesoras al templateProfesores
  agregarProfesor() {
    const clone = templateProfesores.cloneNode(true);
    clone.querySelector("h5").textContent = this.nombre;
    clone.querySelector("h6").textContent = this.#profesor;
    clone.querySelector(".lead").textContent = this.edad;
    return clone;
  }
}
generarIdUnico1 = () => Math.random().toString(30).substring(2);

// se captura los datos desde el formulario para instanciar porfesores y alumnos
formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const datos = new FormData(formulario);

  const [nombre, edad, opcion] = [...datos.values()];
  const id = generarIdUnico1();
  if (opcion === "Estudiante") {
    const estudiante = new Estudiante(nombre, edad, id);
    estudiantes.push(estudiante);
    Persona.pintarPersona(estudiantes, opcion);
  }
  if (opcion === "Profesor") {
    const profesor = new Profesor(nombre, edad, id);
    profesores.push(profesor);
    Persona.pintarPersona(profesores, opcion);
  }
});
