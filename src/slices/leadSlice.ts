import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { crudApiTemplateWithParent } from "../app/api";
import { Child, RequestWithParentId } from "../models/partner/baseModels";
import useToken from "../components/Authentication/useToken";
import { Lead } from "../models/partner/Lead";

import Config from "react-native-config";
const apiEndpoint = `${Config.REACT_APP_CONNECT_API_ENDPOINT}/api`;

console.log(apiEndpoint);

// Entity name in plural
const entity = "leads";
const parentEntity = "partners";

//Path for the slice (change it based on the entity)
const path = `leadsApi`;

//Tags are used to notify the slice that the data has changed and it needs to be refreshed
//Entity name is added as tags for the slice (No change needed if you are operating on only this entity).
//If you want to add more tags, add them to the array.
//Generally one slice is used for one entity so no need to add more tags
const tags = [entity];

const { getToken } = useToken()

//Slice for the entity
export const leadSlice = createApi({
  reducerPath: path,
  baseQuery: fetchBaseQuery({
    //Backend api end point
    baseUrl: apiEndpoint,
    prepareHeaders: async (headers, {getState}) => {
      const token = await getToken()
      headers.set('Authorization', `Bearer ${token}`)
      return headers
    }
  }),
  tagTypes: tags,
  //Look at swagger documentation for api end points
  //http(s)://apiEndpoint/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/Leads
  endpoints: (builder) => ({
    //List end point that returns a pagination result of the entity given a search request
    listLeads: builder.query<
      Lead[],
      number
    >({
      query: (parentId: number) =>
        crudApiTemplateWithParent(parentEntity, entity).listItem(parentId),
      providesTags: tags,
    }),
    //Get end point that returns the entity given an id
    getLead: builder.query<Lead, Child>({
      query: (request) =>
        crudApiTemplateWithParent(parentEntity, entity).getItem(
          request.parentId ? request.parentId : 0,
          request.id
        ),
      providesTags: tags,
    }),
    //Add end point that posts the entity and returns the added entity
    addLead: builder.mutation<Lead, Child>({
      query: (request) =>
        crudApiTemplateWithParent(parentEntity, entity).addItem(
          request.parentId ? request.parentId : 0,
          request
        ),
      invalidatesTags: tags,
    }),
    //Update end point that updates the entity and returns the updated entity
    updateLead: builder.mutation<Lead, Child>({
      query: (request) =>
        crudApiTemplateWithParent(parentEntity, entity).updateItem(
          request.parentId ? request.parentId : 0,
          request.id
        ),
      invalidatesTags: tags,
    }),
    //Delete end point that deletes the entity given an id
    deleteLead: builder.mutation<void, Child>({
      query: (request) =>
        crudApiTemplateWithParent(parentEntity, entity).deleteItem(
          request.parentId ? request.parentId : 0,
          request.id ? request.id : 0
        ),
      invalidatesTags: tags,
    }),
  }),
});

//Exported hooks for use in components
export const {
  useListLeadsQuery,
  useGetLeadQuery,
  useAddLeadMutation,
  useUpdateLeadMutation,
  useDeleteLeadMutation,
} = leadSlice;
