import { useState, useEffect,useRef } from 'react';
import { View, ScrollView, SafeAreaView, Animated, Text, TouchableOpacity, FlatList, ActivityIndicator, ActivityIndicatorBase, TextInput, Button, Image, StyleSheet, Easing } from 'react-native'
import {COLORS, icons, images, SIZES, FONT,Darkmode} from '../../constants';
import { Nearbyjobs, Welcome} from '..';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {selectBasketItems} from '../../features/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  navla: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width:'100%',
    height: 50,
    backgroundColor: COLORS.lightWhite,
    borderTopWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
    position:'absolute',
    bottom:0,
    left:0,
    right:0
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: '100%',
    width: '33%',
  },
  selectedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '33%',
    elevation: 3,
    borderTopColor:COLORS.tertiary,
    borderTopWidth:3
  },
  iconButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  list: {
    columnGap: 16,
  },
  item: {
    flexDirection:'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.7)',
    gap:10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 16,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: COLORS.primary,
  },
  artistName: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  cardsContainer: {
    width:'100%',
    marginTop: SIZES.xxLarge,
    marginBottom: SIZES.xxLarge,
    gap: SIZES.xxLarge,
    scrollbar: {
      display: 'none'
    },
  },
  rowe:{
    gap:10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  boticon:{
    width: 50,
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    position:'absolute',
    bottom:0,
    right:0,
    zIndex:1,
    marginRight:10,
    elevation: 3,
  },
  itemcount:{
    height:25,
    width:25,
    borderRadius:50,
    position:'absolute',
    zIndex:1,
    justifyContent:'center',
    alignItems:'center',
    right:0,
    marginTop:-10,
    marginRight:3
  },
  headerImage:{
    width:200,
    height:40
  },
  deliverypop:{
    height:50,
    width:'95%',
    backgroundColor:COLORS.tertiary,
    position:'absolute',
    bottom:0,
    marginBottom:55,
    flexDirection:'row',
    gap:20,
    alignItems:'center',
    elevation: 5,
    alignSelf:'center',
    borderRadius:5,
    overflow:'hidden'
  },
  deliverybutton:{
    width:60,
    height:30,
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:5,
    backgroundColor:COLORS.lightWhite,
    elevation: 3,
  },
  userpop:{
    flex:1,
    height:400,
    width:'80%',
    position:'absolute',
    left:0,
    backgroundColor:COLORS.lightWhite,
    zIndex:2,
    borderRadius:20,
    justifyContent:'center',
    marginLeft:40,
    marginTop:120,
  },
  userpopupbuttons:{
    width:'100%',
    height:50,
    position:'absolute',
    bottom:0,
    backgroundColor:COLORS.tertiary,
    flexDirection:'row',
    gap:70,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20
  }
});

const Home = ({navigation}) =>{
  const route = useRouter();
  const [selected, setSelected] = useState(0);
  const [featuredCategories, setFeaturedcategories] = useState();
  const animationValues = [1, 1, 1, 1].map(() => new Animated.Value(1));
  const items = useSelector(selectBasketItems);

  const darkmode = useSelector((state) => state.darkmode.darkmode);
  const userInfo = useSelector((state) => state.user);
  const isdelivered = useSelector((state)=> state.delivery.delivery);
  const distance = useSelector((state) => state.distance.distance);

  const [asyncuserInfo, setAsyncUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('phoneUser');

        if (data) {
          const { name, phoneNumber, email } = JSON.parse(data);
          setAsyncUserInfo(name);
        }
      } catch (error) {
        console.log('Error occurred while fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const onPress = (index) => {
    setSelected(index);
    Animated.sequence([
      Animated.timing(animationValues[index], {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
      Animated.timing(animationValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      }),
    ]).start();
  };
  const iconStyles = (index) => [
    styles.icon,
    selected === index && styles.selectedIcon,
    {
      transform: [{ scale: animationValues[index] }],
    },
  ];

  const position = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(position, {
          toValue: 300, 
          duration: 4000, 
          useNativeDriver: true,
        }),
        Animated.timing(position, {
          toValue: 0, 
          duration: 4000, 
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const interpolateOpacity = position.interpolate({
    inputRange: [0, 50, 90, 300],
    outputRange: [0, 1, 1, 0],
  });

  const interpolateX = position.interpolate({
    inputRange: [-100, 100],
    outputRange: [-100, 100],
  });






  return (

    <SafeAreaView style={{flex:1, backgroundColor:darkmode?Darkmode.white:COLORS.lightWhite}}>
      <Stack.Screen 
        options={{
          headerStyle: { backgroundColor:darkmode?Darkmode.white:COLORS.lightWhite },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 24,
            color: COLORS.grayray,
            paddingHorizontal: 16,
          },
          headerRight: () => (
            <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('cart')}>
              {items.length>0 &&(
                <View style={[styles.itemcount,{backgroundColor:darkmode?Darkmode.gray2:COLORS.tertiary}]}>
                <Text style={{textAlign:'center',}}>{items.length}</Text>
                </View>
              )}
              <Icon name='shopping-cart' size={32} color={COLORS.gray} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={()=> navigation.navigate('account')}
            >
              <Icon name='menu' size={36} color={COLORS.gray} />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Image source={require('../../assets/images/name-removed.png')} style={styles.headerImage} />
          ), 
        }}
      />

      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={{flex:1,padding: SIZES.xSmall}}>
          <Welcome navigation={navigation} darkmode={darkmode} name={asyncuserInfo}/>
          <Nearbyjobs navigation={navigation} darkmode={darkmode}/>        
        </View>
      </ScrollView>


        {!isdelivered &&(
          <View style={styles.deliverypop}>
            <View style={{marginLeft:10,width:290}}>
              <Text style={{color:'#fff'}}>Your order is on the way!</Text>
              <Animated.View style={{ opacity: interpolateOpacity, transform: [{ translateX: interpolateX }] }}>
                <Text style={{color:'#fff'}}>The estimated time of delivery is <Text style={{fontFamily:FONT.bold}}>{Math.floor(distance*3)} mins</Text> </Text>
              </Animated.View>
            </View>
            <TouchableOpacity style={styles.deliverybutton} onPress={()=>navigation.navigate('delivery')}>
              <Text style={{color:COLORS.tertiary,textAlign:'center'}}>Check</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[styles.boticon,{marginBottom: !isdelivered ? 110 :70,backgroundColor:darkmode?COLORS.secondary:COLORS.tertiary,}]}
          onPress={() => navigation.navigate('chatbot')}>
          <Icon name="chat" size={30} color={COLORS.white}/>
        </TouchableOpacity>
        

      
    <View style={styles.navla}>
      <TouchableOpacity onPress={() => {setSelected(0), navigation.navigate('home')}} style={iconStyles(0)}>
        <Icon name='build' size={28} color={selected === 0 ? COLORS.tertiary : COLORS.gray} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSelected(1), navigation.navigate('thekedar'), setSelected(0)}} style={iconStyles(1)}>
        <Icon name='people' size={28} color={selected === 1 ? COLORS.tertiary : COLORS.gray} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {setSelected(2), navigation.navigate('movers'), setSelected(0)}} style={iconStyles(2)}>
        <Icon name='local-shipping' size={28} color={selected === 2 ? COLORS.tertiary : COLORS.gray} />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default Home;