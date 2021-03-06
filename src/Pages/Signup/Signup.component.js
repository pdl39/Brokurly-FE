import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";

import SignupInputForm from "./SignupInputForm/SignupInputForm.component";
import OverlapCheckText from "./SignupInputForm/OverlapCheckText/OverlapCheckText.component";

import {
  SIGNUP,
  SIGNUP_CHECK_ID,
  SIGNUP_CHECK_EMAIL,
  CHECK_SMS,
  SEND_SMS,
} from "../../config";

import "./Signup.styles.scss";
import "./SignupInputForm/SignupInputForm.styles.scss";
import "./SignupInputForm/OverlapCheckText/OverlapCheckText.styles.scss";

class Signup extends Component {
  constructor() {
    super();
    this.recommendInputRef = React.createRef();
    this.state = {
      user_id: "",
      password: "",
      user_name: "",
      email: "",
      phone: "",
      first: false,
      second: false,
      six: false,
      userIdCheck: false,
      userEmailCheck: false,
      is_privacy_policy: false,
      is_sms_agreed: false,
      is_email_agreed: false,
      passwordCheck: false,
      address: "",
      gender: "3",
      recommender: "",
      event: "",
      userPwdCheck: "",
      recommendInputContent: "",
      recommendCheck: "",
      allChecks: "n",
      eventAllCheck: "n",
      birthdayYYYY: "",
      birthdayMM: "",
      birthdayDD: "",
      phoneCheck: false,
    };
  }

  handleGenderCheck = (e) => {
    this.setState({ gender: e.target.value });
  };

  handleRecommendCheck = (e) => {
    this.setState({
      recommendCheck: e.target.value,
      recommender: "",
      event: "",
    });
    this.recommendInputRef.current.className = "input";
    this.recommendInputRef.current.value = "";
  };

  handleRecommendInput = (e) => {
    this.setState({ recommendInputContent: e.target.value });
  };

  changeRecommendInput = () => {
    const { recommendCheck } = this.state;
    if (recommendCheck === "recommender") {
      return "추천인 아이디를 입력해주세요.";
    }
    if (recommendCheck === "event") {
      return "참여 이벤트명을 입력해주세요.";
    }
  };

  handleWriteData = (e) => {
    const { name, value } = e.target;
    if (name === "user_id") {
      this.setState({ [name]: value, userIdCheck: false });
    } else if (name === "email") {
      this.setState({ [name]: value, userEmailCheck: false });
    } else if (name === "phone") {
      this.setState({ [name]: value, phoneCheck: false });
    } else {
      this.setState({ [name]: value });
    }
  };

