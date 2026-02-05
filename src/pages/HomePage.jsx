import React, { useEffect, useState, lazy, Suspense } from 'react';
import { tmdbService } from '../services/tmdbService';
import MovieRow from '../components/MovieRow';

// Lazy load MovieCard from shared_ui
const MovieCard = lazy(() => import('shared_ui/MovieCard'));
const Loader = lazy(() => import('shared_ui/Loader'));

const Hero = ({ movie }) => {
    if (!movie) return null;

    return (
        <div className="relative h-[80vh] w-full">
            <div className="absolute inset-0">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 p-4 md:p-12 space-y-4 w-full md:w-1/2">
                <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                    {movie.title}
                </h1>
                <p className="text-white text-lg line-clamp-3 drop-shadow-md">
                    {movie.overview}
                </p>
                <div className="flex space-x-4">
                    <button className="px-8 py-2 bg-white text-black rounded font-bold hover:bg-opacity-80 transition">
                        Play
                    </button>
                    <button className="px-8 py-2 bg-gray-500 bg-opacity-50 text-white rounded font-bold hover:bg-opacity-40 transition">
                        More Info
                    </button>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    const [trending, setTrending] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [
                    trendingData,
                    popularData,
                    topRatedData,
                    nowPlayingData
                ] = await Promise.all([
                    tmdbService.getTrending(),
                    tmdbService.getPopular(),
                    tmdbService.getTopRated(),
                    tmdbService.getNowPlaying(),
                ]);

                setTrending(trendingData);
                setPopular(popularData);
                setTopRated(topRatedData);
                setNowPlaying(nowPlayingData);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-netflix-black flex items-center justify-center">
                <Suspense fallback={null}>
                    <Loader size="lg" />
                </Suspense>
            </div>
        );
    }

    const heroMovie = trending[Math.floor(Math.random() * trending.length)];

    return (
        <div className="min-h-screen bg-netflix-black pb-20">
            <Hero movie={heroMovie} />

            <div className="-mt-32 relative z-10 pl-4 md:pl-0">
                <Suspense fallback={<div className="h-40 bg-gray-800 animate-pulse" />}>
                    <MovieRow title="Trending Now" movies={trending} MovieCard={MovieCard} />
                    <MovieRow title="Popular on Netflix" movies={popular} MovieCard={MovieCard} />
                    <MovieRow title="Top Rated" movies={topRated} MovieCard={MovieCard} />
                    <MovieRow title="New Releases" movies={nowPlaying} MovieCard={MovieCard} />
                </Suspense>
            </div>
        </div>
    );
};

export default HomePage;
