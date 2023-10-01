import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

export type PartnerRegistrationProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type PartnerRegistrationRouteProps = RouteProp<RootStackParamList, 'Register'>;
export type PartnerRegistrationContactProps = NativeStackScreenProps<RootStackParamList, 'RegisterContactInfo'>;
export type PartnerRegistrationContactRouteProps = RouteProp<RootStackParamList, 'RegisterContactInfo'>;

