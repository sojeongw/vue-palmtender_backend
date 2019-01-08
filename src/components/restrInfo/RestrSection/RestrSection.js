import React, { Component } from "react"
import styles from "./RestrSection.scss"
import classNames from "classnames/bind"
import StarRatingComponent from "react-star-rating-component"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

const cx = classNames.bind(styles)
var data;

class RestrSection extends Component {
   
  state = {
    restrPhoto:
      "https://scontent-ort2-1.cdninstagram.com/vp/131b22384c7bd75ccb479660ca850787/5C5CEF89/t51.2885-15/e35/c0.135.1080.1080/s480x480/41369643_146396256308285_2970499492557646678_n.jpg",
    restrCategory: "Korean Food",
    restrConcept: "with Friends",
    restrName: "BongChoo Chicken",
    restrAddr: "Et nulla amet pariatur quis Voluptate veniam non et excepteur duis irure.",
    restrDetail:
      "Occaecat dolor consectetur dolore exercitation magna. Excepteur adipisicing esse dolor ipsum minim nulla ullamco duis duis deserunt nisi voluptate. Culpa velit excepteur irure",
    starCount: 5,
    starValue: 3
  }
   //이부분에 스크립트
    componentDidMount() {
        var a = new Array(1,2,3);
        var b = new Array("a1","a2","a3");

        axios.get('http://localhost:4000/cart/check',{
           params : {menu_id:1,menuName : "test",opName : b,opValue:a,ea:1,memo:"asdf"}
        })
        .then(function (res){
            console.log(res);
            //console.log('res값 : ' + res.data.menuInfo);
            //this.setState({ restrName: res.data.respon })
            //data = res.data.respon;
        })
        .catch(function (error){
            console.log(error);
        })
    }

  // constructor() {
  //   super()

  //   this.state = {
  //     rating: 1
  //   }
  // }
  render() {
    // const { rating } = this.state
    return (
      <div className={cx("restr-info")}>
        <div className={cx("img-pane")}>
          <img src={this.state.restrPhoto} className={cx("restrPhoto")} alt="" />
        </div>
                                                      
        
        <div className={cx("info-pane")}>
          <div className={cx("small-info")}>
            <div className={cx("restrCategory")}>{this.state.restrCategory}</div>
            <div className={cx("restrConcept")}>{this.state.restrConcept}</div>
          </div>

          <div className={cx("main-info")}>
            <StarRatingComponent
              name="rate"
              editing={false}
              renderStarIcon={() => <span>★</span>}
              starCount={this.state.starCount}
              value={this.state.starValue}
            />
            <h3 className={cx("restrName")}>
              <a>{this.state.restrName}</a>
            </h3>
            <div className={cx("restrAddr")}>{this.state.restrAddr}</div>
          </div>

          <div className={cx("restrDetail")}>{this.state.restrDetail}</div>
        </div>
      </div>
    )
  }
}

export default RestrSection
