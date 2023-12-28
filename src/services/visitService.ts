import Config from 'react-native-config';
import Toast from 'react-native-root-toast';
import Visit from '../models/visit/visit';
import ImageService from './imageService';
import service from './index';
import moment from 'moment';
import {profile} from './authService';
import {onAddVisitId, updateVisitStatus} from '../slices/visitCacheSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

export const postVisitTrigger = createAsyncThunk(
  'visit/postVisitTrigger',
  async (params: {visit: Visit}, {dispatch}) => {
    try {
      await VisitService.postVisitTrigger(params.visit, dispatch);
      Toast.show("Visit submitted sucessfully");
    } catch (error) {
      Toast.show('Error submitting visit. Please contact support.');
    }
  },
);

const VisitService = {
  postVisitTrigger: async (visit: Visit, dispatch: any) => {
    console.log('postVisitTrigger');
    if (!visit) Toast.show('Unknown error');
    else
      try {
        let images: string[];
        if (visit.report.images) {
          console.log('posting visit images');
          images = await Promise.all(
            await visit.report.images.map(async (item: any) => {
              let res = await ImageService.postImage(
                item.image,
                visit.customer.pan,
              );
              console.log(res);
              return res.message;
            }),
          );
          console.log('images posted sucessfully');
          await profile()
            .then(response => response.json())
            .then(async employee => {
              console.log("Employee id: " + employee.id);
              if (employee && Number(employee.id)) {
                await VisitService.postVisit(
                  visit,
                  images,
                  employee.id,
                  dispatch,
                );
                Toast.show('Visit posted sucessfully');
              } else {
                Toast.show('Not able to fetch emplyee information');
              }
            });
        } else {
          console.log('One image should be present');
          Toast.show(
            'Atleast one image should be captured at site for a visit report.',
          );
          throw new Error('One image should be present');
        }
      } catch (error: any) {
        console.log('Visit trigger error', error?.message);
        throw new Error(error?.message);
      }
  },
  postEmptyVisit: async (params: {
    customerId: number | undefined;
    visitDate: any;
    reportId: number;
    iid: number;
    orgName: string;
    orgPan: string;
  }) => {
    try {
      console.log(
        'Empty visit Post url',
        Config.VISITS_POST!.replace('{iid}', params?.iid?.toString()),
      );
      return service.post(
        Config.VISITS_POST!.replace('{iid}', params?.iid?.toString()),
        {
          customerId: params.customerId,
          reportId: params.reportId,
          visitDate: params.visitDate,
          visitData: JSON.stringify({}),
          customerName: params.orgName,
          customerPAN: params.orgPan,
        },
      );
    } catch (error: any) {
      console.log('post empty visit', error);
      throw new Error(error?.response?.data);
    }
  },
  postVisit: async (
    visit: Visit,
    images: string[],
    iid: number,
    dispatch: any,
  ) => {
    try {
      console.log('Post visit', visit.id, iid);
      let visitKey = visit.customer.pan + visit.report.reportId;

      if (!visit.id) {
        let emptyVParams = {
          visitDate: moment().format('YYYYMMDD'),
          reportId: visit.report.reportId,
          customerId: visit.customer.id! || undefined,
          iid: iid,
          orgName: visit.customer.name,
          orgPan: visit.customer.pan,
        };
        console.log('emptyVParams', emptyVParams);
        
        dispatch(updateVisitStatus({visitKey: visitKey, status: "submitted"}))
        await VisitService.postEmptyVisit(emptyVParams as any).then(
          emptyVRes => {
            if (!emptyVRes?.data.id) {
              throw new Error('Something went wrong');
            }
            
            dispatch(onAddVisitId({visitKey, id: emptyVRes.data?.id}));
            console.log('push to server', visit.id, emptyVRes?.data?.id);
            visit.id = emptyVRes.data?.id;
          },
        );
      }

      if(visit.id) {
        console.log('Patching visit');
        const data: any = {};
        visit.report.pages.forEach((page: any) => {
          page.segments.forEach((seg: any) => {
            seg.fields.forEach((field: any) => {
              if (field.fieldType === 'groupText') {
                field.group.forEach((groupItem: any) => {
                  groupItem.groupFields.forEach((groupField: any) => {
                    if (groupField.fieldValue) {
                      data[groupField.fieldId.toString()] = {
                        fieldTitle: groupField.fieldTitle,
                        fieldValue: groupField.fieldValue,
                      };
                    }
                  });
                });
              } else if (field.fieldValue) {
                data[field.fieldId.toString()] = {
                  fieldTitle: field.fieldTitle,
                  fieldValue: field.fieldValue,
                };
              }
            });
          });
        });
        const visitData = {
          reportData: data,
          reportImages: images,
        };

        console.log(
          'Patch URL: ',
          Config.VISITS_PATCH!.replace('{iid}', iid.toString()).replace(
            '{vid}',
            visit?.id + '',
          ),
        );

        const res = await service.patch(
          Config.VISITS_PATCH!.replace('{iid}', iid.toString()).replace(
            '{vid}',
            visit?.id + '',
          ),
          {
            customerId: visit.customer.id,
            reportId: visit.report.reportId,
            visitDate: moment().format('YYYYMMDD'),
            visitData: JSON.stringify(visitData),
            customerName: visit.customer.name,
            customerPAN: visit.customer.pan,
          },
        );

        dispatch(updateVisitStatus({visitKey: visitKey, status: "synced"}))

        return res.data;
      } else {
        throw new Error("Visit Id cannot be null");
      }

      
    } catch (error: any) {
      throw new Error(error?.message);
    }
  },
  getDomainData: async (params: {domain: string, key: string}) => {
    try {
      console.log('trying to get domain Value', `/api/${params.domain}/${params.key}`)
      const res = await service.get(`/api/${params.domain}/${params.key}`);
      // console.log('json', res)
      return res;
    } catch (error: any) {
      throw new Error(error?.message);
    }
  },
};

export default VisitService;
