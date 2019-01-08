import React from "react"
import styles from "./CurrentList.scss"
import classNames from "classnames/bind"
import ListWrapper from "components/restrList/ListWrapper"

const cx = classNames.bind(styles)

const ListItem = () => {
  return (
    <div className={cx("listItem")}>
      <div className={cx("img-pane")}>
        <img
          src="https://scontent-ort2-1.cdninstagram.com/vp/131b22384c7bd75ccb479660ca850787/5C5CEF89/t51.2885-15/e35/c0.135.1080.1080/s480x480/41369643_146396256308285_2970499492557646678_n.jpg"
          className={cx("restrPhoto")}
          alt=""
        />
      </div>
      <div className={cx("list-pane")}>
        <div className={cx("small-info")}>
          <div className={cx("restrCategory")}>Korean Food</div>
          <div className={cx("restrConcept")}>with Friends</div>
        </div>

        <h3 className={cx("restrName")}>
          <a>BongChoo Chicken</a>
        </h3>
        <div className={cx("seat")}>
          <ul>
            <li>1인석</li>
            <li>2인석</li>
            <li>4인석</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const CurrentList = () => (
  <div className={cx("currentList")}>
    <ListWrapper>
      <div className={cx("list-items")}>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </ListWrapper>
  </div>
)
export default CurrentList
