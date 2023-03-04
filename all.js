//全部取得的資料
let data = []
//所有城市
let city = ["台北市", "基隆市", "新北市", "宜蘭縣", "桃園市", "新竹市", "新竹縣", "苗栗縣", "台中市", "彰化縣", "嘉義市", "雲林縣", "台南市", "高雄市", "屏東縣", "花蓮縣"];
//選完城市所有的地區
let area = [];
//選完地區所有的店家
let store = [];
//縣市DOM
let inputCity = document.querySelector("#inputCity");
//地區DOM
let inputArea = document.querySelector("#inputArea");
//店家DOM
let inputStore = document.querySelector("#inputStore");
//個別店家資訊
let allStore = document.querySelector("#allStore");
//zoomIn DOM
let zoomInBtn = document.querySelector("#zoomInBtn");
//zoomOut DOM
let zoomOutBtn = document.querySelector("#zoomOutBtn");
//取得自己位置 DOM
let getMyLocationBtn = document.querySelector("#getMyLocationBtn");
//下拉選單選到的城市
let cityValue = "";
//下拉選單選到的地區
let areaValue = "";
//下拉選單選到的店家
let storeValue = "";
//天氣資料
let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
let weatherMapAPIKey = "eb6040a528867e4773276cdd8a83bfb1";
let params = {
    appid: weatherMapAPIKey,
    units: 'metric',
    lang: 'zh_tw'
};

