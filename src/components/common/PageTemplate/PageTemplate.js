import React, { Component } from "react"
import styles from "./PageTemplate.scss"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

class PageTemplate extends Component {
  state = {
    leftPercentage: 0.65
  }
  render() {
    const { header, footer, restrMap, restrList } = this.props
    const { leftPercentage } = this.state
    const leftStyle = {
      flex: leftPercentage
    }

    const rightStyle = {
      flex: 1 - leftPercentage
    }
    return (
      <div className={cx("list-template")}>
        {header}
        <div className={cx("lists")}>
          <div className={cx("list", "restrMap")} style={leftStyle}>
            {restrMap}
          </div>
          <div className={cx("list", "restrList")} style={rightStyle}>
            {restrList}
          </div>
        </div>
        {footer}
      </div>
    )
  }
}

export default PageTemplate
