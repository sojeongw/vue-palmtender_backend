import React, { Component } from "react"
import styles from "./MenuSection.scss"
import classNames from "classnames/bind"
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap"

const cx = classNames.bind(styles)

class MenuSection extends Component {
  state = {
    menuPhoto:
      "https://scontent-ort2-1.cdninstagram.com/vp/131b22384c7bd75ccb479660ca850787/5C5CEF89/t51.2885-15/e35/c0.135.1080.1080/s480x480/41369643_146396256308285_2970499492557646678_n.jpg",
    menuName: "List group item heading",
    menuInfo:
      " Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit."
  }

  render() {
    return (
      <div className={cx("menu-wrapper")}>
        <ListGroup>
          <ListGroupItem active>
            <ListGroupItemHeading>menu</ListGroupItemHeading>
          </ListGroupItem>
          <div className={cx("menu-list")}>
            <ListGroupItem>
              <div className={cx("menu-photo")}>
                <img src={this.state.menuPhoto} alt="" />
              </div>
              <ListGroupItemHeading>{this.state.menuName}</ListGroupItemHeading>
              <ListGroupItemText>{this.state.menuInfo}</ListGroupItemText>
            </ListGroupItem>
          </div>
        </ListGroup>
      </div>
    )
  }
}

export default MenuSection
