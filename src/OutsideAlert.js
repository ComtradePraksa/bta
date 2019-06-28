import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class OutsideAlert extends Component {

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClickOutside = (e) => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      if (this.props.isOpenUserMenu) {
        //if user menu is open, close it!!!
        this.props.toggleUserMenu();
      }
    }
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  render() {
    return <div ref={this.setWrapperRef}>{this.props.children}</div>;
  };
}

OutsideAlert.propTypes = {
  children: PropTypes.element.isRequired
};