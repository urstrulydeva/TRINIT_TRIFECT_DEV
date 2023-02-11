// var url;
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // print object for debugging
    // console.log(JSON.stringify(tabs[0]));
  
    // get active tab url
    // var activeTab = tabs[0];
    // var activeTabURL = activeTab.url;
    var url = tabs[0].url;
    // alert(url);
    fetch("www.api.websitecarbon.com" + url)
      .then((data) => data.json())
      .then((carbonData) => {
        const carbonText = carbonData.green;
        const carbonElement = document.getElementById("carbon-release");
        const percentElement = document.getElementById("green-percetage");
        const cleanElement = document.getElementById("cleaner-text");
  
        // carbonElement.innerHTML = carbonText;
        var num = carbonData.statistics.co2.renewable.grams;
        num = Math.round((num + Number.EPSILON) * 100) / 100;
        carbonElement.innerHTML = num;
  
        var percent = carbonData.cleanerThan * 100;
  
        if (carbonText == true) {
          cleanElement.innerHTML = "Green";
          cleanElement.classList.add("green-text");
          chrome.action.setIcon({
            path: {
              128: "green.png",
            }      });
        } else if (carbonText == "unknown") {
          cleanElement.innerHTML = "Status is unkown for this";
          cleanElement.classList.add("unknown-text");
          chrome.action.setIcon({
            path: {
              128: "yellow.png",
            }      });
        } else if (carbonText == false) {
          cleanElement.innerHTML = "Not a green";
          cleanElement.classList.add("notgreen-text");
          chrome.action.setIcon({
            path: {
              128: "red.png",
            }      });
        }
        
        function animateValue(obj, start, end, duration) {
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
        // const obj1 = document.getElementById("carbon-release");
        // animateValue(obj1, 0.0, num, 5000);
        const obj2 = document.getElementById("green-percetage");
        animateValue(obj2, 0, percent, 5000);
      });
     
  });
