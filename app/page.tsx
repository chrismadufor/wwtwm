"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { resetGame, setRole, setCategory, setUser } from "@/redux/features/playSlice";
import { useRegisterPlayerMutation } from "@/redux/services/playService";
import Spinner from "./play/components/Spinner";

export default function Home() {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const [registerPlayer] = useRegisterPlayerMutation()
  const [loading, setLoading] = useState(false)
  const user = useAppSelector((state: any) => state.playReducer.user);

  useEffect(() => {
    if (user && user.fullname) router.push("/play");
    dispatch(resetGame())
  }, []);

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };
  const onEmailChange = (event: any) => {
    setEmail(event.target.value);
  };
  const onPhoneChange = (event: any) => {
    setPhone(event.target.value);
  };
  const onCategoryChange = (event: any) => {
    setCategoryData(event.target.value);
  };
  const onPasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const onRegisterPlayer = (data: any) => {
    setLoading(true)
    registerPlayer(data)
    .unwrap()
    .then(res => {
      setLoading(false)
      if (!res.error) {
        console.log(res)
        dispatch(setUser(res.player))
        router.push("/play");
      } else {
        console.log("err", res)
        alert(res.message)
      }
    })
    .catch(err => {
      setLoading(false)
      console.error(err)
      alert("An error occured. Try again")
    })
  }

  const onAdminSubmit = async () => {
    if (!categoryData && !password) {
      alert("Fill all fields");
    } else if(password !== "wwtwmadmin5") {
      alert("Password is incorrect");
    }else {
      dispatch(setRole(role))
      let data: string = categoryData.toUpperCase().trim()
      dispatch(setCategory(data))
      router.push("/play");
    }
  };

  const onHostSubmit = async () => {
    if (!password) {
      alert("Fill all fields");
    } else if(password !== "wwtwmhost3") {
      alert("Password is incorrect");
    }else {
      dispatch(setRole(role));
      router.push("/play");
    }
  };

  const onSubmit = async () => {
    if (!fullname && !email && !phone) {
      alert("Fill all fields");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      alert("Enter a valid email");
    } else if (!/^[+0-9]{3,45}$/.test(phone)) {
      alert("Enter valid phone number");
    } else {
      onRegisterPlayer({ fullname, email, phone })
    }
  };

  return (
    <main className="flex flex-col items-center justify-center px-5 bg-blue-800 min-h-screen">
      {role === "admin" ? (
        <div className="bg-white text-center py-8 px-5 w-full max-w-lg">
          <div className="text-gray-700">
            <h3 className="text-xl md:text-2xl font-semibold">Hi Admin!</h3>
            <p>Enter the password and category to continue</p>
          </div>
          <div className="mt-5">
            <input
              value={categoryData}
              onChange={onCategoryChange}
              type="text"
              placeholder="Category"
              className="w-full h-10 md:h-12 mb-3 border text-gray-700 pl-3"
              required
            />
            <input
              value={password}
              onChange={onPasswordChange}
              type="text"
              placeholder="Password"
              className="w-full h-10 md:h-12 mb-3 border text-gray-700 pl-3"
              required
            />
            <button
              onClick={onAdminSubmit}
              className="h-10 md:h-12 w-full bg-blue-800 text-white uppercase font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      ) : role === "host" ? (
        <div className="bg-white text-center py-8 px-5 w-full max-w-lg">
          <div className="text-gray-700">
            <h3 className="text-xl md:text-2xl font-semibold">Hi Host!</h3>
            <p>Enter the password to continue</p>
          </div>
          <div className="mt-5">
            <input
              value={password}
              onChange={onPasswordChange}
              type="text"
              placeholder="Password"
              className="w-full h-10 md:h-12 mb-3 border text-gray-700 pl-3"
              required
            />
            <button
              onClick={onHostSubmit}
              className="h-10 md:h-12 w-full bg-blue-800 text-white uppercase font-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white text-center py-8 px-5 w-full max-w-lg">
          <div className="text-gray-700">
            <h3 className="text-xl md:text-2xl font-semibold">
              Welcome to the game!
            </h3>
            <p>Fill the following fields to start</p>
          </div>
          <div className="mt-5">
            <input
              value={fullname}
              onChange={onNameChange}
              type="text"
              placeholder="Full Name"
              className="w-full h-10 md:h-12 mb-3 border text-gray-700 pl-3"
              required
            />
            <input
              value={email}
              onChange={onEmailChange}
              type="email"
              placeholder="Email"
              className="w-full h-10 md:h-12 mb-3 border text-gray-700 pl-3"
              required
            />
            <input
              value={phone}
              onChange={onPhoneChange}
              type="tel"
              placeholder="Phone Number"
              className="w-full h-10 md:h-12 mb-3 border text-gray-700 pl-3"
              required
            />
            <button
              onClick={onSubmit}
              className="h-10 md:h-12 w-full bg-blue-800 text-white uppercase font-semibold"
            >
              {loading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
