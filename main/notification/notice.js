// localStorageからイベント情報を取得
const events = JSON.parse(localStorage.getItem('events'));

const eventListElement = document.getElementById('event-list');
eventListElement.innerHTML = ''; // 最初にコンテンツをクリア

if (events && events.length > 0) {
  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('content-card');
    eventCard.innerHTML = `
      <h2>${event.name.text}</h2>
      <p>${event.description.text}</p>
      <a href="${event.url}" class="btn">詳細を見る</a>
    `;
    eventListElement.appendChild(eventCard);
  });
} else {
  eventListElement.innerHTML = '<p>周辺で開催中のイベントはありません。</p>';
}
