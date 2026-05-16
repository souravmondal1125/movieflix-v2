export default async function handler(req, res) {
  const page = req.query.page || 1;
  const apiKey = "4c63ed0d29a4da8c6f3386e07b8b4c56";

  const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
