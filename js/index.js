//キャンバスに画像を描画する
function loadImage(id) {
    //画像を読み込んでImageオブジェクトを作成する
    var image = new Image();
    image.src = './img/backs.png';
    image.onload = (function () {
        //画像ロードが完了してからキャンバスの準備をする
        var haik = document.getElementById(id);
        var img = haik.getContext('2d');
        //キャンバスのサイズを画像サイズに合わせる
        haik.width = image.width;
        haik.height = image.height;
        //キャンバスに画像を描画（開始位置0,0）
        img.drawImage(image, 0, 0);

    });
}
//キャンバスに文字を描く

function drawText(canvas_id, kami, naka, name) {


    var canvas = document.getElementById(canvas_id);

    var img = canvas.getContext('2d');
    var Name= canvas.getContext('2d');

    var image = new Image();
    image.src = './img/backs.png';
    
    img.clearRect(0, 0, 600, 900);
    Name.clearRect(0, 0, 600, 900);
    Name.drawImage(image, 0, 0);
    img.drawImage(image, 0, 0);



    var kami = document.getElementById(kami);
    var naka = document.getElementById(naka);
  
    var name = document.getElementById(name);
    var kaminoku = kami.value
    var nakanoku = naka.value
  
    var namae = name.value


    //座標を指定して文字を描く（座標は画像の中心に）


    //文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter


    //文字のスタイルを指定
    img.font = '150px fonts';
    img.fillStyle = '#f0f8ff';
    //文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
    img.textBaseline = 'center';
    img.textAlign = 'center';




    var kamix = 450;
    var kamiy = 170;
    var nakax = 250;
    var nakay = 170;

    var namex = 90;
    var namey = 150;
 
    tategaki(img, kaminoku, kamix, kamiy)
    tategaki(img, nakanoku, nakax, nakay)

    Name.font = '70px fonts';
    Name.fillStyle = '#ffff00';
    //文字の配置を指定（左上基準にしたければtop/leftだが、文字の中心座標を指定するのでcenter
    Name.textBaseline = 'center';
    Name.textAlign = 'center';
    tategaki(Name, namae, namex, namey)
 
    let link = document.getElementById('hiddenLink')
    link.href = canvas.toDataURL()

    document.getElementById('canvasImage').src = canvas.toDataURL()

    link.click()


}
var tategaki = function (context, text, x, y) {
    var textList = text.split('\n');
    var lineHeight = context.measureText("あ").width;
    textList.forEach(function (elm, i) {
        Array.prototype.forEach.call(elm, function (ch, j) {
            context.fillText(ch, x - lineHeight * i, y + lineHeight * j);
        });
    });
};



window.addEventListener('load', function () {
    if (window.name != "any") {

        location.reload();
        window.name = "any";
    } else {
        window.name = "";
    }
});



function saveCanvas(saveType) {
    var imageType = "image/png";
    var fileName = "haik.png";
    if (saveType === "jpeg") {
        imageType = "image/jpeg";
        fileName = "sample.jpg";
    }
    var canvases = document.getElementById("preview");

    var base64 = canvases.toDataURL(imageType);
    // base64データをblobに変換
    var blob = Base64toBlob(base64);
    // blobデータをa要素を使ってダウンロード
    saveBlob(blob, fileName);
}
// Base64データをBlobデータに変換
function Base64toBlob(base64) {

    var tmp = base64.split(',');
    // base64データの文字列をデコード
    var data = atob(tmp[1]);

    var mime = tmp[0].split(':')[1].split(';')[0];

    var buf = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
        buf[i] = data.charCodeAt(i);
    }
    // blobデータを作成
    var blob = new Blob([buf], {
        type: mime
    });
    return blob;
}

// 画像のダウンロード
function saveBlob(blob, fileName) {
    var url = (window.URL || window.webkitURL);
    // ダウンロード用のURL作成
    var dataUrl = url.createObjectURL(blob);
    // イベント作成
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    // a要素を作成
    var ass = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    // ダウンロード用のURLセット
    ass.href = dataUrl;
    // ファイル名セット
    ass.download = fileName;
    // イベントの発火
    ass.dispatchEvent(event);
}









