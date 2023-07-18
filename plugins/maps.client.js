export default function(context, inject){
  let isLoaded = false
  let waiting = []

  const initGoogleMaps = () => {
    isLoaded =  true
    waiting.forEach((item) => {
      if(typeof item.fn === 'function'){
        item.fn(...item.arguments)
      }
    })
    waiting = []
  }

  const addScript = () => {
    const script = document.createElement('script')
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAg58DlC0B_XJAUH5ukgdvC1q0XIZ6M4i0&libraries=places&callback=initGoogleMaps"
    script.async = true
    window.initGoogleMaps = initGoogleMaps
    document.head.appendChild(script)
  }

  const showMap = (canvas, lat, lng) => {
    if(!isLoaded){
      waiting.push({
        fn: showMap,
        arguments,
      })
      return
    }

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

  addScript()

  inject('maps', {
    showMap
  })
}
