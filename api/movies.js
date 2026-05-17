export default async function handler(req, res) {
  const page = req.query.page || 1;
  const apiKey = "9c8083df192467a734789e2838ce7bf1";

  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

  const r = await fetch(url);
  const data = await r.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}








 

  




 
