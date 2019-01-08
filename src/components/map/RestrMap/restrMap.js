import React, { Component } from "react"
import styles from "./restrMap.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

class restrMap extends Component {
  render() {
    return (
      <div className={cx("map-pane")}>
        <div className={cx("title")}>map</div>
        {/* 실제 지도 들어갈 부분 */}
        <div className={cx("mapApi")}>
          <MapPhoto />
        </div>
      </div>
    )
  }
}

const MapPhoto = () => {
  return (
    <div>
      <img src="http://joomly.net/frontend/web/images/googlemap/map.png" alt="loading..." />
    </div>
  )
}

export default restrMap
