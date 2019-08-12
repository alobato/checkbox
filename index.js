"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  position: relative;\n  cursor: pointer;\n  width: 18px;\n  height: 18px;\n  background-color: transparent;\n  border-radius: 2px;\n  border: 2px solid hsla(216, 20%, 50%, 0.85);\n  transition: background-color 500ms, border-color 500ms;\n  &:hover {\n    background-color: hsla(216, 20%, 50%, 0.2);\n    border-color: hsla(216, 20%, 50%, 1);\n  }\n  & > div {\n    position: absolute;\n    top: 1px;\n    left: 4px;\n    width: 6px;\n    height: 10px;\n    border-bottom: 2px solid hsla(216, 20%, 50%, 0.85);\n    border-left: none;\n    border-right: 2px solid hsla(216, 20%, 50%, 0.85);\n    border-top: none;\n    transform: rotate(45deg);    \n    pointer-events: none;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Checkbox = function Checkbox(_ref) {
  var checked = _ref.checked,
      label = _ref.label,
      labelStyle = _ref.labelStyle,
      containerStyle = _ref.containerStyle,
      checkAnimation = _ref.checkAnimation,
      uncheckAnimation = _ref.uncheckAnimation,
      rest = _objectWithoutProperties(_ref, ["checked", "label", "labelStyle", "containerStyle", "checkAnimation", "uncheckAnimation"]);

  var checkboxRef = (0, _react.useRef)();
  var checkRef = (0, _react.useRef)();

  var handleClick = function handleClick() {
    if (checked) {
      if (uncheckAnimation) {
        uncheckAnimation(checkRef, function () {
          return rest.onChange(false);
        });
      } else {
        rest.onChange(false);
      }
    } else {
      if (checkAnimation) {
        checkAnimation(checkRef, function () {
          return rest.onChange(true);
        });
      } else {
        rest.onChange(true);
      }
    }
  };

  var content = _react["default"].createElement("div", _extends({
    onKeyPress: function onKeyPress(e) {
      return ['Enter', ' '].includes(e.key) && handleClick();
    },
    ref: checkboxRef,
    onClick: handleClick
  }, rest), _react["default"].createElement("div", {
    ref: checkRef,
    style: {
      opacity: checked ? 1 : 0
    }
  }));

  if (label) return _react["default"].createElement("div", {
    style: containerStyle
  }, content, _react["default"].createElement("label", {
    style: labelStyle,
    onClick: handleClick
  }, label));
  return content;
};

var checkAnimation = function checkAnimation(ref, callback) {
  if (!ref.current) return;

  if ('animate' in ref.current) {
    ref.current.animate([{
      opacity: 0,
      transform: 'rotate(45deg) scale(0)'
    }, {
      opacity: 1,
      transform: 'rotate(45deg) scale(1)'
    }], {
      duration: 200,
      easing: 'ease'
    }).onfinish = function () {
      callback();
    };
  } else {
    callback();
  }
};

var uncheckAnimation = function uncheckAnimation(ref, callback) {
  if (!ref.current) return;

  if ('animate' in ref.current) {
    ref.current.animate([{
      opacity: 1,
      transform: 'rotate(45deg) scale(1)'
    }, {
      opacity: 0,
      transform: 'rotate(45deg) scale(0)'
    }], {
      duration: 200,
      easing: 'ease'
    }).onfinish = function () {
      callback();
    };
  } else {
    callback();
  }
};

var StyledCheckbox = (0, _styledComponents["default"])(Checkbox)(_templateObject());

var StyledCheckboxWithAnimations = function StyledCheckboxWithAnimations(props) {
  return _react["default"].createElement(StyledCheckbox, _extends({
    checkAnimation: checkAnimation,
    uncheckAnimation: uncheckAnimation
  }, props));
};

StyledCheckboxWithAnimations.defaultProps = {
  tabIndex: 0,
  onChange: function onChange() {},
  containerStyle: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none'
  },
  labelStyle: {
    cursor: 'pointer',
    marginLeft: 8
  }
};
var _default = StyledCheckboxWithAnimations;
exports["default"] = _default;
