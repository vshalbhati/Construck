import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES,Darkmode } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  userName:(darkmode)=> ({
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color:darkmode?'rgba(255,255,255,0.5)': COLORS.lightWhite,
  }),
  welcomeMessage:(darkmode)=> ({
    fontFamily: FONT.regular,
    fontSize: SIZES.xLarge,
    color: darkmode?'rgba(255,255,255,0.5)': COLORS.lightWhite,
    marginTop: 2,
  }),
  addressText:{
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.small,
    height: '100%',
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.medium,
  },
  searchBtn:(darkmode)=> ({
    width: 50,
    height: '100%',
    backgroundColor:darkmode?COLORS.primary: COLORS.one,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  searchBtnImage: {
    width: '50%',
    height: '50%',
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: '100%',
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item,darkmode) => ({
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: activeJobType === item ?(darkmode?(Darkmode.gray2):(COLORS.secondary) ): COLORS.gray,
  }),
  tabText: (activeJobType, item,darkmode) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ?(darkmode?(Darkmode.gray2):(COLORS.secondary) ): COLORS.gray,
  }),
});

export default styles;
