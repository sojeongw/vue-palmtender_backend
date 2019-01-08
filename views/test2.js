import React, { Component } from "react"
import "./Map.css"

class Map extends Component {
  render() {
    return (
      <div>
        <section className="section__map">
          <MapImage />
        </section>
      </div>
    )
  }
}

class MapImage extends Component {
  render() {
    return <img src="http://joomly.net/frontend/web/images/googlemap/map.png" alt="loading..." />
  }
}

export default Map