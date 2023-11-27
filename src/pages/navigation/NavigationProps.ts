import { RouteProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../Navigation";

export type PartnerRegistrationProps = NativeStackScreenProps<RootStackParamList, 'Register'>;
export type PartnerRegistrationRouteProps = RouteProp<RootStackParamList, 'Register'>;
export type PartnerRegistrationContactProps = NativeStackScreenProps<RootStackParamList, 'RegisterContactInfo'>;
export type PartnerRegistrationContactRouteProps = RouteProp<RootStackParamList, 'RegisterContactInfo'>;

export type LeadBasicInfoProps = NativeStackScreenProps<RootStackParamList, 'LeadBasicInfo'>;
export type LeadBasicInfoRouteProps = RouteProp<RootStackParamList, 'LeadBasicInfo'>;
export type LeadContactInfoProps = NativeStackScreenProps<RootStackParamList, 'LeadContactInfo'>;
export type LeadContactInfoRouteProps = RouteProp<RootStackParamList, 'LeadContactInfo'>;
export type LeadSubmissionProps = NativeStackScreenProps<RootStackParamList, 'LeadSubmission'>;
export type LeadSubmissionRouteProps = RouteProp<RootStackParamList, 'LeadSubmission'>;
export type LeadConsentProps = NativeStackScreenProps<RootStackParamList, 'LeadConsent'>;
export type LeadConsentRouteProps = RouteProp<RootStackParamList, 'LeadConsent'>;