
import PropTypes from 'prop-types';

const TodoItem = ({ todo, onDelete }) => (
  <div className="card w-full bg-base-100 shadow-xl">
    <div className="card-body">
      <h2 className="card-title">{todo.title}</h2>
      <p>{todo.description}</p>
      <div className="card-actions justify-end">
        <button className="btn btn-error" onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
