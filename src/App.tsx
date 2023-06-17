import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes/index';

const App = () => <RouterProvider router={createBrowserRouter(routes)} />;

export default App;
