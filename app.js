const cards = document.getElementById("card-dinamicas");
const template = document.getElementById("template").content;
const url = "https://rickandmortyapi.com/api/character";
 
document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

const fetchData = async () => {
  try {
    loadingData(true);
    const res = await fetch(url);
    const data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.log(error);
  } finally {
    loadingData(false);
  }
};

const pintarCards = (data) => {
  const fragment = document.createDocumentFragment();
  data.results.forEach((item) => {
    
    const clone = template.cloneNode(true);
    clone.querySelector("h5").textContent = item.name;
    clone.querySelector(".text-secundary").textContent = item.species;
    clone.querySelector("img").setAttribute("src", item.image);
 
    // usamos el fragment para evitar el reflow
    fragment.appendChild(clone);
  });

  cards.appendChild(fragment);
};

const loadingData = (estado) => {
  const loading = document.getElementById("loading");
  estado ? loading.classList.remove("d-none") : loading.classList.add("d-none");
};
