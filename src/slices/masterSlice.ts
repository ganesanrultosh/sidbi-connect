import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { crudApiTemplate } from "../app/api";

import Config from "react-native-config";
import { Master } from "../models/Master";
const apiEndpoint = `${Config.REACT_APP_API_ENDPOINT}/open`;

console.log(apiEndpoint);

// Entity name in plural
const entity = "master";

//Path for the slice (change it based on the entity)
const path = `masterApi`;

//Tags are used to notify the slice that the data has changed and it needs to be refreshed
//Entity name is added as tags for the slice (No change needed if you are operating on only this entity).
//If you want to add more tags, add them to the array.
//Generally one slice is used for one entity so no need to add more tags
const tags = [entity];

//Slice for the entity
export const masterSlice = createApi({
  reducerPath: path,
  baseQuery: fetchBaseQuery({
    //Backend api end point
    baseUrl: apiEndpoint,
  }),
  tagTypes: tags,
  //Look at swagger documentation for api end points
  //http(s)://apiEndpoint/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config#/Leads
  endpoints: (builder) => ({
    //Get end point that returns the entity given an id
    getMaster: builder.query<Master, number>({
      query: (request) =>
        crudApiTemplate(entity).getItem(
          request
        ),
      providesTags: tags,
    }),
  }),
});

//Exported hooks for use in components
export const {
  useGetMasterQuery
} = masterSlice;
