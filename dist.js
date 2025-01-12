"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactIntersectionObserver = _interopRequireDefault(require("@researchgate/react-intersection-observer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var hasWindow = function hasWindow() {
  return typeof window !== 'undefined';
};

var ProgressiveImage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProgressiveImage, _React$Component);

  function ProgressiveImage(props) {
    var _this;

    _classCallCheck(this, ProgressiveImage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProgressiveImage).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "image", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOnlineStatus", function () {
      _this.setState({
        isOnline: window.navigator.onLine
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "loadImage", function (src, srcSetData) {
      // If there is already an image we nullify the onload
      // and onerror props so it does not incorrectly set state
      // when it resolves
      if (_this.image) {
        _this.image.onload = null;
        _this.image.onerror = null;
      }

      var image = new Image();
      _this.image = image;
      image.onload = _this.onLoad;

      image.onerror = function (errorEvent) {
        _this.onError(errorEvent);

        return; // this.handleImageRetries(image);
      };

      image.src = src;

      if (srcSetData) {
        image.srcset = srcSetData.srcSet;
        image.sizes = srcSetData.sizes;
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onLoad", function () {
      // use this.image.src instead of this.props.src to
      // avoid the possibility of props being updated and the
      // new image loading before the new props are available as
      // this.props.
      if (_this.props.delay) {
        _this.setImageWithDelay();
      } else {
        _this.setImage();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setImageWithDelay", function () {
      setTimeout(function () {
        _this.setImage();
      }, _this.props.delay);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "setImage", function () {
      if (_this._isMounted) {
        _this.setState({
          image: _this.image.src,
          loading: false,
          srcSetData: {
            srcSet: _this.image.srcset || '',
            sizes: _this.image.sizes || ''
          }
        }, function () {
          window.removeEventListener('online', _this.handleOnlineStatus);
          window.removeEventListener('offline', _this.handleOnlineStatus);
        });

        _this.props.cb();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onError", function (errorEvent) {
      var onError = _this.props.onError;

      if (onError) {
        onError(errorEvent);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleIntersection", function (event, unobserve, isOnline) {
      if (event.isIntersecting) {
        var _this$props = _this.props,
            src = _this$props.src,
            srcSetData = _this$props.srcSetData;

        if (isOnline) {
          _this.loadImage(src, srcSetData);

          unobserve();
        }
      }
    });

    _this._isMounted = false;
    _this.state = {
      isOnline: hasWindow() ? window.navigator.onLine : true,
      image: props.placeholder,
      loading: true,
      srcSetData: {
        srcSet: '',
        sizes: ''
      }
    };
    return _this;
  }

  _createClass(ProgressiveImage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;

      if (!hasWindow()) {
        return;
      }

      window.addEventListener('online', this.handleOnlineStatus);
      window.addEventListener('offline', this.handleOnlineStatus);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var _this$props2 = this.props,
          src = _this$props2.src,
          placeholder = _this$props2.placeholder,
          srcSetData = _this$props2.srcSetData; // We only invalidate the current image if the src has changed.

      if (src !== prevProps.src) {
        this.setState({
          image: placeholder,
          loading: true
        }, function () {
          _this2.loadImage(src, srcSetData);
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;

      if (this.image) {
        this.image.onload = null;
        this.image.onerror = null;
      }

      if (this.timeout) {
        window.clearTimeout(this.timeout);
      }

      window.removeEventListener('online', this.handleOnlineStatus);
      window.removeEventListener('offline', this.handleOnlineStatus); // this.clearEventListeners();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var options = {
        onChange: function onChange(event, unobserve) {
          return _this3.handleIntersection(event, unobserve, _this3.state.isOnline);
        },
        rootMargin: this.props.rootMargin || '0% 0% 25%',
        threshold: this.props.threshold || [0],
        disabled: this.props.noLazyLoad || false
      };
      var _this$state = this.state,
          image = _this$state.image,
          loading = _this$state.loading,
          srcSetData = _this$state.srcSetData;
      var _this$props3 = this.props,
          src = _this$props3.src,
          children = _this$props3.children,
          noRetry = _this$props3.noRetry,
          noLazyLoad = _this$props3.noLazyLoad;

      if (!children || typeof children !== 'function') {
        throw new Error("ProgressiveImage requires a function as its only child");
      }

      if (noLazyLoad) {
        return children(src, false, this.props.srcSetData);
      }

      return React.createElement(_reactIntersectionObserver.default, options, children(image, loading, srcSetData));
    }
  }]);

  return ProgressiveImage;
}(React.Component);

exports.default = ProgressiveImage;
