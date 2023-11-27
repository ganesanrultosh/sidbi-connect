import {StyleSheet} from 'react-native';
import {s} from '../../utils/scale';

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    backgroundColor: '#EBF9F9',
    borderRadius: s(3),
    height: s(30),
    marginTop: s(5),
    justifyContent: 'center',
    padding: 0,
    paddingHorizontal: s(10),
    marginBottom: s(8),
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(14),
    color: 'rgba(90,53,53,0.88)',
    height: '100%',
    padding: 5,
    margin: 0,
    width: '100%',
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(14),
    color: '#EFE6DD',
    lineHeight: s(20),
  },
  textAreaContainer: {
    backgroundColor: '#FFFFFF',
    height: s(120),
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    // alignContent: 'flex-start',
    paddingVertical: s(5),
    // flex: 1,
    marginVertical: 5,
    marginRight: 15,
  },
  textArea: {
    height: '100%',
    alignSelf: 'flex-start',
    textAlign: 'left',
    textAlignVertical: 'top',
    marginLeft: 45,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#EBF9F9',
    paddingVertical: s(3),
    marginTop: s(5),
    marginBottom: s(8),
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: s(12),
    marginRight: s(40),
  },
  radioBtn: {
    borderColor: '#707070',
    borderWidth: s(3),
    height: s(26),
    width: s(26),
    borderRadius: s(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    height: s(12),
    width: s(12),
    borderRadius: s(6),
    backgroundColor: '#4A1212',
  },
  radioItemText: {
    fontFamily: 'Roboto-Bold',
    fontSize: s(14),
    color: '#5A3535',
    marginLeft: s(12),
  },
  pt5: {
    paddingTop: s(5),
  },
  groupTitle: {
    marginTop: s(11),
    fontFamily: 'Roboto-Regular',
    fontSize: s(14),
    lineHeight: s(20),
    color: '#B7A5E5',
  },
  gField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(8),
    marginTop: s(5),
  },
  gFieldLabel: {
    fontFamily: 'Roboto-Regular',
    fontSize: s(14),
    color: '#EFE6DD',
    lineHeight: s(20),
    width: '40%',
    paddingRight: s(10),
  },
  gInputContainer: {
    width: '60%',
    backgroundColor: '#EBF9F9',
    borderRadius: s(3),
    height: s(30),
    justifyContent: 'center',
    padding: 0,
    paddingHorizontal: s(5),
  },
  group: {
    marginBottom: s(18),
  },
});

export default styles;
