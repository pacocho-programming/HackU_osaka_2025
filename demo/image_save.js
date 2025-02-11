const fileInput = document.getElementById('fileInput');
    const image = document.getElementById('image');
    
    fileInput.addEventListener('change', 
    //コールバック関数
    function(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();//FileReader()はファイルを非同期的に読み込むためのWeb API
        reader.onload = function(e) {
          image.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });