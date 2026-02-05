import React, { useRef } from 'react';

const MovieRow = ({ title, movies, MovieCard }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-white text-xl md:text-2xl font-semibold mb-4 px-4 md:px-12">
                {title}
            </h2>
            <div className="relative group">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center"
                >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Movie Cards Container */}
                <div
                    ref={rowRef}
                    className="flex overflow-x-scroll scrollbar-hide space-x-2 px-4 md:px-12 py-2"
                >
                    {movies.map((movie) => (
                        <div key={movie.id} className="w-40 md:w-48 flex-shrink-0">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black bg-opacity-50 hover:bg-opacity-75 transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center"
                >
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MovieRow;
