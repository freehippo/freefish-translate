import md5 from "js-md5";

console.log("hello world background todo something~");

// 在扩展程序中添加消息监听器
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // 处理来自内容脚本的消息
  //   console.log("收到来自内容脚本的消息：", message);
  //   var selection = message.json();

  var salt = "1435660288";
  var appid = "20210519000833019";
  var secret = "aIh1BBzsVO_QsLfiUOrB";
  var sign = md5(`${appid}${message.selection}${salt}${secret}`);

  fetch(
    `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${message.selection}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}&dict=1&tts=1`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  )
    .then((response) => response.json())
    .then(function (data) {
      //   console.log("返回数据", data);
      sendResponse({ success: true, data });
    })
    .catch((error) => {
      console.error(error);
      sendResponse({ success: false, error });
    });
  //   try {
  //     const response = await fetch(
  //       `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${message.selection}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       }
  //     );
  //     // const data = await response.json();
  //     // 发送回复消息给内容脚本
  //     sendResponse({ success: true, response });
  //   } catch (error) {
  //     // 发送回复消息给内容脚本
  //     sendResponse({ success: false, error });
  //   }
  //   sendResponse({ success: true });
  return true;
});

// function translateByBaidu(selection) {
//   var salt = "1435660288";
//   var appid = "20210519000833019";
//   var secret = "aIh1BBzsVO_QsLfiUOrB";
//   var sign = md5(`${appid}${selection}${salt}${secret}`);

//   fetch(
//     `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${selection}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     }
//   )
//     .then((response) => response.json())
//     .then(function (data) {
//       console.log("返回数据", data);
//       return data;
//     })
//     .catch((error) => console.error(error));
// }
