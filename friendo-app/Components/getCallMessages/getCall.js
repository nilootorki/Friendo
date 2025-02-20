import { PermissionsAndroid, Platform } from 'react-native';


async function requestPermissions() {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      ]);
      
      if (granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_CALL_LOG'] === PermissionsAndroid.RESULTS.GRANTED) {
        alert('SMS and Call Log permissions granted');
      } else {
        alert('Permissions denied');
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

export default requestPermissions;


async function getCallLogs() {
  try {
    const logs = await CallLogs.load(10); // Fetch 10 latest call logs
    console.log('Call Logs: ', logs);
  } catch (e) {
    console.error(e);
  }
}
