import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {Button, Block, Text} from '../componenets';
import {theme} from '../constants';

const {width, height} = Dimensions.get('window');

class ChoosePage extends Component {
  // static navigationOptions = {
  //   header: null,
  // };

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  };

  renderTermsService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms}>
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between">
          <Text h2 light>
            服务条款
          </Text>

          <ScrollView style={{marginVertical: theme.sizes.padding}}>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              1. 这是我们的服务协议
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              2. 这是我们的服务协议
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              3. 这是我们的服务协议.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              4.这是我们的服务协议.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              5. 这是我们的服务协议.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              6. 这是我们的服务协议.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              7. 这是我们的服务协议.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              8. 这是我们的服务协议.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              9. 这是我们的服务协议.
            </Text>
            <Text
              caption
              gray
              height={24}
              style={{marginBottom: theme.sizes.base}}>
              10.这是我们的服务协议.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button gradient onPress={() => this.setState({showTerms: false})}>
              <Text center white>
                我同意
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
  }

  renderIllustrations() {
    const {illustrations} = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{width, height: height / 2, overflow: 'visible'}}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {x: this.scrollX}},
          },
        ])}
      />
    );
  }

  renderSteps() {
    const {illustrations} = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, {opacity}]}
            />
          );
        })}
      </Block>
    );
  }

  render() {
    const {navigation} = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h1 center bold>
            欢迎回来.
            <Text h1 primary>
              {' '}
              Yayxs.
            </Text>
          </Text>
          <Text h3 gray2 style={{marginTop: theme.sizes.padding / 2}}>
            开启您的APP
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text center semibold white>
              登陆
            </Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('SignUp')}>
            <Text center semibold>
              注册
            </Text>
          </Button>
          <Button onPress={() => this.setState({showTerms: true})}>
            <Text center caption gray>
              服务协议
            </Text>
          </Button>
        </Block>
        {this.renderTermsService()}
      </Block>
    );
  }
}

ChoosePage.defaultProps = {
  illustrations: [
    // {id: 1, source: require('../assets/images/illustration_1.png')},
    // {id: 2, source: require('../assets/images/illustration_2.png')},
    // {id: 3, source: require('../assets/images/illustration_3.png')},
  ],
};

export default ChoosePage;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
