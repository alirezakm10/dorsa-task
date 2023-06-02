import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Animations = {
  data:string[];
}

export const animationsApi = createApi({
  reducerPath: 'animationsApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl:'https://kodoumo.ir/wp-json/api/v2/reviews-category/',
  }),
  endpoints: (builder) => ({
    getAnimationsByPage: builder.query<Animations, number>({
      query: (page) => `animations/?page=${page}`
    }),
    sortedAnimation: builder.query<Animations[], string>({
      query: (sortBy) => `animations/?sortby=${sortBy}`
    }),
  })
})

export const {
  useSortedAnimationQuery,
  useGetAnimationsByPageQuery
} = animationsApi