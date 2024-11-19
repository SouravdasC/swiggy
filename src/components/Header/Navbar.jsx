import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { PiBagSimpleFill } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { IoHelp } from "react-icons/io5";
import { IoIosLogIn } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RiMenu4Fill } from "react-icons/ri";
import { CartContext, LocationContext, VisibilityContext } from "../../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleMenuBtn, toggleSearchBar } from "../../redux/toggleSlice";
import authSlice from "../../redux/authSlice";
import Signin from "../FirebaseAuth/Signin";


function Navbar() {

  const navMenu = [
    // {
    //   path: '/corporate',
    //   icon: <PiBagSimpleFill />,
    //   name: ' corporate'
    // },
    {
      path: '/search',
      icon: <IoSearchOutline />,
      name: 'search'
    },
    // {
    //   path: '/offer',
    //   icon: <BiSolidOffer />,
    //   name: 'offer'
    // },
    // {
    //   path: '/help',
    //   icon: <IoHelp />,
    //   name: 'help'
    // },
    {
      path: '/signin',
      icon: <IoIosLogIn />,
      name: 'sign in'
    },
    {
      path: '/cart_2',
      icon: <IoCartSharp />,
      name: 'cart'
    },
  ]

  // access from contextApi
  // const { visible, setVisible } = useContext(VisibilityContext);
  // console.log(visibility);

  // access from redux
  const visible = useSelector((state) => state.toggleSlice.searchToggle)
  const dispatch = useDispatch();


  function handleSearchFun() {
    // setVisible(prev => !prev)
    dispatch(toggleSearchBar());
  }

  // location search
  const [searchResult, setSearchResult] = useState([]);

  const searchResultFun = async (value) => {
    const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`);
    const result = await res.json();
    // console.log(result.data);
    setSearchResult(result.data)
  }

  // location click
  const { setLocationSelect } = useContext(LocationContext);
  const [address, setAddress] = useState('');

  const locationHandler = async (id) => {
    // console.log(id);
    handleSearchFun();
    const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`);
    const result = await res.json();
    setLocationSelect({
      lat: result?.data[0]?.geometry?.location?.lat,
      lng: result?.data[0]?.geometry?.location?.lng
    });
    setAddress(result?.data[0]?.formatted_address);
    // console.log(result?.data[0]?.geometry?.location?.lat);
    // console.log(result?.data[0]?.geometry?.location?.lng);
    // console.log(result?.data[0]?.formatted_address);

  }

  // cart context
  // const { cart, setCart } = useContext(CartContext);

  // redux login page
  const cart = useSelector(state => state.cartSlice.cartItems);
  const userAuthData = useSelector(state => state.authSlice.userData);

  const toggleLoginState = useSelector(state => state.toggleSlice.toggleLogin)
  const handleLoginPage = () => {
    dispatch(toggleLogin())
  }

  // menuBtn 
  const menuBtn = useSelector(state => state.toggleSlice.menuBtn)
  function handleMenuBtn() {
    dispatch(toggleMenuBtn());
  }


  return (
    <div className=" md:w-full sticky  top-0 left-0 right-0 z-50">

      {/* searchbar Toggle  */}
      <div className="relative">
        <div className={`bg-black/50 w-full h-screen absolute z-40 ${visible ? 'visible' : 'invisible'}`} onClick={handleSearchFun}>
        </div>
        <div className={`absolute z-50 bg-white w-[60%] sm:w-[40%] h-screen duration-500 ${visible ? 'left-0' : '-left-[100%]'}`}>
          <div className="p-5 w-[65%] flex flex-col gap-5">
            <p className='mt-4 text-white' onClick={handleSearchFun} >
              <MdClose className="text-black text-[2rem] font-extrabold" />
            </p>
            <input type="text" className="border  w-[12rem] sm:w-[95%] rounded-md shadow-2xl shadow-indigo-500/40 py-2 px-2 sm:py-3 sm:px-8 sm:mt-3 focus:shadow-lg focus:outline-none text-[0.9rem] font-semibold sm:font-semibold text-gray-300 hover:text-orange-500" onChange={(e) => searchResultFun(e.target.value)} placeholder="Search for area, street name....." />
            <div>
              {
                searchResult?.map((data, index) => (
                  <div key={index} onClick={() => locationHandler(data.place_id)} className="shadow-lg p-5 flex gap-2 ">
                    <span><IoLocationOutline className="font-semibold text-[1.5rem]" /></span>
                    <div className="flex flex-col gap-1">
                      <h1 className="hover:text-orange-500 cursor-pointer font-semibold">
                        {data?.structured_formatting?.main_text}
                      </h1>
                      <p className="text-gray-500 text-sm">{data?.structured_formatting?.secondary_text}</p>

                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* LoginPage  */}
      <div className="relative">
        <div className={`bg-black/50 w-full h-screen absolute z-40 ${toggleLoginState ? 'visible' : 'invisible'}`} onClick={handleLoginPage}>
        </div>
        <div className={`fixed z-50 bg-white w-[99vw] sm:w-[27%] h-screen duration-500 ${toggleLoginState ? 'right-0' : '-right-[100%]'}`}>
          <div className="p-7 flex flex-col gap-5 ">
            <p className='mt-4 text-white' onClick={handleLoginPage} >
              <MdClose className="text-black text-[2rem] font-extrabold" />
            </p>
            <div className="flex justify- gap-12">
              <h1 className="capitalize font-semibold text-[2rem] flex flex-col gap-8">
                <span>Please login</span>
                <span className="w-[7.25rem] bg-black h-[0.1rem] text-black"></span>
              </h1>
              <img className="w-[8rem] red-" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
            </div>
            {/* signin component  */}
            <div>
              <Signin />
            </div>
          </div>
        </div>
      </div>

        {/* {logo}  searchBar*/}
      <nav className="container shadow-xl p-2 flex justify-around  z-30 bg-white">
        <div className="flex items-center">
          <Link to={'/'}>
            <img src="https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Emblem.png" alt="" className="w-[5rem] md:w-[6rem]" />
          </Link>
          <div>
            <Link to={''} className="flex items-center" onClick={handleSearchFun}>
              <span className="hidden sm:block capitalize font-semibold underline underline-offset-8 line-clamp-1">other, {address}</span>
              <span><MdOutlineKeyboardArrowDown className="text-3xl text-orange-600" /></span>
            </Link>
          </div>
        </div>

        {/* {menu} */}
        <div className="flex items-center">
          <ul className="flex items-center gap-2 sm:gap-9">
            {
              navMenu.map((item, index) => (
                <li key={index}>
                  {
                    item.name === 'sign in' ?
                      <div onClick={handleLoginPage}
                        className={({ isActive }) =>
                          `${isActive ? 'text-gray-600' : 'text-orange-500'} text-[1rem] flex items-center justify-center gap-1 capitalize font-medium hover:text-orange-600`}
                      >
                        <div className="flex gap-2 capitalize items-center p-2">
                          <span className="text-[1.1rem] sm:text-[1.5rem]">
                            {userAuthData ? <img src={userAuthData.photo} className="w-[10vw] sm:w-[3vw] rounded-lg"/> : item.icon}</span>
                          <span className="text-[0.5rem] sm:text-[1rem]">{userAuthData ? userAuthData.name : item.name}</span>
                        </div>
                        {item.name === 'cart' && <span>{cart.length}</span>}
                      </div>
                      :
                      <NavLink to={item.path}
                        className={({ isActive }) =>
                          `${isActive ? 'text-gray-600' : 'text-orange-500'} text-[1rem] flex items-center justify-center gap-1 capitalize font-medium hover:text-orange-600`}
                      >
                        <span className="text-[1.5rem] sm:text-[1.5rem]">{item.icon}</span>
                        <span className="hidden sm:block">{item.name}</span>
                        {item.name === 'cart' && <span>{cart.length}</span>}
                      </NavLink>
                  }

                </li>
              ))
            }

          </ul>

          {/* <div className="md:hidden">
            <RiMenu4Fill onClick={handleMenuBtn}/>
          </div> */}
        </div>
      </nav>
    </div>
  )
}
export default Navbar