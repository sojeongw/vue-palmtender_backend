import React from "react"
import styles from "./Header.scss"
import classNames from "classnames/bind"
import { Link } from "react-router-dom"

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <header className={cx("header")}>
      <div className={cx("header-content")}>
        <div className={cx("brand_logo")}>
          <Link to="/">PalmTender</Link>
        </div>
        <div className={cx("navigation")}>
          <Link to="/">Join</Link>
          <Link to="/">Log in</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
