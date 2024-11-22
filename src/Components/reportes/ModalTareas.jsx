import PropTypes from 'prop-types';

const ModalTareas = ({ user, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <h2 className="text-xl font-bold mb-4">Tareas de {user.name}</h2>
        <p className="text-gray-700">Aquí se mostrarán las tareas.</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
ModalTareas.propTypes = {
    user: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
  };
export default ModalTareas;
