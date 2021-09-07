'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var questions = [{
    page: 'motivation',
    title: 'is this a necessary purchase?',
    subtitle: '',
    text: 'think about whether this is a want or a need!',
    type: 'mult',
    options: {
        "yes": [],
        "no": ["try seeing what items from your past you can refashion your closet to fit the style you\'re cultivating!"]
    },
    points: [1, 0]
}, {
    page: 'wanted',
    title: 'have you wanted this for a few months or longer?',
    subtitle: '',
    text: 'think about how long you have wanted/needed this, and whether or not you can add it to a wishlist.',
    type: 'mult',
    options: {
        'yes': ["it\'s great that you took some time to think about this potential purchase!"],
        'no': ["think about what\'s inspiring this purchase and consider whether or not this is something you truly need.", "if not an urgent purchase, add this item to a wishlist and revisit it in the future.", "make sure you plan purchases ahead of time so that you know you\'re buying something you need!"]
    },
    points: [1, 0]

}, {
    page: 'sustainable',
    title: 'is this item sustainable?',
    subtitle: '',
    text: 'i.e. is it made out of sustainable materials, with sustainable practices, and/or by a sustainable company?',
    type: 'mult',
    options: {
        "yes": ["hooray! you\'re interested in buying items that are sustainable!", "if you\'re interested in owning clothes with sustainable materials, also consider washing your non-sustainable clothing less often to avoid the release of harmful chemicals.", "if you like to shop at sustainable companies, try compiling a list of sustainable brands!", "make sure you buy items that high quality, to avoid owning items with short lifespans!", "make sure if you\'re buying secondhand, you\'re not adopting a fast fashion mindset!", "make sure you buy items that you know you will own for a long time!"],
        "no": ["for future purchases, make sure to check what materials an item is made out of, and whether or not they\'re sustainable!", "for future purchases, do some research on the company to understand how the product was made-- especially whether or not it was made sustainably!", "for future purchases, make sure to do research on the company you\'re buying from to see if your values align with theirs!", "for future purchases, look at secondhand options for similar items if you haven\'t already!"],
        "i don\'t know": ["for future purchases, make sure to check what materials an item is made out of, and whether or not they\'re sustainable!", "for future purchases, do some research on the  company to understand how the product was made-- especially whether or not it was made sustainably!", "for future purchases, make sure to do research on the company you\'re buying from to see if your values align with theirs!", "for future purchases, look at secondhand options for similar items if you haven\'t already!"]
    },
    points: [1, 0, 0]
}, {
    page: 'return',
    title: 'do you see yourself returning this item?',
    subtitle: '',
    text: 'according to Edwards et al. as cited in Forbes, "it is anticipated that each year 5 billion pounds of waste is generated through returned clothing"',
    type: 'mult',
    options: {
        "yes": ["if you don\'t know if you\'ll like it, give yourself a few weeks to think about it!", "in the future, if you\'re unsure about an item, take time to reflect and research on  whether or not you truly need it."],
        "no": ["yay! you\'re buying an item that you know you\'ll keep!"]
    },
    points: [0, 1]
}, {
    page: 'disposal',
    title: 'do you have a sustainable disposal plan?',
    subtitle: '',
    text: 'it\'s important to consider your purchase\'s end-of-life! think about what you\'d like to do when you no longer want this item.',
    type: 'mult',
    options: {
        'yes, I plan to donate/recycle/upcycle': ["fantastic! you have a divestment plan for this item!", "find upcycling inspiration here!"],
        'no, I haven\'t really thought about it': ["for future reference, create a disposal plan so you know what to do with any item you no longer want! we suggest donation, recycling, or upcycling."]
    },
    points: [1, 0]
}];

var final_responses = new Set();
var final_points = [0, 0, 0, 0, 0];

var PageContainer = function (_React$Component) {
    _inherits(PageContainer, _React$Component);

    function PageContainer(props) {
        _classCallCheck(this, PageContainer);

        return _possibleConstructorReturn(this, (PageContainer.__proto__ || Object.getPrototypeOf(PageContainer)).call(this, props));
    }

    _createClass(PageContainer, [{
        key: 'render',
        value: function render() {
            var listItems = questions.map(function (item, index) {
                return React.createElement(Page, { info: item, key: item.page, index: index });
            });

            return React.createElement(
                'div',
                null,
                listItems
            );
        }
    }]);

    return PageContainer;
}(React.Component);

