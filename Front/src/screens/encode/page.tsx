const encode = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-3xl font-bold mb-4">Codificador de Mensagens</h1>
        <p className="text-lg">Acesse o sistema de criptografia de mensagens.</p>
        <form className="bg-gray-800 p-6 rounded shadow-md w-96 mt-4">
            <div className="mb-4">
            <label htmlFor="message" className="block text-white mb-2">Mensagem:</label>
            <input type="text" id="message" className="border border-gray-300 p-2 rounded w-full" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Codificar
            </button>
        </form>
        </div>
    );
}

export default encode;