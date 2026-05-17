export default async function handler(req, res) {
  const id = req.query.id;
  const apiKey = "9c8083df192467a734789e2838ce7bf1";

  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

  const r = await fetch(url);
  const data = await r.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
