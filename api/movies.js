export default async function handler(req, res) {

  const type = req.query.type || "popular";

  const apiKey = "4c63ed0d29a4da8c6f3386e07b8b4c56";

  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch TMDB data" });
  }

}
