import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  actualPos: any = { lat: 0, lng: 0 };

  map = null;
  markers: any[] = [
    {
      position: {
        lat: 4.658383846282959,
        lng: -74.09394073486328,
      },
      title: 'Parque Simón Bolivar'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.loadMap();
    this.showLocation();

    setTimeout(() => {
      this.showLocation();
    }, 2000);

  }

  loadMap() {

    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = { lat: this.actualPos.lat, lng: this.actualPos.lng };
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

  showLocation() {

    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.actualPos.lat = coordinates.coords.latitude;
      this.actualPos.lng = coordinates.coords.longitude;
    }
    console.log(this.actualPos);
    printCurrentPosition();
    this.loadMap();

  }
}