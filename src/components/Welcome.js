import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { primaryColor } from '../styleVars';
import { setWelcomed } from '../actions';

const saladImage = require('../assets/healthy-salad.png');

class Welcome extends Component {
  onButtonPress() {
    const { needsGoals } = this.props;

    this.props.setWelcomed(true);

    if (needsGoals) {
      Actions.newGoals({ type: ActionConst.RESET });
    } else {
      Actions.home({ type: ActionConst.RESET });
    }
  }
  render() {
    const {
      imageStyle,
      headerTextStyle,
      bodyStyle,
      buttonStyle,
      touchableStyle,
      buttonContainerStyle,
      buttonTextStyle,
    } = styles;

    return (
      <Image style={imageStyle} source={saladImage}>
        <Text style={headerTextStyle}>Welcome!</Text>
        <Text style={bodyStyle}>To get started, please set 1-3 nutrutional goals. Every time you eat or drink something, you will log an entry for how well you followed those goals</Text>
        <View style={buttonContainerStyle}>
          <View style={buttonStyle}>
            <TouchableOpacity style={touchableStyle} onPress={this.onButtonPress.bind(this)}>
              <Text style={buttonTextStyle}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Image>
    );
  }
}

const styles = {
  imageStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: null,
    width: null,
  },
  headerTextStyle: {
    color: '#FFF',
    fontSize: 36,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  bodyStyle: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    color: '#FFF',
    fontSize: 18,
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainerStyle: {
    marginTop: 30,
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: primaryColor,
    height: 50,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
  },
  touchableStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '300',
    fontSize: 18,
  },
};

const mapStateToProps = (state) => {
  return {
    needsGoals: state.goals.length === 0,
  };
};

export default connect(mapStateToProps, { setWelcomed })(Welcome);
