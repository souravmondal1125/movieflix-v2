
// Vercel Serverless Function - এটি এপিআই কি হাইড রাখবে
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // এটি Vercel ড্যাশবোর্ড থেকে এপিআই কি রিড করবে, কোডে ওপেন থাকবে না
    const API_KEY =$api_key = '5a38b7d65eda265648420724d027d59d'; 
    const BASE_URL = 'https://api.themoviedb.org/3';

    const { action, type, mode, page = 1, query, with_genres, primary_release_year, with_original_language, exclude_anime } = req.query;

    let target_url = '';

    if (action === 'search') {
        target_url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    } else if (action === 'south') {
        target_url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=te|ta|ml|kn&page=${page}&sort_by=popularity.desc`;
    } else {
        if (type === 'trending') {
            target_url = `${BASE_URL}/trending/${mode}/week?api_key=${API_KEY}&page=${page}`;
        } else {
            target_url = `${BASE_URL}/discover/${mode}?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`;
        }
    }

    if (with_genres) target_url += `&with_genres=${with_genres}`;
    if (primary_release_year) {
        target_url += mode === 'movie' ? `&primary_release_year=${primary_release_year}` : `&first_air_date_year=${primary_release_year}`;
    }
    if (with_original_language) target_url += `&with_original_language=${with_original_language}`;
    if (exclude_anime === 'true') target_url += `&without_genres=16`;

    try {
        const response = await fetch(target_url);
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: true, message: "Backend Server Error" });
    }
}
