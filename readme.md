# Vue.js Exercise

我的 [vue.js](https://vuejs.org/) 的學習與練習作品。

## 目錄

- [1. 待辦清單 Todolist](https://waveciou.github.io/vue-exercise/01-Todolist/)
- [2. 台灣空氣品質指標 AQI Data](https://waveciou.github.io/vue-exercise/02-AQIdata/)
- [3. 符合無障礙操作的頁籤 Accessible Navtabs](https://waveciou.github.io/vue-exercise/03-Navtabs/)
- [4. 日曆 Calendar](https://waveciou.github.io/vue-exercise/04-Calendar/)
- [5. 打地鼠遊戲 Whack A Mole](https://waveciou.github.io/vue-exercise/05-whack_a_mole/)

## 待辦清單 Todolist

[Demo](https://waveciou.github.io/vue-exercise/01-Todolist/)

使用 Vue.js 製作的待辦清單，可依照「未完成」、「已完成」做資料篩選。

並使用 localStorage 做資料的讀取與存放。

## 台灣空氣品質指標 AQI Data

[Demo](https://waveciou.github.io/vue-exercise/02-AQIdata/)

使用 Vue.js 製作的一個串接開放式資料 API 的作品，以及資料處理的練習（區域篩選、大小排列）。

API 來源為「PM2.5 開放資料入口網站」的 [台灣環保署測站 JSON 格式 API](https://pm25.lass-net.org/zh_tw/)。

CRUD 方面使用 [axios.js](https://github.com/axios/axios) 操作，JSONP 則是使用 jQuery $ajax 串接。

## 符合無障礙操作的頁籤 Accessible Navtabs

[Demo](https://waveciou.github.io/vue-exercise/03-Navtabs/)

符合[無障礙規範](https://www.handicap-free.nat.gov.tw/)操作方式的 Tab 機制（頁籤）。

1. 符合無障礙規範的操作順序，HTML 順序以 (標題 + 內容) + (標題 + 內容) 的排列方式來切版。

2. 內容區塊可依照內容的多寡自動改變高度。由於內容區塊的切法是使用 `position: absolute`，這樣頁籤之後的內容就沒辦法被推下去，所以每當改變 Tab 時，必須要設定一個機制去重新計算頁籤應該要有的實際高度，並寫回頁籤的上。

3. 鍵盤操作 Tab 鍵時能夠使用，為了使鍵盤操作 Tab 鍵時也能夠使用，除了 click 事件會再多綁了一個 focus 事件。但是每當使用滑鼠點擊操作時，常常會同時觸發 click 和 focus 事件，為了不想讓兩者同時被觸發，所以多綁了一個 `mousedown.prevent`，把 click 和 focus 事件分離開來。點擊時只會觸發 click 事件，用鍵盤操作 tab 鍵時才會觸發 focus 事件。

4. 畫面寬度較小的情況時，頁籤的項目過多的話就會被擠在一起，在畫面設計排版上會出問題，所以行動裝置的按鈕會獨立做一套，在畫面寬度小於等於 1024px 時才會顯示行動裝置的按鈕，並添加 `overflow-x: auto`，頁籤項目過多的話可以左右滑動。

## 日曆 Calendar

[Demo](https://waveciou.github.io/vue-exercise/04-Calendar/)

使用 Vue.js 製作的日曆，並結合 [moment.js](https://momentjs.com/) 操作時間資料。

## 打地鼠遊戲 Whack A Mole

[Demo](https://waveciou.github.io/vue-exercise/05-whack_a_mole/)

使用 Vue.js 製作的打地鼠遊戲。