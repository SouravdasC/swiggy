import { signInWithPopup, signOut } from "firebase/auth"
import { auth, provider } from "../../config/firebaseAuth"
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { toggleLogin } from "../../redux/toggleSlice";

function Signin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userDataLogOut = useSelector(state => state.authSlice.userData);

    const handleAuth = async () => {
        const data = await signInWithPopup(auth, provider);
        // console.log(data);
        const userData = {
            name: data.user.displayName,
            photo: data.user.photoURL
        }
        dispatch(addUserData(userData));
        navigate('/cart');
        dispatch(toggleLogin());
    }

    async function handleLogOut() {
        await signOut(auth);
        dispatch(removeUserData());
        toast.success('Log Out successfull');
        dispatch(toggleLogin());
    }


    return (
        <div>


            {
                userDataLogOut ?
                    <button onClick={handleLogOut} className="uppercase text-sm px-5 py-2 font-bold text-white w-[70%] bg-orange-600">
                        LogOut
                    </button>
                    : <button onClick={handleAuth} className="uppercase text-sm px-5 py-2 font-bold text-white w-[70%] bg-orange-600 ">
                        logIn
                    </button>
            }

        </div>
    )
}
export default Signin