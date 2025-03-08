// 最新の更新情報ボタンをクリックしたときの動作
document.getElementById('event-info-btn').addEventListener('click', function(e) {
  e.preventDefault();  // デフォルトのリンク動作を無効化

  // 位置情報を取得
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // イベント情報を取得するAPIのURL（例としてEventbriteのAPIを仮定）
      const apiUrl = `https://www.eventbriteapi.com/v3/events/search/?location.latitude=${latitude}&location.longitude=${longitude}&token=COO7TH2PITYLM3ZJZKAN`;

      // APIからイベント情報を取得
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // イベント情報をlocalStorageに保存して、notice.htmlに渡す
          localStorage.setItem('events', JSON.stringify(data.events));

          // notice.htmlに遷移
          window.location.href = 'notice.html';
        })
        .catch(error => {
          console.error('Error fetching events:', error);
          alert('イベント情報の取得に失敗しました。');
        });
    }, function() {
      alert('位置情報の取得に失敗しました。');
    });
  } else {
    alert('位置情報を取得できません。');
  }
});
