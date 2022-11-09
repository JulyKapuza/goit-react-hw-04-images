import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ onLoadMore }) {
  return (
    <button className={css.Button} onClick={onLoadMore} type="button">
      LoadMore
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
