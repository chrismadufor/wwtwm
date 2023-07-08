export async function fetchQuestion() {
    const res = await fetch(
        `https://wwtwmserver.onrender.com/admin/fetch_questions_params/${"A"}/${1}/${1}`
      )
        return res.json()
}