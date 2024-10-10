import Img from '../../img/softwareIntegration.png';

const LoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white dark:bg-zinc-900 p-10 rounded-lg shadow-2xl flex flex-col items-center">
        <img src={Img} alt="Cargando" className="w-24 mb-4" />
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        <p className="mt-4 text-lg text-blue-500 dark:text-blue-300">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
