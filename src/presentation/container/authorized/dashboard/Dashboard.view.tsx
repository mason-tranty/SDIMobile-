import React from 'react';
import {Pressable, View} from 'react-native';
// import from library
import {PieChart} from 'react-native-svg-charts';
// import from alias
import {TextView} from '@components';
// localImport
import {useDashboardModel} from './Dashboard.hooks';
import {DashboardProps} from './types';
import {styles} from './Dashboard.style';
import {Header, Icon} from 'react-native-elements';
import {AuthorizedStoryboardParamList} from '@storyboards';

const LEGENDS = ['Completed', 'Uncompleted'];

const NavButton = (props: {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.navButton, {backgroundColor: props.color}]}>
      <Icon color="white" type="ionicon" name={props.icon} />
      <TextView style={styles.navText} text={props.title} />
    </Pressable>
  );
};

const Legend = (props: {title: string; color: string}) => {
  return (
    <View style={styles.legend}>
      <View style={[styles.circle, {backgroundColor: props.color}]} />
      <TextView text={props.title} />
    </View>
  );
};

const accent = 'rgb(111,196,197)';
const red = 'rgb(224,104,125)';
const ocean = 'rgb(108,159,243)';
const orange = 'rgb(233,184,151)';
const gray = 'rgb(82,89,108)';

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const {navigation} = props;
  const {totalInprogress, totalCompleted} = useDashboardModel();
  const data = [totalInprogress, totalCompleted];
  const colors = [red, accent, ocean, orange, gray];
  const pieData = data
    .filter((value) => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: colors[index],
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));
  const navToRoute = (route: keyof AuthorizedStoryboardParamList) => () => {
    navigation.navigate(route);
  };
  return (
    <>
      <Header
        leftComponent={
          <Icon
            onPress={props.navigation.openDrawer}
            color={'white'}
            type="ionicon"
            name="menu"
          />
        }
        centerComponent={<TextView text="Home" style={styles.header} />}
        backgroundColor={gray}
      />

      <View style={[styles.container]}>
        <View style={styles.chartContainer}>
          <TextView text="Công việc" style={styles.chartTitle} />
          <PieChart style={styles.pieChart} data={pieData} />
          <View style={styles.totalContainer}>
            <TextView
              text={(totalCompleted + totalInprogress).toString()}
              style={styles.total}
            />
          </View>
          <View style={styles.legendContainer}>
            {LEGENDS.map((x, i) => (
              <Legend key={x} title={x} color={colors[i]} />
            ))}
          </View>
        </View>
        <View style={styles.navContainer}>
          <NavButton
            onPress={navToRoute('TaskList')}
            color={ocean}
            icon="menu"
            title="Task"
          />
          <NavButton
            onPress={navToRoute('TaskList')}
            color={red}
            icon="menu"
            title="Create Issue"
          />
          <NavButton
            onPress={navToRoute('TaskList')}
            color={accent}
            icon="menu"
            title="Asset management"
          />
        </View>
      </View>
    </>
  );
};
