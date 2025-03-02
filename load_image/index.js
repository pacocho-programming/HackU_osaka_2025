window.addEventListener('load', function() { // 画面の読み込みが完了したら
	const element = document.querySelector('#loading'); // id="loading"に
	element.classList.add('loadEnd'); // class="loadEnd"を付与する
});