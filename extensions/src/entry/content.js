console.log("hello world content todo something~");

document.addEventListener("mouseup", function () {
  var selectionStr = window.getSelection().toString();

  var popperContainer = document.getElementById("free-fish-popper-container");
  if (popperContainer != null) {
    popperContainer.parentNode.removeChild(popperContainer);
  }
  if (selectionStr) {
    var translateStr;
    chrome.runtime.sendMessage(
      { selection: selectionStr },
      function (response) {
        console.log(selectionStr);
        console.log(response.data.trans_result[0].dst);
        translateStr = response.data.trans_result[0].dst;

        // 获取选中元素的位置和大小
        var selection = window.getSelection();
        console.log(selection.rangeCount);
        if (selection.rangeCount > 0) {
          var range = selection.getRangeAt(0);
          var rect = range.getBoundingClientRect();

          // 创建新的div元素，并设置其样式和位置
          popperContainer = document.getElementById(
            "free-fish-popper-container"
          );
          if (popperContainer == null) {
            popperContainer = document.createElement("div");
            popperContainer.setAttribute("id", "free-fish-popper-container");
          }

          popperContainer.style.position = "absolute";
          popperContainer.style.top = rect.bottom + window.pageYOffset + "px";
          popperContainer.style.left = rect.left + "px";
          popperContainer.style.width = rect.width + "px";
          popperContainer.style.height = "50px";
          popperContainer.style.backgroundColor = "white";
          popperContainer.style.boxShadow = "0 10px 20px rgba(0,0,0,.15)";
          popperContainer.style.borderRadius = "6px";
          popperContainer.style.background = "#fafbff";
          popperContainer.innerText = translateStr;

          // 将新创建的popperContainer元素添加到文档中
          document.body.appendChild(popperContainer);
        }
      }
    );
  }
});
