import React, { Component, PropTypes  } from 'react'
import { bindActionCreators  } from 'redux'
import { connect  } from 'react-redux'
// import Header from '../components/Header'
// import MainSection from '../components/MainSection'
import Starter from '../components/Starter'
import DocTextField from '../components/DocTextField'
import * as DocActions from '../actions'

class App extends Component {

    constructor(props, context) {
        super(props,context);
        this.state = {
            zen : this.props.zen || false,
            id : this.props.id || 0
        }
    }

    goZen() {
        this.props.actions.initDoc({expire:10, focus: 10, content: "I will disappear in 10 seconds if you do nothing"});
        this.setState({id: this.props.docs.length,zen: true});
    }

    setId(id) {
        this.setState({id});
    }

    onDel(id) {
        this.props.actions.delDoc(id);
        this.setState({zen: false});
    }

    render() {
        const { docs, actions } = this.props;
        if (this.state.zen) {
            return (
                <DocTextField {...docs[this.state.id]} {...actions} onDel={this.onDel.bind(this)} />
            )
        } else {
            return (
                <Starter edit={false} setId={this.setId.bind(this)} goZen={this.goZen.bind(this)} {...actions} />
            )
        }
        
    }
}

App.propTypes = {
    //docs: PropTypes.array.isRequired,
    //actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        docs: state.docs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(DocActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
