import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

const SellerRegister = ({
  form,
  onChange,
  onSubmit,
  success,
  error,
  onClick,
}) => {
  console.log(success)

  const [disabled, setDisabled] = useState(false)

  const message = (success) => {
    if(success == '') return ''
    else if(success == true) {
      return '사업자번호 인증에 성공하였습니다'
    }
  }
  return (
    <Fragment>
      {/* breadcrumb */}
      <div className="login-register-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
              <div className="login-register-wrapper">
                <Tab.Container defaultActiveKey="login">
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link>
                        <h4>SELLER</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <div className="login-form-container">
                        <div className="login-register-form">
                          <form onSubmit={onSubmit}>
                            <input
                              type="text"
                              name="userID"
                              placeholder="ID"
                              value={form.userID}
                              onChange={onChange}
                            />
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              value={form.name}
                              onChange={onChange}
                            />
                            <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={form.password}
                              onChange={onChange}
                            />
                            <input
                              type="password"
                              name="passwordConfirm"
                              placeholder="Password Confirm"
                              value={form.passwordConfirm}
                              onChange={onChange}
                            />
                            <input
                              type="email"
                              name="email"
                              placeholder="E-mail"
                              value={form.email}
                              onChange={onChange}
                            />
                            <input
                              type="text"
                              name="business"
                              placeholder="Business Number"
                              value={form.business}
                              onChange={onChange}
                              disabled={success == true ? true : false}
                            />
                            <div>{message(success)}</div>
                            <br />
                            <div className="button-box">
                              <button
                                type="button"
                                className="mr-20"
                                onClick={onClick}
                              >
                                <span>Business Confirm</span>
                              </button>
                              <button type="submit">
                                <span>Register</span>
                              </button>
                            </div>
                            <br />
                            <div className="error text-center">{error == null ? '' : '* ' + error}</div>
                          </form>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SellerRegister.propTypes = {
  location: PropTypes.object,
};

export default SellerRegister;
