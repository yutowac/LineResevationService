// LINEチャネルのアクセストークン
const LINE_TOKEN = 'ACCESS TOKEN';

// GoogleフォームのURL
const FORM_URL_FIRST = 'URL_FORM1'
const FORM_URL_SECOND = 'URL_FORM2'

const LINE_URL = 'https://api.line.me/v2/bot/message/reply';

//postリクエストを受取ったときに発火する関数
function doPost(e) {
  const event = JSON.parse(e.postData.contents).events[0];
  // LINE返信用のトークン
  const replyToken = event.replyToken;
  // ユーザーのメッセージを取得
  const userMessage = event.message.text;

  // 応答メッセージの内容
  let messages = [];
  if (userMessage === "灯油注文") {
    //問診テンプレート
    messages = [
      {
        "type": "template",
        "altText": "灯油注文",
        "template": {
          "type": "confirm",
          "text": "初めての灯油注文ですか？",
          "actions": [
            {
              "type": "uri",
              "label": "1回目",
              "uri": FORM_URL_FIRST
            },
            {
              "type": "uri",
              "label": "2回目以降",
              "uri": FORM_URL_SECOND
            }
          ]
        }
      }
    ];
  } else if (userMessage === "いいえ") {
    messages = [
      {
        type: "text",
        text: "終了しました。何かあればいつでもご利用くださいませ。",
      },
    ];
  } else {
    return;
  }
  //lineで返答する
  UrlFetchApp.fetch(LINE_URL, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${LINE_TOKEN}`,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages,
    }),
  });
  ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}


