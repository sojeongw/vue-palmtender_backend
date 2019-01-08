import React, { Component } from "react"
import styles from "./TableSection.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

class TableSection extends Component {
  render() {
    return <div className={cx("table-section")}>TableSection</div>
  }
}

export default TableSection
