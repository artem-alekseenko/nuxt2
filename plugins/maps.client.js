export default function(context, inject){
  let mapLoaded = false
  let mapWaiting = null

  const initMap = () => {
    mapLoaded =  true
    if(mapWaiting){
      const { canvas, lat, lng } = mapWaiting
      renderMap(canvas, lat, lng)
      mapWaiting = null
    }
  }

  const addScript = () => {
    const script = document.createElement('script')
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAg58DlC0B_XJAUH5ukgdvC1q0XIZ6M4i0&libraries=places&callback=initMap"
    script.async = true
    window.initMap = initMap
    document.head.appendChild(script)
  }

  const renderMap = (canvas, lat, lng) => {
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    const position = new window.google.maps.LatLng(lat, lng)
    const marker = new window.google.maps.Marker({ position })
    marker.setMap(map)
  }

  const showMap = (canvas, lat, lng) => {
    if(mapLoaded) renderMap(canvas, lat, lng)
    else mapWaiting = { canvas, lat, lng }
  }

  addScript()
  inject('maps', {
    showMap
  })
}