var Page = function (_React$Component2) {
    _inherits(Page, _React$Component2);

    function Page(props) {
        _classCallCheck(this, Page);

        return _possibleConstructorReturn(this, (Page.__proto__ || Object.getPrototypeOf(Page)).call(this, props));
    }

    _createClass(Page, [{
        key: 'render',
        value: function render() {
            var divStyle = { display: 'none' };

            return React.createElement(
                'div',
                { className: 'dfa-page', style: divStyle, id: this.props.info.page, key: this.props.info.page },
                React.createElement(Header, { title: this.props.info.title,
                    subtitle: this.props.info.subtitle,
                    text: this.props.info.text
                }),
                React.createElement(MultChoice, { page: this.props.info, index: this.props.index
                })
            );
        }
    }]);

    return Page;
}(React.Component);

var MultChoice = function (_React$Component3) {
    _inherits(MultChoice, _React$Component3);

    function MultChoice(props) {
        _classCallCheck(this, MultChoice);

        var _this3 = _possibleConstructorReturn(this, (MultChoice.__proto__ || Object.getPrototypeOf(MultChoice)).call(this, props));

        _this3.handleClick = _this3.handleClick.bind(_this3);
        _this3.state = { checkedID: null, responses: [], recentPoints: 0 };
        return _this3;
    }

    _createClass(MultChoice, [{
        key: 'handleClick',
        value: function handleClick(e) {
            var option_index = e.target.id.split("-")[1];
            var options_set = questions[this.props.index].options;
            var points_list = questions[this.props.index].points;
            var responses = Object.values(options_set)[option_index];
            var points = Object.values(points_list)[option_index];
            if (e.target.className == "dfa-question") {
                if (this.state.checkedID != null) {
                    document.getElementById(this.state.checkedID).children[0].className = "dfa-empty-leaf";
                    document.getElementById(this.state.checkedID).className = "dfa-question";
                }
                e.target.className = "dfa-question-active";
                e.target.children[0].className = "dfa-main-leaf";
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.state.responses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var response = _step.value;

                        final_responses.delete(response);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                this.setState({
                    checkedID: e.target.id,
                    responses: responses,
                    recentPoints: points
                });

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = responses[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _response = _step2.value;

                        final_responses.add(_response);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                final_points[this.props.index] = points;
            } else if (e.target.className == "dfa-question-active") {
                e.target.className = "dfa-question";
                e.target.children[0].className = "dfa-empty-leaf";
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = responses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _response2 = _step3.value;

                        final_responses.delete(_response2);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                final_points[this.props.index] = 0;
                this.setState({
                    checkedID: null,
                    responses: [],
                    recentPoints: 0
                });
            }
            setTimeout(function () {
                goForward();
            }, 400);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var listOptions = Object.keys(this.props.page.options).map(function (item, index) {
                return React.createElement(
                    'div',
                    { onClick: _this4.handleClick, key: _this4.props.page.page + '-' + index.toString() },
                    React.createElement(MultChoiceOption, { option: item,
                        id: _this4.props.page.page + '-' + index.toString(),
                        response: _this4.props.page.options[item]
                    })
                );
            });

            return React.createElement(
                'div',
                { className: 'dfa-questions-container' },
                listOptions
            );
        }
    }]);

    return MultChoice;
}(React.Component);

var MultChoiceOption = function (_React$Component4) {
    _inherits(MultChoiceOption, _React$Component4);

    function MultChoiceOption(props) {
        _classCallCheck(this, MultChoiceOption);

        return _possibleConstructorReturn(this, (MultChoiceOption.__proto__ || Object.getPrototypeOf(MultChoiceOption)).call(this, props));
    }

    _createClass(MultChoiceOption, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'dfa-question', id: this.props.id, 'data-response': this.props.response },
                React.createElement('div', { className: 'dfa-empty-leaf' }),
                React.createElement(
                    'div',
                    { className: 'dfa-button-home-text' },
                    this.props.option
                )
            );
        }
    }]);

    return MultChoiceOption;
}(React.Component);

var Header = function (_React$Component5) {
    _inherits(Header, _React$Component5);

    function Header(props) {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'dfa-header' },
                React.createElement(
                    'div',
                    { className: 'dfa-title-container' },
                    React.createElement(
                        'div',
                        { className: 'dfa-title' },
                        this.props.title
                    ),
                    React.createElement(
                        'div',
                        { className: 'dfa-subtitle' },
                        this.props.subtitle
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'dfa-header-text' },
                    ' ',
                    this.props.text,
                    ' '
                ),
                React.createElement('hr', { className: 'dfa-hr' })
            );
        }
    }]);

    return Header;
}(React.Component);

var domContainer = document.querySelector('#dfa-questions');
ReactDOM.render(React.createElement(PageContainer, null), domContainer);