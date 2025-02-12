        const inputImage = document.getElementById("input_image");//ファイルの読み込み

        const submitButton = document.getElementById("submit");//分割ボタン

        const nVertical = document.getElementById("n_vertical");//縦に分割する数

        const nHorizontal = document.getElementById("n_horizontal");//横に分割する数

        const resultArea = document.getElementById("result_area");//分割された写真が表示される

        

        

        submitButton.addEventListener("click", () => {
            const vertical = parseInt(nVertical.value);
            const horizontal = parseInt(nHorizontal.value);
            const file = inputImage.files[0]; // ユーザーが選択した最初のファイルを指す
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
        
                    const imageArray = [];
        
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
                            imgElement.width = 100;
                            td.appendChild(imgElement);
                            tr.appendChild(td);
        
                            // 画像データを配列に格納
                            imageArray.push(canvas.toDataURL());
        
                            // 画像をドラッグ可能にする
                            imgElement.style.position = "relative";  // 相対位置にすることで移動可能にする
                            imgElement.draggable = true;  // ドラッグ可能にする
        
                            // ドラッグ開始時の処理
                            imgElement.addEventListener("dragstart", (event) => {
                                event.dataTransfer.setData("text/plain", `${x},${y}`);  // どの画像かを特定するための情報を保存
                                event.dataTransfer.setDragImage(imgElement, 0, 0);  // ドラッグ画像の位置を設定
                            });
        
                            // ドラッグ終了時の処理
                            imgElement.addEventListener("dragend", (event) => {
                                const startPos = event.dataTransfer.getData("text/plain").split(",");
                                const startX = parseInt(startPos[0]);
                                const startY = parseInt(startPos[1]);
        
                                // 画像が移動した新しい位置を設定
                                const deltaX = event.clientX - imgElement.width / 2;
                                const deltaY = event.clientY - imgElement.height / 2;
        
                                imgElement.style.left = `${deltaX}px`;
                                imgElement.style.top = `${deltaY}px`;
                            });
        
                            // ドラッグオーバー時の処理（ドラッグ可能な領域を指定）
                            imgElement.addEventListener("dragover", (event) => {
                                event.preventDefault();  // デフォルトの処理を無効化
                            });
                        }
        
                        table.appendChild(tr);
                    }
        
                    // 結果表示エリアにテーブルを追加
                    resultArea.innerHTML = ""; // 前回の結果を消去
                    resultArea.appendChild(table);
        
                    // 配列の中身を確認（デバッグ用）
                    console.log(imageArray);
                };
        
                img.src = reader.result;
            };
        });
        