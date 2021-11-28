import GoogleMapReact from 'google-map-react'
import {APIKEY_MAP} from '../../lib/api/baseUrls'
const Index = ({tonetagPoition}) => {

    const loadMap = (map, maps) => {
      let marker = new maps.Marker({
        position: tonetagPoition,
        map,
        draggable: true
      })
    }

    const _onChange = data => {
      console.log(data)
    }

    const onCircleInteraction = (data) => {
      console.log(data)
    }

    const onCircleInteraction3 = (data) => {
      console.log(data)
    }


    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          draggable={true}
          bootstrapURLKeys={{ key: APIKEY_MAP }}
          defaultCenter={tonetagPoition}
          defaultZoom={10}
          showsMyLocationButton
          yesIWantToUseGoogleMapApiInternals
          
          onChildMouseLeave={(map) => console.log(map)}
          onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
          onChildMouseDown={onCircleInteraction}
          onChildMouseUp={onCircleInteraction3}
          onChildMouseMove={onCircleInteraction}
          
        />
      </div>
    )
}

export default Index