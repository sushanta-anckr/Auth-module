
const Notify = () => {


  //   const incognito = 
  // const real = 




  return (
    <div className=" h-[60vh]">
        <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg mt-48">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Send Notification</h1>

          {/* Notification Form */}
          <form className="space-y-4">
            {/* Title Input */}
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-400 flex items-start"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="mt-1 py-2 px-2 bg-gray-300 text-gray-700 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-400 flex items-start"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 px-2 bg-gray-300 text-gray-700 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              ></textarea>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Send Notification
            </button>
          </form>
        </div>
    </div>
  );
};

export default Notify;
