        const inputImage = document.getElementById("input_image");
        const submitButton = document.getElementById("submit");
        const resultArea = document.getElementById("result_area");
        const nVertical = document.getElementById("n_vertical");
        const nHorizontal = document.getElementById("n_horizontal");

        submitButton.addEventListener("click", () => {
            const vertical = parseInt(nVertical.value);
            const horizontal = parseInt(nHorizontal.value);
            const file = inputImage.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    // 画像の幅と高さを取得
                    const imgWidth = img.width;
                    const imgHeight = img.height;

                    // 分割サイズの計算
                    const splitWidth = Math.floor(imgWidth / horizontal);
                    const splitHeight = Math.floor(imgHeight / vertical);

                    // canvasを作成して画像を分割
                    const canvas = document.createElement("canvas");
                    const context = canvas.getContext("2d");

                    // 結果表示用のテーブル
                    const table = document.createElement("table");

                    // 画像を分割してテーブルに追加
                    for (let y = 0; y < vertical; y++) {
                        const tr = document.createElement("tr");

                        for (let x = 0; x < horizontal; x++) {
                            // 分割した部分をcanvasに描画
                            context.clearRect(0, 0, canvas.width, canvas.height);
                            canvas.width = splitWidth;
                            canvas.height = splitHeight;
                            context.drawImage(
                                img, 
                                x * splitWidth, 
                                y * splitHeight, 
                                splitWidth, 
                                splitHeight, 
                                0, 0, 
                                splitWidth, 
                                splitHeight
                            );

                            // 分割した画像をimgタグに変換
                            const td = document.createElement("td");
                            const imgElement = document.createElement("img");
                            imgElement.src = canvas.toDataURL();
                            td.appendChild(imgElement);
                            tr.appendChild(td);
                        }

                        table.appendChild(tr);
                    }

                    // 結果表示エリアにテーブルを追加
                    resultArea.innerHTML = ""; // 前回の結果を消去
                    resultArea.appendChild(table);
                };

                img.src = reader.result;
            };
        });