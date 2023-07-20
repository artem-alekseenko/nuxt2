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

  const showMap = (canvas, lat, lng, markers) => {
    if(!isLoaded){
      waiting.push({
        fn: showMap,
        arguments: [canvas, lat, lng, markers],
      })
      return
    }

    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
      styles:[{
        featureType: 'poi.business',
        elementType: 'labels.icon',
        stylers:[{ visibility: 'off' }]
      }]
    }
    const map = new window.google.maps.Map(canvas, mapOptions)

    if(!markers){
      const position = new window.google.maps.LatLng(lat, lng)
      const marker = new window.google.maps.Marker({
        position,
        clickable: false,
      })
      marker.setMap(map)
      return
    }

    const bounds = new window.google.maps.LatLngBounds()
    markers.forEach((home) => {
      const position = new window.google.maps.LatLng(home.lat, home.lng)
      const marker = new window.google.maps.Marker({
        position,
        label: {
          text: `$${home.pricePerNight}`,
          className: `marker home-${home.id}`,
        },
        icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
        clickable: false,
      })
      marker.setMap(map)
      bounds.extend(position)
    })

    map.fitBounds(bounds)
  }

  const  makeAutoComplete = (input) => {
    if(!isLoaded){
      waiting.push({ fn: makeAutoComplete, arguments: [input] })
      return
    }

    const autoComplete = new window.google.maps.places.Autocomplete(input, { types: ['(cities)']})
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
  }

  addScript()

  inject('maps', {
    showMap,
    makeAutoComplete,
  })
}