  checkId = () => {
    const { user_id } = this.state;
    const idCondition = /[A-Za-z0-9]\w{5,}/;
    if (user_id.match(idCondition)) {
      fetch(SIGNUP_CHECK_ID, {
        method: "POST",
        body: JSON.stringify({
          user_id,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "SUCCESS") {
            this.setState({ userIdCheck: true });
            Swal.fire({
              position: "center",
              icon: "success",
              title: "중복확인이 완료되었습니다..",
              showConfirmButton: false,
              timer: 1000,
            });
          } else {
            this.setState({ userIdCheck: false });
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "아이디가 중복되었습니다.<br/>다시 입력해주세요.",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "조건에 맞게 다시 입력해주세요.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  checkEmail = () => {
    const { email } = this.state;
    const emailCondition = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(emailCondition)) {
      fetch(SIGNUP_CHECK_EMAIL, {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message === "SUCCESS") {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "중복확인이 완료되었습니다.",
              showConfirmButton: false,
              timer: 1000,
            });
            this.setState({ userEmailCheck: true });
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "중복된 이메일 주소입니다.",
              showConfirmButton: false,
              timer: 1000,
            });
            this.setState({ userEmailCheck: false });
          }
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "올바른 이메일 주소를<br/>입력해주시길 바랍니다.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  checkPhone = () => {
    prompt("인증번호를 입력해주세요.");
    this.setState({ phoneCheck: true });
  };

  // checkPhone = () => {
  //   fetch(SEND_SMS, {
  //     method: "POST",
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.message === "SUCCESS") {
  //         const access_number = prompt("인증번호를 입력하세요");
  //         fetch(CHECK_SMS, {
  //           method: "POST",
  //           body: JSON.stringify({
  //             access_number,
  //           }),
  //         })
  //           .then((res) => res.json())
  //           .then((result) => {
  //             if (result.message === "SUCCESS") {
  //               this.setState({ phoneCheck: true });
  //             }
  //           });
  //       }
  //     });
  // };

  allCheck = (e) => {
    const checkBox = [
      "first",
      "second",
      "is_privacy_policy",
      "is_sms_agreed",
      "is_email_agreed",
      "six",
    ];
    const isAllCheck = checkBox.every((check) => this.state[check]);
    const obj = {};
    if (isAllCheck) {
      for (let check of checkBox) {
        obj[check] = false;
      }
      obj.allChecks = "n";
      obj.eventAllCheck = "n";
    } else {
      for (let check of checkBox) {
        obj[check] = true;
      }
      obj.allChecks = "y";
      obj.eventAllCheck = "y";
    }
    this.setState(obj);
  };

  handleAllCheck = () => {
    const checkBox = [
      "first",
      "second",
      "is_privacy_policy",
      "is_sms_agreed",
      "is_email_agreed",
      "six",
    ];
    const isAllCheck = checkBox.every((check) => this.state[check]);
    if (isAllCheck) {
      return "y";
    } else {
      return "n";
    }
  };

  receiveAllCheck = (e) => {
    const checkBox = ["is_sms_agreed", "is_email_agreed"];
    const isAllCheck = checkBox.every((check) => this.state[check]);
    const obj = {};
    if (isAllCheck) {
      for (let check of checkBox) {
        obj[check] = false;
      }
      obj.eventAllCheck = "n";
    } else {
      for (let check of checkBox) {
        obj[check] = true;
      }
      obj.eventAllCheck = "y";
    }
    this.setState(obj);
  };

  handleReceiveAllCheck = () => {
    const checkBox = ["is_sms_agreed", "is_email_agreed"];
    const isAllCheck = checkBox.every((check) => this.state[check]);
    if (isAllCheck) {
      return "y";
    } else {
      return "n";
    }
  };

  singleCheck = (e) => {
    if (this.state[e.target.name]) {
      this.setState({
        [e.target.name]: false,
      });
    } else {
      this.setState({ [e.target.name]: true });
    }
  };

  goToMain = () => {
    this.props.history.push("/");
  };

  postBackUserInfo = (e) => {
    const {
      user_id,
      password,
      user_name,
      email,
      address,
      phone,
      gender,
      recommender,
      event,
      birthdayYYYY,
      birthdayMM,
      birthdayDD,
      is_privacy_policy,
      is_sms_agreed,
      is_email_agreed,
      userPwdCheck,
    } = this.state;
    e.preventDefault();
    const pwdCondition = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    const userNecessaryinfo = Object.keys(this.state).slice(0, 10);
    const isFull = userNecessaryinfo.every(
      (info) =>
        password.match(pwdCondition) &&
        password === userPwdCheck &&
        this.state[info] !== false
    );
    if (isFull) {
      fetch(SIGNUP, {
        method: "POST",
        body: JSON.stringify({
          user_id,
          password,
          user_name,
          email,
          phone,
          address,
          gender,
          recommender,
          event,
          date_of_birth: `${birthdayYYYY}-${birthdayMM}-${birthdayDD}`,
          is_privacy_policy,
          is_sms_agreed,
          is_email_agreed,
        }),
      }).then((response) => response.json());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "가입이 완료되었습니다.",
        showConfirmButton: false,
        timer: 1000,
      });
      this.goToMain();
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "필수사항을 다시 살펴봐주세요.",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  render() {
    const {
      gender,
      recommendCheck,
      first,
      second,
      is_privacy_policy,
      is_sms_agreed,
      is_email_agreed,
      six,
    } = this.state;
    return (
      <div className="Signup">
        <div className="container">
          <div className="header">
            <h3 className="title">회원가입</h3>
            <div className="guide">
              <span className="ico">*</span>필수입력사항
            </div>
          </div>
          <form className="forms">
            <SignupInputForm
              inputContent="아이디"
              textType="text"
              name="user_id"
              onOffCount="idCheck"
              writeHolder="6자 이상의 영문 혹은 영문과 숫자를 조합"
              checkName="중복확인"
              onCheckId={this.checkId}
              onWriteData={this.handleWriteData}
              checkData={this.state}
            />
            <SignupInputForm
              inputContent="비밀번호"
              textType="password"
              name="password"
              onOffCount="pwdCheck"
              writeHolder="비밀번호를 입력해주세요"
              onWriteData={this.handleWriteData}
              checkData={this.state}
            />
            <SignupInputForm
              inputContent="비밀번호확인"
              textType="password"
              name="userPwdCheck"
              onOffCount="pwdDubleCheck"
              writeHolder="비밀번호를 한번 더 입력해주세요"
              onWriteData={this.handleWriteData}
              checkData={this.state}
            />
            <SignupInputForm
              inputContent="이름"
              textType="text"
              name="user_name"
              writeHolder="이름을 입력해주세요"
              onWriteData={this.handleWriteData}
              checkData={this.state}
            />
            <SignupInputForm
              inputContent="이메일"
              textType="text"
              name="email"
              onOffCount="emailCheck"
              writeHolder="예: deokjjang@gmail.com"
              checkName="중복확인"
              onCheckEmail={this.checkEmail}
              onWriteData={this.handleWriteData}
              checkData={this.state}
            />
            <SignupInputForm
              inputContent="휴대폰"
              textType="text"
              name="phone"
              writeHolder="숫자만 입력해주세요"
              checkName="인증확인"
              onOffCount="phoneCheck"
              onCheckPhone={this.checkPhone}
              onWriteData={this.handleWriteData}
              checkData={this.state}
            />
            <div className="SignupInputForm otherSinupform">
              <div className="input-content">
                주소
                <span className="ico">*</span>
              </div>
              <input
                className="input"
                name="address"
                placeholder="서울특별시 방화동"
                onChange={this.handleWriteData}
              ></input>
            </div>
            <div className="SignupInputForm otherSinupform">
              <div className="input-content">성별</div>
              <div className="input special-gender">
                <div className="gender-check-lists">
                  <label className="gender-check-list man">
                    <input
                      type="radio"
                      value="1"
                      checked={gender === "1"}
                      onChange={this.handleGenderCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">남자</span>
                  </label>
                  <label className="gender-check-list woman">
                    <input
                      type="radio"
                      value="2"
                      checked={gender === "2"}
                      onChange={this.handleGenderCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">여자</span>
                  </label>
                  <label className="gender-check-list normal">
                    <input
                      type="radio"
                      value="3"
                      checked={gender === "3"}
                      onChange={this.handleGenderCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">상관없음</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="SignupInputForm otherSinupform">
              <div className="input-content">생년월일</div>
              <div className="input special-birth">
                <input
                  className="birthday birth-year"
                  name="birthdayYYYY"
                  type="number"
                  placeholder="YYYY"
                  onChange={this.handleWriteData}
                />
                <span className="bar">/</span>
                <input
                  className="birthday birth-month"
                  name="birthdayMM"
                  type="number"
                  placeholder="MM"
                  onChange={this.handleWriteData}
                />
                <span className="bar">/</span>
                <input
                  className="birthday birth-day"
                  name="birthdayDD"
                  type="number"
                  placeholder="DD"
                  onChange={this.handleWriteData}
                />
              </div>
            </div>
            <div className="SignupInputForm otherSinupform">
              <div className="input-content">추가입력 사항</div>
              <div className="input special-recommender">
                <div className="recommender-check-lists">
                  <label className="recommender-check-list recommender-id">
                    <input
                      type="radio"
                      value="recommender"
                      checked={recommendCheck === "recommender"}
                      onChange={this.handleRecommendCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">추천인 아이디</span>
                  </label>
                  <label className="recommender-check-list recommend-event-name">
                    <input
                      type="radio"
                      value="event"
                      checked={recommendCheck === "event"}
                      onChange={this.handleRecommendCheck}
                    ></input>
                    <span className="checkmark"></span>
                    <span className="checkmark-content">참여 이벤트명</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="SignupInputForm otherSignupform">
              <div className="input-content"></div>
              <input
                className="input-off"
                name={`${recommendCheck}`}
                placeholder={this.changeRecommendInput()}
                ref={this.recommendInputRef}
                onChange={this.handleWriteData}
              ></input>
              <OverlapCheckText onData={this.state} onOffCount="addInfo" />
            </div>
            <div className="SignupInputForm check-agree">
              <div className="input-content check-agree-content">
                이용약관동의
                <span className="ico">*</span>
              </div>
              <div className="special-check-agree">
                <div className="check-agree-all">
                  <label className="check-agree-list all-check">
                    <input
                      type="checkbox"
                      name="all"
                      onChange={this.allCheck}
                    />
                    <span className={`checkmark-2 ${this.handleAllCheck()}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span className="all-check-text">전체 동의합니다.</span>
                    <p className="proviso-all">
                      필수 사항에 동의하지 않은 경우도 회원가입 및 일반적인
                      서비스를 이용할 수 없습니다.
                    </p>
                  </label>
                </div>
                <div className="check-agree-lists">
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="first"
                      onChange={this.singleCheck}
                    />
                    <span className={`checkmark-2 ${first && "y"}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span>이용약관 동의</span>
                    <span className="proviso">(필수)</span>
                  </label>
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="second"
                      onChange={this.singleCheck}
                    />
                    <span className={`checkmark-2 ${second && "y"}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span>개인정보처리방침 동의</span>
                    <span className="proviso">(필수)</span>
                  </label>
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="is_privacy_policy"
                      onChange={this.singleCheck}
                    />
                    <span className={`checkmark-2 ${is_privacy_policy && "y"}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span>개인정보처리방침 동의</span>
                    <span className="proviso">(선택)</span>
                  </label>
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="eventAll"
                      onChange={this.receiveAllCheck}
                    />
                    <span
                      className={`checkmark-2 ${this.handleReceiveAllCheck()}`}
                    >
                      <i className="fas fa-check"></i>
                    </span>
                    <span>무료배송,할인쿠폰 등 혜택/정보 수신 동의</span>
                    <span className="proviso">(선택)</span>
                  </label>
                  <div className="check-email-sms">
                    <label className="check-agree-list">
                      <input
                        type="checkbox"
                        name="is_sms_agreed"
                        onChange={this.singleCheck}
                      />
                      <span className={`checkmark-2 ${is_sms_agreed && "y"}`}>
                        <i className="fas fa-check"></i>
                      </span>
                      <span>SMS</span>
                    </label>
                    <label className="check-agree-list">
                      <input
                        type="checkbox"
                        name="is_email_agreed"
                        onChange={this.singleCheck}
                      />
                      <span className={`checkmark-2 ${is_email_agreed && "y"}`}>
                        <i className="fas fa-check"></i>
                      </span>
                      <span>이메일</span>
                    </label>
                  </div>
                  <p className="sms-info">
                    <span>⌞</span>
                    <span>동의 시 한 달간 [5% 적립] + [무제한 무료배송]</span>
                    <span>(첫 주문 후 적용)</span>
                  </p>
                  <label className="check-agree-list">
                    <input
                      type="checkbox"
                      name="six"
                      onChange={this.singleCheck}
                    />
                    <span className={`checkmark-2 ${six && "y"}`}>
                      <i className="fas fa-check"></i>
                    </span>
                    <span>본인은 만 14세 이상입니다</span>
                    <span className="proviso">(필수)</span>
                  </label>
                </div>
              </div>
            </div>
            <button className="complete" onClick={this.postBackUserInfo}>
              가입하기
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
