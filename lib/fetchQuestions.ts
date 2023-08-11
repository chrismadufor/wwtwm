export async function fetchQuestion(value: number) {
  const res = await fetch(
    `https://wwtwmserver.onrender.com/admin/fetch_questions_params/${"A"}/${value}/${value}`
  );
  return res.json();
}
