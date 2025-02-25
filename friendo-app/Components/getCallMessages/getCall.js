import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log';

async function getCallLogs() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      {
        title: 'Call Log Permission',
        message: 'This app needs access to your call logs',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const logs = await CallLogs.load(10); // Get last 10 call logs
      console.log(logs);
    } else {
      console.log('Call Log permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}


export default getCallLogs;