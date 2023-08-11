const baseUrl = "https://wwtwmserver.onrender.com/";

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");

type Request = {
  method: any;
  headers: any;
  body: any;
  redirect: any;
};

export async function fetchTriviaQuestion(value: string) {
  const res = await fetch(`${baseUrl}admin/fetch_trivia_questions_params/${value}`);
  return res.json();
}

export async function fetchWinners(value: any) {
  const res = await fetch(`${baseUrl}player/players_with_correct_answers/${value.question_id}/${value.answer}`);
  return res.json();
}

export async function registerPlayer(value: any) {
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(value),
    redirect: "follow",
  } as Request;

  const res = await fetch(`${baseUrl}player/add_player`, requestOptions);
  return res.text();
}

export async function answerQuestion(value: any) {
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(value),
    redirect: "follow",
  } as Request;

  const res = await fetch(
    `${baseUrl}player/answer_trivia_question`,
    requestOptions
  );
  return res.json();
}

export async function updateQuestionTime(id: any) {
  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: null,
    redirect: "follow",
  } as Request;

  const res = await fetch(
    `${baseUrl}admin/update_trivia_question_bytime/${id}`,
    requestOptions
  );
  return res.json();
}
