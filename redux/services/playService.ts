import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://wwtwmserver.onrender.com/";

const baseQuery = fetchBaseQuery({
  baseUrl,
});

export const gameApi = createApi({
  reducerPath: "gameApi",
//   refetchOnFocus: true,
  baseQuery,
  endpoints: (builder) => ({
    registerPlayer: builder.mutation({
      query: (data) => ({
        url: "player/add_player",
        method: "POST",
        body: data,
      }),
    }),
    fetchGameQuestion: builder.mutation({
      query: (data) => ({
        url: `admin/fetch_questions_params/${data.category}/${data.value}/${data.value}`,
        method: "GET"
      }),
    }),
    fetchTriviaQuestion: builder.mutation({
      query: (data) => ({
        url: `admin/fetch_trivia_questions_params/${data}`,
        method: "GET"
      }),
    }),
    updateQuestionTime: builder.mutation({
      query: (data) => ({
        url: `admin/update_trivia_question_bytime/${data}`,
        method: "PUT"
      }),
    }),
    answerQuestion: builder.mutation({
      query: (data) => ({
        url: `player/answer_trivia_question`,
        method: "POST",
        body: data,
      }),
    }),
    fetchWinners: builder.mutation({
      query: (data) => ({
        url: `player/players_with_correct_answers/${data.question_id}/${data.answer}`,
        method: "GET"
      }),
    }),
  }),
});

export const {
  useRegisterPlayerMutation,
  useAnswerQuestionMutation,
  useFetchGameQuestionMutation,
  useFetchTriviaQuestionMutation,
  useFetchWinnersMutation,
  useUpdateQuestionTimeMutation,
} = gameApi;
