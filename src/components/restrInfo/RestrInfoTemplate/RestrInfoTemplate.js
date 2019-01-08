import React, { Component } from "react"
import styles from "./RestrInfoTemplate.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

class RestrInfoTemplate extends Component {
  render() {
    const { header, restrSection, bottomSection, menuSection, footer } = this.props
    return (
      <div>
        {header}
        <div className={cx("info-template")}>
          <div className={cx("top-info")}>{restrSection}</div>
          <div className={cx("bottom-info")}>{bottomSection}</div>
          <div className={cx("menu-info")}>{menuSection}</div>
        </div>
        {footer}
      </div>
    )
  }
}

export default RestrInfoTemplate
