async function getMap() {
  try {
    const response = await fetch("/home/map", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const posts = await response.json();
    const myPoints = [];
    ymaps.ready(() => {
      const myMap = new ymaps.Map(
        "map",
        {
          center: [41.011218, 28.978178],
          zoom: 1,
          controls: ["zoomControl"],
        },
        {
          searchControlProvider: "yandex#search",
        }
      );
      const clusterer = new ymaps.Clusterer({
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayoutWidth: 100,
        clusterBalloonContentLayoutHeight: 40,
        preset: "islands#invertedBlueClusterIcons",
      });
      function showMap(point) {
        const geocoder = ymaps.geocode(point.address);
        geocoder
          .then((data) => {
            const coordinates = data.geoObjects
              .get(0)
              .geometry.getCoordinates();
            const myPoint = new ymaps.Placemark(
              coordinates,
              {
                balloonContent: `<div class="balloon">
                  <a class="aBal" href = "/details/${point.id}">Подробнее о чае ▶</a><br> 
                  <span class="descriptionMap">${point.name}</span>            
                  <img src="${point.photo}" height="150" width="200"> 
<!--                  <br/>-->
                  <p>Место культивации:</p>
<!--                  <br/> -->
                  <b>${point.address}</b>
                </div>`,
                hintContent: `<div class="teaInfo ">${point.name}</div>`,
              },
              {
                iconLayout: "default#image",
                iconImageHref: "./images/poin1.png",
                iconImageSize: [32, 40],
              }
            );
            myPoints.push(myPoint);
            myMap.geoObjects.add(myPoint);

            // Кластеризация объектов
            clusterer.add(myPoints);
            myMap.geoObjects.add(clusterer);
            clusterer.events
              // Можно слушать сразу несколько событий, указывая их имена в массиве.
              .add(["mouseenter", "mouseleave"], (e) => {
                const target = e.get("target");
                const type = e.get("type");
                if (typeof target.getGeoObjects !== "undefined") {
                  // Событие произошло на кластере.
                  if (type === "mouseenter") {
                    target.options.set(
                      "preset",
                      "islands#invertedGreenClusterIcons"
                    );
                  } else {
                    target.options.set(
                      "preset",
                      "islands#invertedBlueClusterIcons"
                    );
                  }
                }
              });

            // Масштабирование карты так, чтобы было видно все объекты
            myMap.setBounds(myMap.geoObjects.getBounds(), {}).then(() => {
              if (myMap.getZoom() > 5) myMap.setZoom(5); // Если значение zoom превышает 15, то устанавливаем 15.
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      posts.forEach((el) => {
        showMap(el);
      });
    });
  } catch (error) {
    console.error(error);
  }
}
getMap();
