import { useParams, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import css from './MoviesDetailsPage.module.css';
import { fetchFilmsById } from '../../services/fetchFilms';
import MovieDetail from '../../components/MovieDetail/MovieDetail';
import Loader from '../../components/Loader/Loader';

const navLinkCLass = ({ isActive }) => {
  return clsx(css.navItem, isActive && css.active);
};

function MoviesDetailsPage() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [film, setFilm] = useState(null);
  const location = useLocation();
  const goBackUrl = useRef(location?.state ?? './movies')

  useEffect(() => {
    async function fetchFilmById() {
      try {
        setLoading(true);
        const data = await fetchFilmsById(movieId);
        setFilm(data);
      } catch (error) {
        console.log('Error fetching film by id:', error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFilmById();
  }, [movieId]);

  if (!film) {
    return <Loader/>
  }
  return (
    <div>
      <NavLink to={goBackUrl.current} className={css.btn}>Go back</NavLink>
      {loading && <Loader />}
      <MovieDetail film={film} />
      <p className={css.text}>Additional information:</p>
      <nav className={css.nav}>
        <NavLink to="cast" className={navLinkCLass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={navLinkCLass}>
          Reviews
        </NavLink>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}

export default MoviesDetailsPage;
