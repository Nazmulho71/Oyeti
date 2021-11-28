import GoogleMapReact from 'google-map-react'
import React from 'react'
import {APIKEY_MAP} from '../../lib/api/baseUrls'

class SimpleMap extends React.Component {
    
    state = {
        center: [this.props.tonetagPoition.lat, this.props.tonetagPoition.lng],
        zoom: 9,
        marker : null
    }

    loadMap = (map, maps) => {
        let marker = new maps.Marker({
          position: this.props.tonetagPoition,
          map,
          draggable: true,
        })
        marker.addListener("dragend", () => {
            let region = {
                lat: marker.getPosition().lat(),
                lng: marker.getPosition().lng()

            }
            this.props.onChangeMap(region)
        })
        this.setState({marker})
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <GoogleMapReact 
                draggable={true}
                center={this.state.center}
                bootstrapURLKeys={{ key: APIKEY_MAP }}
                defaultZoom={this.state.zoom}
                showsMyLocationButton
                onGoogleApiLoaded={({ map, maps }) => this.loadMap(map, maps)}
            >
            </GoogleMapReact>
        )
    }
}

export default SimpleMap


