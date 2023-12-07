import {PermissionsAndroid, Platform} from 'react-native';
import {
  request as PermissionRequest,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const HasWritePermission = async () => {
  if (Platform.OS === 'android') {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasAndroidPermission = await PermissionsAndroid.check(permission);
    if (hasAndroidPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  } else if (Platform.OS === 'ios' || Platform.OS === 'macos') {
    const hasAndroidPermission = await PermissionRequest(
      PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    );
    return hasAndroidPermission === RESULTS.GRANTED;
  }
};

export const HasCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const permission = PermissionsAndroid.PERMISSIONS.CAMERA;
    const cameraPermission = await PermissionsAndroid.check(permission);
    if (cameraPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  } else if (Platform.OS === 'ios') {
    const cameraPermission = await PermissionRequest(PERMISSIONS.IOS.CAMERA);
    return cameraPermission === RESULTS.GRANTED;
  }
};

export const HasLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

    const hasAndroidPermission = await PermissionsAndroid.check(permission);
    if (hasAndroidPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  } else if (Platform.OS === 'ios' || Platform.OS === 'macos') {
    const hasAndroidPermission = await PermissionRequest(
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );
    return hasAndroidPermission === RESULTS.GRANTED;
  }
};
