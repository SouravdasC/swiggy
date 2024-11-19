import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout"
import InnerTopRes from "./pages/InnerTopRes"
import { useContext } from "react"
import { VisibilityContext } from "./context/contextApi"
import Cart from "./components/Body/Cart/Cart"
import { useSelector } from "react-redux"
import Signin from "./components/FirebaseAuth/Signin"
import Cart_2 from "./components/Body/Cart/Cart_2"
import SearchFun from "./components/Body/SearchFunction/SearchFun"

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/topRes/:id" element={<InnerTopRes />} />
      {/* <Route path="/cart" element={<Cart />} /> */}
      <Route path="/cart_2" element={<Cart_2 />} />
      <Route path="/search" element={ <SearchFun />} />
      <Route path="*" element={<h1>coming soon.....</h1>} />

    </Route>
  )
)

function App() {

  // contextApi
  // const { visible } = useContext(VisibilityContext);
  // console.log(hello);

  // redux
  const visible = useSelector(state => state.toggleSlice.searchToggle)

  return (
    <>
      <div className={visible ? 'max-h-screen overflow-hidden z' : ''}>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
