document.getElementById('event-info-btn').addEventListener('click', function(e) {
  e.preventDefault();  // デフォルトのリンク動作を無効化

  // 位置情報を取得
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // サーバーにリクエストを送る（APIキーはサーバー側で管理）
      fetch(`/get-events?lat=${latitude}&lng=${longitude}`)
        .then(response => response.json())
        .then(data => {
          if (data.events) {
            // イベント情報をlocalStorageに保存して、notice.htmlに渡す
            localStorage.setItem('events', JSON.stringify(data.events));
            // notice.htmlに遷移
            window.location.href = 'notification/notice.html';  // 遷移
          } else {
            alert('イベント情報が見つかりませんでした。');
          }
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
