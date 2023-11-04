var map; // Variabel peta

function createMap(lat, lng) {
  if (!map) { // Hanya inisialisasi peta jika belum ada
    map = L.map('map').setView([lat, lng], 13);

    var tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  } else {
    map.setView([lat, lng], 13); // Perbarui koordinat peta
  }
  
  var customIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [46, 56],
    iconAnchor: [30, 60],
    popupAnchor: [0, -16]
  });

  var marker = L.marker([lat, lng], {
    icon: customIcon
  }).addTo(map);
}

function request() {
  var ip = document.getElementById('ip').value;
  const apiUrl = "https://geo.ipify.org/api/v2/country,city?apiKey=at_jCEaMBu1W4RWxBm4lA9gBlxqvvY4W&ipAddress=" + ip;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Mengambil nilai city dari data response
      const country = data.location.country;
      const region = data.location.region;
      const city = data.location.city;
      var ip = data.ip;
      const timezone = data.location.timezone;
      const isp = data.isp;
      var lat = data.location.lat;
      var lng = data.location.lng;
      var pos = data.location.postalCode;
      var link = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

      // Melakukan apa pun yang Anda inginkan dengan nilai city
      console.log("Country:", country);
      console.log("region:", region);
      console.log("City:", city);
      console.log("ip:", ip);
      console.log("timezone:", timezone);
      console.log("isp:", isp);
      console.log("lat:", lat);
      console.log("ing:", lng);
      console.log("kode pos:", pos);
      console.log("link:", apiUrl);

      document.getElementById('country').textContent = country + ",";
      document.getElementById('region').textContent = region + ",";
      document.getElementById('city').textContent = city + ",";
      document.getElementById('ipAddress').textContent = ip;
      document.getElementById('time').textContent = timezone;
      document.getElementById('isp').textContent = isp;
      document.getElementById('postcode').textContent = pos;

      createMap(lat, lng);

    })
    .catch(error => {
      console.error("Terjadi kesalahan:", error);
    });
}

createMap(lat, lng);