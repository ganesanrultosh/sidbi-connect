import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { crudApiTemplate } from "../app/api";

import Config from "react-native-config";
import { Master } from "../models/partner/Master";
import Customer from "../models/visit/customer";
import useToken from "../components/Authentication/useToken";
const apiEndpoint = `${Config.REACT_APP_VISIT_API_ENDPOINT}/api`;

console.log("Api Endpoint:", apiEndpoint);

// Entity name in plural
const entity = "customers";

//Path for the slice (change it based on the entity)
const path = `customerApi`;

//Tags are used to notify the slice that the data has changed and it needs to be refreshed
//Entity name is added as tags for the slice (No change needed if you are operating on only this entity).
//If you want to add more tags, add them to the array.
//Generally one slice is used for one entity so no need to add more tags
const tags = [entity];

const { getToken } = useToken()

//Slice for the entity
export const customerSlice = createApi({
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
    //Get end point that returns the entity given an id
    filterCustomers: builder.query<Customer[], string>({
      query: (request) =>
        crudApiTemplate(entity).filterItem({
          name: request
        }),
      providesTags: tags,
    }),
  }),
});

//Exported hooks for use in components
export const {
  useFilterCustomersQuery
} = customerSlice;
