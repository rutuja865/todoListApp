// // export const fetchTasks = async () => {
// //     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
// //     const data = await response.json();
// //     return data;
// //   };
  
// import axios from 'axios';

// export const fetchTasks = async () => {
//   try {
//     // https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}
//     const response = await axios.get('https://dummyjson.com/todos');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     return [];
//   }
// };
import axios from 'axios';

export const fetchTasks = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const response = await axios.get(`https://dummyjson.com/todos?limit=${limit}&skip=${skip}`);
    return {
      todos: response.data.todos,
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return {
      todos: [],
      total: 0,
    };
  }
};
