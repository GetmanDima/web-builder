export const getTypeClassName = (type: string): string => {
  let className = '';

  if (type === 'blue') {
    className = 'bg-blue-500 border-blue-600 text-white hover:bg-blue-600'
  }

  if (type === 'red') {
    className = 'bg-red-500 border-red-600 text-white hover:bg-red-600'
  }

  if (type === 'white') {
    className = 'bg-white border-black text-black hover:bg-gray-100'
  }

  return className;
}