import React from "react"
import styles from "./BottomWrapper.scss"
import classNames from "classnames/bind"
import ReviewSection from "components/restrInfo/ReviewSection"
import TableSection from "components/restrInfo/TableSection"

const cx = classNames.bind(styles)

const BottomWrapper = () => (
  <div className={cx("bottom-wrapper")}>
    <TableSection />
    <ReviewSection />
  </div>
)

export default BottomWrapper
