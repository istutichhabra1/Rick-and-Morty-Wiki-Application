function updateClock() {
  const clock = document.getElementById("footerClock");
  const now = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  clock.textContent = `${now.toLocaleTimeString()} ${now.toLocaleDateString('en-US', options)}`;
}
setInterval(updateClock, 1000);
updateClock();

const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
  .then(res => res.json())
  .then(char => {
    const detailDiv = document.getElementById("character-detail");
    const episodeCount = char.episode.length;
    detailDiv.innerHTML = `
      <h1>${char.name}</h1>
      <img src="${char.image}" alt="${char.name}" />
      <p><strong>Status:</strong> ${char.status}</p>
      <p><strong>Species:</strong> ${char.species}</p>
      <p><strong>Type:</strong> ${char.type || 'N/A'}</p>
      <p><strong>Gender:</strong> ${char.gender}</p>
      <p><strong>Origin:</strong> ${char.origin.name}</p>
      <p><strong>Current Location:</strong> ${char.location.name}</p>
      <p><strong>Episode Appearances:</strong> ${episodeCount}</p>
    `;
  });
