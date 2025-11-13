export const formStyles = {
  // Page & Card Layout
  container: "min-h-screen bg-gray-200 flex items-center justify-center p-8", // slightly deeper gray
  card: "max-w-2xl w-full bg-white shadow-2xl rounded-2xl p-10 transition-transform duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)]",

  // Label
  label: "block text-sm font-semibold text-gray-700 mb-1",
  requiredMark: "text-red-500 ml-1",

  // Inputs
  input:
    "w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in-out transform focus:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 shadow-sm focus:shadow-md bg-white",
  textArea:
    "w-full px-4 py-3 border rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-300 ease-in-out transform focus:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 shadow-sm focus:shadow-md bg-white",

  // Input States
  inputError: "border-red-500 focus:ring-red-400",
  inputNormal: "border-gray-300",
  errorText: "text-sm text-red-500 mt-1",

  // Image Upload (aligned with other inputs)
  inputContainer:
    "w-full mt-1 border rounded-xl border-gray-300 bg-white hover:border-blue-400 transition-all duration-300 ease-in-out transform focus-within:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 p-6 flex flex-col items-center justify-center text-center space-y-2 shadow-sm focus-within:shadow-md",
  uploadIcon:
    "h-12 w-12 text-gray-400 transition-transform duration-300 hover:scale-110",
  uploadButton:
    "relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500",
  previewImage:
    "mx-auto h-40 w-40 object-cover rounded-xl shadow-sm hover:shadow-md transition duration-300",

  // Buttons
  buttonPrimary:
    "px-6 py-2 rounded-xl text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transform transition-all duration-300 ease-in-out hover:scale-[1.03] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400",
  buttonSecondary:
    "px-6 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200 transform transition-all duration-300 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-gray-300",

  // Status Messages
  statusError: "text-red-500 text-sm font-medium mt-2",
  statusSuccess: "text-green-600 text-sm font-medium mt-2",
};
