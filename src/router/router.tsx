import { createBrowserRouter } from 'react-router-dom'
import { Detail } from '../pages/detail/detail'
import { Home } from '../pages/home/home'
import { Notfound } from '../pages/notfound/notfound'

const router = createBrowserRouter([
    {
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/detail/:cripto",
                element: <Detail />
            },
            {
                path: "*",
                element: <Notfound />
            },
        ]
    }
])

export { router }