//生成地圖
var map = L.map('map', {
    center: [24.1447816, 120.6766283],
    zoom: 16 ,
    zoomControl: false
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var sevenIcon = new L.Icon({
    iconUrl: './mapIcon/ico-711.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [60, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var mosIcon = new L.Icon({
    iconUrl: './mapIcon/ico-mos.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [60, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var mcdIcon = new L.Icon({
    iconUrl: './mapIcon/ico-mcdonald.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [60, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var kfcIcon = new L.Icon({
    iconUrl: './mapIcon/ico-KFC.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [60, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var stbIcon = new L.Icon({
    iconUrl: './mapIcon/ico-starbuck.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [60, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var familyIcon = new L.Icon({
    iconUrl: './mapIcon/ico-family.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [60, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var hiLifeIcon = new L.Icon({
    iconUrl: './mapIcon/ico-hiLife.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [60, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var uCupIcon = new L.Icon({
    iconUrl: './mapIcon/ico-uCup.svg',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [60, 55],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
var markers = new L.MarkerClusterGroup().addTo(map)


//--------------函式區----------------
getJson();

//取得JSON
function getJson(){
    axios.get("https://raw.githubusercontent.com/DavidWang85/circularCupsJSON/main/storeMap.json")
        .then(res => {
            data = res.data;
            renderMap(); //執行渲染地圖
            renderCity(); //渲染城市選項
            renderItems(); //渲染商家卡片
        })
        .catch(err => {
            console.log(err)
        })
}

//渲染地圖裡面的icon
function renderMap () {
    for (let i = 0; data.length > i; i++) {
        var mark;
        //判斷不同的icon樣式
        if (data[i].company == "7-11") {
            mark = sevenIcon;
        } else if (data[i].company == "摩斯漢堡"){
            mark = mosIcon;
        } else if (data[i].company == "麥當勞"){
            mark = mcdIcon;
        } else if (data[i].company == "肯德基") {
            mark = kfcIcon;
        } else if (data[i].company == "星巴克") {
            mark = stbIcon;
        } else if (data[i].company == "全家") {
            mark = familyIcon;
        } else if (data[i].company == "萊爾富") {
            mark = hiLifeIcon;
        } else if (data[i].company == "其他") {
            mark = uCupIcon;
        }
        //根據cupName增加cupNameColor屬性
        if (data[i].cupName == "好盒器") {
            data[i].cupNameColor = "good-style"
        } else if (data[i].cupName == "OPENiECO") {
            data[i].cupNameColor = "open-style"
        } else if (data[i].cupName == "塑還真") {
            data[i].cupNameColor = "plastic-style"
        } else if (data[i].cupName == "uCup") {
            data[i].cupNameColor = "ucup-style"
        } else {
            data[i].cupNameColor = "other-style"
        }
        markers.addLayer(L.marker([data[i].long, data[i].lat], { icon: mark }).bindPopup(
            `<span class="badge rounded-pill ${data[i].cupNameColor}">${data[i].cupName}</span>
            <p>${data[i].name}</p>
            <p>電話： <a href="tel:${data[i].tel}">${data[i].tel}</a></p>
            <p>地址：<a target="_blank" href="https://www.google.com/maps/place/${data[i].name}">${data[i].address}</a></p>
            <p>店家：${data[i].company}</p>
            `));
    }
    map.addLayer(markers);
}


//透過城市的陣列渲染城市選項
function renderCity(){
    const defaultSelect = `<option selected value="">--選擇縣市--</option>`;
    let cityDom = "";
    city.forEach(function(item){
        cityDom += `<option value="${item}">${item}</option>`
    })
    inputCity.innerHTML = defaultSelect + cityDom
}
// 監聽縣市渲染地區選項
inputCity.addEventListener("change", getArea)
function getArea(e){
    cityValue = e.target.value;
    areaValue = "";
    storeValue = "";
    renderItems(cityValue, "", "") //傳送選擇的城市名稱

    const NewCity = data.filter(function (item) {
        return cityValue == item.city; //選出一樣的縣市
    })

    //選出縣市裡面不重複的地區名
    NewCity.forEach(function (item) {
        area.push(item.area)
    })
    area = new Set(area);
    renderArea();
    renderStore()
    area = [];
}
//渲染地區選項
function renderArea(){
    const defaultSelect = `<option selected value="">--選擇地區--</option>`;
    let areaName = "";
    area.forEach(function(item){
        areaName += `<option value="${item}">${item}</option>`
    });
    inputArea.innerHTML = defaultSelect + areaName;
}

//監聽地區渲染店家選項
inputArea.addEventListener("change",getStore)
function getStore(e){
    areaValue = e.target.value;
    storeValue = "";
    renderItems(cityValue, areaValue, "") //傳送選擇的城市名稱

    const NewArea = data.filter(function (item) {
        return areaValue == item.area && cityValue==item.city; //選出一樣的地區
    })
    NewArea.forEach(function (item) {
        store.push(item.company)
    })
    store = new Set(store)
    renderStore();
    store = []
}
//渲染店家選項
function renderStore(){
    const defaultSelect = `<option selected value="">--選擇店家--</option>`;
    let storeName = "";
    store.forEach(function(item){
        storeName += `<option value="${item}">${item}</option>`
    })
    inputStore.innerHTML = defaultSelect + storeName;
}
//監聽店家
inputStore.addEventListener("change", function(e){
    storeValue = e.target.value;
    renderItems(cityValue, areaValue, storeValue) //傳送選擇的店家名稱
})
//取得分類資訊，最後在渲染店家資訊
function renderItems(city="",area="",store=""){
    if (city && area && store) {
        let newData = []
        let storeData = data.filter(function (item) {
            return item.city == city && item.area == area && item.company == store
        })
        storeData.forEach(function (item) {
            newData.push(item)
        })
        createElement(newData)
    }else if (city && area) {
        let newData = []
        let areaData = data.filter(function (item) {
            return item.city == city && item.area == area
        })
        areaData.forEach(function (item) {
            newData.push(item)
        })
        createElement(newData)
    } else if (city) {
        let newData = []
        let cityData = data.filter(function (item) {
            return item.city == city
        })
        cityData.forEach(function (item) {
            newData.push(item)
        })
        createElement(newData)
    }
    else if (city == "" && area == "" && store == "") {
        let newData = [];
        data.forEach(function(item){
            newData.push(item)
        })
        createElement(newData)
    }
}
//渲染店家資訊
function createElement(newData) {
    let items = "";
    newData.forEach(function(item){
        if (item.cupName == "好盒器") {
            item.cupNameColor = "good-style"
        } else if (item.cupName == "OPENiECO") {
            item.cupNameColor = "open-style"
        } else if (item.cupName == "塑還真") {
            item.cupNameColor = "plastic-style"
        } else if (item.cupName == "uCup") {
            item.cupNameColor = "ucup-style"
        } else {
            item.cupNameColor = "other-style"
        }
    })
    newData.forEach(function (item) {
        items += `<div class="card">
                <div class="card-body">
                    <span class="badge rounded-pill ${item.cupNameColor}">${item.cupName}</span>
                    <h5 class="card-title mb-3 ">${item.name}</h5>
                    <p class="card-text">電話: ${item.tel}</p>
                    <p><a href="#" class="link-dark stretched-link link-default" onclick="goToLocation(${item.long},${item.lat})">地址: ${item.address}</a></p>
                </div>
            </div>`
    })
    allStore.innerHTML = items
}
//前往指定商店位置
function goToLocation(long,lat){
    map.panTo(L.latLng(long, lat));
    getWeather(long, lat)
}
//天氣報報
function getWeather(long, lat){
    console.log(long, lat)
    xhr = new XMLHttpRequest();
    xhr.onload = function () {
            // 這邊處理傳回來的東西
        console.log(this.responseText)
        var data = JSON.parse(this.responseText);
        let content = "";
        content = `
            <p class="m-0 text-light">氣溫：${data.main.temp_min} ~ ${data.main.temp_max}</p>
            <p class="m-0 text-light">天氣狀況：${data.weather[0].description}</p>
            <img class="w-50" src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`
        document.querySelector('#weather').innerHTML = content
        }
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${long}&lon=${lat}&appid=${weatherMapAPIKey}&units=metric&lang=zh_tw`, true)
    xhr.send()
}

//前往自己所在位置
getMyLocationBtn.addEventListener("click",getMyLocation)
function getMyLocation(){
    if (navigator.geolocation == undefined) {
        alert("找不到location");
        return;
    }
    let settings = {
        enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(result, error, settings);
    function result(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        getWeather(latitude, longitude)
        map.setView([latitude, latitude], 18);
        marker = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`<p>你的位置</p>`)
            .openPopup();
        
    }
    function error(err) {
        alert("請打開權限");
    }
}
//zoomIN功能
zoomInBtn.addEventListener("click",zoomIn)
function zoomIn(){
    map.zoomIn(1);
}
//zoomOut功能
zoomOutBtn.addEventListener("click", zoomOut)
function zoomOut() {
    map.zoomOut(1);
}
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})