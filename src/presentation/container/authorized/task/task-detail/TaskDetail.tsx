import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {Header, Icon} from 'react-native-elements';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {TextView} from '@components';
import {Colors} from '@resources';

import {TaskDetailProps} from './types';
import {TaskFeedBack} from './TaskFeedBack';
import {TaskInfo} from './TaskInfo';

const initialLayout = {width: Dimensions.get('window').width};
export const TaskDetail: React.FC<TaskDetailProps> = (props) => {
  const {project, state} = props.route.params;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'Information', title: 'Thông tin'},
    {key: 'FeedBack', title: 'Phản hồi'},
  ]);

  const renderScene = SceneMap({
    Information: () => <TaskInfo item={project} taskState={state} />,
    FeedBack: () => <TaskFeedBack item={project} />,
  });

  const renderTabBar = (p: any) => (
    <TabBar
      {...p}
      indicatorStyle={{backgroundColor: Colors.gray}}
      style={styles.tabBarStyle}
      labelStyle={{color: Colors.gray}}
    />
  );

  return (
    <>
      <Header
        leftComponent={
          <Icon
            onPress={() => props.navigation.pop()}
            color={'white'}
            type="ionicon"
            name="arrow-back"
          />
        }
        centerComponent={
          <TextView text={'Chi tiết công việc'} style={styles.header} />
        }
        backgroundColor={Colors.gray}
      />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  tabBarStyle: {backgroundColor: 'white'},
});
