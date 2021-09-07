'use strict'

let questions = [
    {
        page: 'motivation',
        title: 'is this a necessary purchase?',
        subtitle: '',
        text: 'think about whether this is a want or a need!',
        type: 'mult',
        options:
        {
            "yes": [],
            "no": ["try seeing what items from your past you can refashion your closet to fit the style you\'re cultivating!",]
        },
        points: [1, 0]
    },
    {
        page: 'wanted',
        title: 'have you wanted this for a few months or longer?',
        subtitle: '',
        text: 'think about how long you have wanted/needed this, and whether or not you can add it to a wishlist.',
        type: 'mult',
        options:
        {
            'yes': ["it\'s great that you took some time to think about this potential purchase!"],
            'no': ["think about what\'s inspiring this purchase and consider whether or not this is something you truly need.", "if not an urgent purchase, add this item to a wishlist and revisit it in the future.", "make sure you plan purchases ahead of time so that you know you\'re buying something you need!"]
        },
        points: [1, 0]

    },
    {
        page: 'sustainable',
        title: 'is this item sustainable?',
        subtitle: '',
        text: 'i.e. is it made out of sustainable materials, with sustainable practices, and/or by a sustainable company?',
        type: 'mult',
        options:
        {
            "yes": ["hooray! you\'re interested in buying items that are sustainable!", "if you\'re interested in owning clothes with sustainable materials, also consider washing your non-sustainable clothing less often to avoid the release of harmful chemicals.", "if you like to shop at sustainable companies, try compiling a list of sustainable brands!", "make sure you buy items that high quality, to avoid owning items with short lifespans!", "make sure if you\'re buying secondhand, you\'re not adopting a fast fashion mindset!", "make sure you buy items that you know you will own for a long time!"],
            "no": ["for future purchases, make sure to check what materials an item is made out of, and whether or not they\'re sustainable!", "for future purchases, do some research on the company to understand how the product was made-- especially whether or not it was made sustainably!", "for future purchases, make sure to do research on the company you\'re buying from to see if your values align with theirs!", "for future purchases, look at secondhand options for similar items if you haven\'t already!"],
            "i don\'t know": ["for future purchases, make sure to check what materials an item is made out of, and whether or not they\'re sustainable!", "for future purchases, do some research on the  company to understand how the product was made-- especially whether or not it was made sustainably!", "for future purchases, make sure to do research on the company you\'re buying from to see if your values align with theirs!", "for future purchases, look at secondhand options for similar items if you haven\'t already!"]
        },
        points: [1, 0, 0]
    },
    {
        page: 'return',
        title: 'do you see yourself returning this item?',
        subtitle: '',
        text: 'according to Edwards et al. as cited in Forbes, "it is anticipated that each year 5 billion pounds of waste is generated through returned clothing"',
        type: 'mult',
        options:
        {
            "yes": ["if you don\'t know if you\'ll like it, give yourself a few weeks to think about it!", "in the future, if you\'re unsure about an item, take time to reflect and research on  whether or not you truly need it."],
            "no": ["yay! you\'re buying an item that you know you\'ll keep!"]
        },
        points: [0, 1]
    },
    {
        page: 'disposal',
        title: 'do you have a sustainable disposal plan?',
        subtitle: '',
        text: 'it\'s important to consider your purchase\'s end-of-life! think about what you\'d like to do when you no longer want this item.',
        type: 'mult',
        options:
        {
            'yes, I plan to donate/recycle/upcycle': ["fantastic! you have a divestment plan for this item!", "find upcycling inspiration here!"],
            'no, I haven\'t really thought about it': ["for future reference, create a disposal plan so you know what to do with any item you no longer want! we suggest donation, recycling, or upcycling."]
        },
        points: [1, 0]
    }];

let final_responses = new Set();
let final_points = [0,0,0,0,0];

class PageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let listItems = questions.map((item, index) =>
            <Page info={item} key={item.page} index={index}/>
        );

        return (
            <div>
                {listItems}
            </div>
        );
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const divStyle = { display: 'none' };

        return (
            <div className="dfa-page" style={divStyle} id={this.props.info.page} key={this.props.info.page}>
                <Header title={this.props.info.title}
                    subtitle={this.props.info.subtitle}
                    text={this.props.info.text}
                />
                <MultChoice page={this.props.info} index={this.props.index}
                />
            </div>
        );
    }
}

class MultChoice extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {checkedID: null, responses: [], recentPoints: 0};
    }

    handleClick(e) {
        const option_index = e.target.id.split("-")[1];
        const options_set = questions[this.props.index].options;
        const points_list = questions[this.props.index].points;
        let responses = Object.values(options_set)[option_index];
        let points = Object.values(points_list)[option_index];
        if (e.target.className == "dfa-question") {
            if (this.state.checkedID != null) {
                document.getElementById(this.state.checkedID).children[0].className = "dfa-empty-leaf";
                document.getElementById(this.state.checkedID).className = "dfa-question";
            }
            e.target.className = "dfa-question-active";
            e.target.children[0].className = "dfa-main-leaf";
            for (const response of this.state.responses) {
                final_responses.delete(response);
            }
            this.setState({
                checkedID: e.target.id,
                responses: responses,
                recentPoints: points,
            });

            for (const response of responses) {
                final_responses.add(response);
            }
            final_points[this.props.index]=points;
        }
        else if (e.target.className == "dfa-question-active") {
            e.target.className = "dfa-question";
            e.target.children[0].className = "dfa-empty-leaf";
            for (const response of responses) {
                final_responses.delete(response);
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

    render() {

        let listOptions = Object.keys(this.props.page.options).map((item, index) =>
            <div onClick={this.handleClick} key={this.props.page.page + '-' + (index).toString()}>
                <MultChoiceOption option={item}
                    id={this.props.page.page + '-' + (index).toString()}
                    response={this.props.page.options[item]}
                />
            </div>
        );

        return (
            <div className="dfa-questions-container">
                {listOptions}
            </div>
        );
    }
}


class MultChoiceOption extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dfa-question" id={this.props.id} data-response={this.props.response}>
                <div className="dfa-empty-leaf" ></div>
                <div className="dfa-button-home-text">{this.props.option}</div>
            </div>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dfa-header">
                <div className="dfa-title-container">
                    <div className="dfa-title">{this.props.title}</div>
                    <div className="dfa-subtitle">{this.props.subtitle}</div>
                </div>
                <div className="dfa-header-text"> {this.props.text} </div>
                <hr className="dfa-hr" />
            </div>
        );
    }
}

let domContainer = document.querySelector('#dfa-questions');
ReactDOM.render(<PageContainer />, domContainer);