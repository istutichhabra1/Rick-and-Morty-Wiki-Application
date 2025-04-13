let page = 1;
const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateClock() {
  const clock = document.getElementById("footerClock");
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  clock.textContent = `${now.toLocaleTimeString()} ${now.toLocaleDateString('en-US', options)}`;
}
setInterval(updateClock, 1000);
updateClock();

function fetchCharacters(page) {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(res => res.json())
    .then(data => {
      gallery.innerHTML = "";
      data.results.slice(0, 6).forEach(char => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${char.image}" alt="${char.name}" />
          <h3>${char.name}</h3>
          <p>${char.species}</p>
          <p>${char.status}</p>
        `;
        card.onclick = () => {
          window.open(`character.html?id=${char.id}`, '_blank');
        };
        gallery.appendChild(card);
      });
    });
}

prevBtn.onclick = () => { if (page > 1) fetchCharacters(--page); };
nextBtn.onclick = () => { fetchCharacters(++page); };
fetchCharacters(page);
