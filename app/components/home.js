'use strict';

import React, { Component } from 'react';
var {
    StyleSheet,
    ListView,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    Button,
} = require('react-native');

import Modal from "react-native-modal";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions'; //Import your actions

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    modalContainer: {
        width: 200,
        height: 200,
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignSelf: 'center',
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalText: {
        textAlign: 'center',
    },
    row: {
        borderBottomWidth: 1,
        borderColor: "#ccc",
        // height: 50,
        padding: 10
    },

    title: {
        fontSize: 15,
        fontWeight: "600"
    },

    description: {
        marginTop: 5,
        fontSize: 14,
    }
});

class Home extends Component {
    constructor(props) {
        super(props);
        
        var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            ds: ds,
            modalVisible: false,
            modalTitle: '',
        };
    }

    componentDidMount() {
        this.props.getData(); //call our action
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    itemPress(data) {
        console.log(data);
        this.setState({
            modalTitle: data.title,
        });
        this.setModalVisible(true);        
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator
                        animating={true}
                        style={[{ height: 80 }]}
                        size="small"
                    />
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20 }}>
                    <ListView enableEmptySections={true}
                        dataSource={this.state.ds.cloneWithRows(this.props.data)}
                        renderRow={this.renderRow.bind(this)} />
                    <Modal isVisible={this.state.modalVisible}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>{this.state.modalTitle}</Text>
                            <Button title="Close" onPress={()=>this.setModalVisible(false)}></Button>
                        </View>
                    </Modal>
                </View>
            );
        }
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.row} >
                <Text style={styles.title} onPress={() => this.itemPress(rowData)}>
                    {(parseInt(rowID) + 1)}{". "}{rowData.title}
                </Text>
                <Text style={styles.description}>
                    {rowData.description}
                </Text>
            </View>
        )
    }
};



// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data
    }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);