'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var Button = _interopDefault(require('antd/lib/button'));

var ESButton = function ESButton() {
  return React.createElement(Button, {
    type: "primary"
  }, "E-Sanar");
};

exports.SAButton = ESButton;
