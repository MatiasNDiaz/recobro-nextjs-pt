export const NotFoundView = ({ message = "Lo sentimos, el recurso no existe." }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <h1 className="text-6xl font-bold text-blue-600">404</h1>
    <p className="text-xl text-gray-600 mt-4">{message}</p>
    {/* Botones de navegación */}
  </div>
);