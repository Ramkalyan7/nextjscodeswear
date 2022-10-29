import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import React from "react";
import {
  AiFillCloseCircle,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import { BsFillBagCheckFill } from "react-icons/bs";

const Navbar = ({
  logOut,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  user,
}) => {
  const [dropdown, setDropdown] = useState(false);

  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.add("translate-x-0");

      ref.current.classList.remove("translate-x-full");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.add("translate-x-full");
      ref.current.classList.remove("translate-x-0");
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-start justify-center  py-2 items-center shadow-md sticky top-0 bg-white z-10 ">
        <div className="logo mr-auto md:mx-5">
          <Image width={200} height={40} src="/logo.webp" alt="" />
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href={"/tshirts"}>
              <a>
                <li>Tshirts</li>
              </a>
            </Link>
            <Link href={"/hoodies"}>
              <a>
                <li>Hoodies</li>
              </a>
            </Link>
            <Link href={"/stickers"}>
              <a>
                <li>Stickers</li>
              </a>
            </Link>
            <Link href={"/mugs"}>
              <a>
                <li>Mugs</li>
              </a>
            </Link>
          </ul>
        </div>

        <div className="cart h-full items-center  absolute right-0 md:top-0 top-[-0.7rem] mx-5 cursor-pointer flex">
          {user.value ? (
            <a
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
            >
              {dropdown && (
                <div className="absolute rounded-md px-5 w-32 py-5  bg-white shadow-lg border top-10 right-10">
                  <ul>
                    <Link href={"/myaccount"}>
                      <a>
                        <li className="py-1 hover:text-pink-700 text-sm font-semibold">
                          My Account
                        </li>
                      </a>
                    </Link>
                    <Link href={"/orders"}>
                      <a>
                        <li className="py-1 hover:text-pink-700 text-sm font-semibold">
                          orders
                        </li>
                      </a>
                    </Link>

                    <li
                      onClick={logOut}
                      className="py-1 hover:text-pink-700 text-sm font-semibold"
                    >
                      logout
                    </li>
                  </ul>
                </div>
              )}
              <MdAccountCircle
                onMouseOver={() => {
                  setDropdown(true);
                }}
                onMouseLeave={() => {
                  setDropdown(false);
                }}
                className="text-xl md:text-3xl mx-2"
              />
            </a>
          ) : (
            <Link href={"/login"}>
              <a>
                <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">
                  Login
                </button>
              </a>
            </Link>
          )}

          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-3xl"
          />
        </div>
      </div>
      <div
        ref={ref}
        className={`w-72 h-[100vh] sidecart overflow-y-scroll z-10 absolute top-0 right-0 bg-pink-100 px-8 py-10 transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="font-bold text-xl text-center ">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold">Your Cart is Empty !</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex font-semibold items-center justify-center w-1/3 text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                    <span className="mx-2 text-sm ">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="total font-bold my-2 ">Subtotal : ₹{subTotal}</div>
        <div className="flex">
          <Link href={"/checkout"}>
            <a>
              <button className="flex mr-2 text-white bg-pink-500 border-0 px-2  py-2 focus:outline-none hover:bg-pink-600 rounded text-sm">
                <BsFillBagCheckFill className="m-1" />
                Chekckout
              </button>
            </a>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-pink-500 border-0 px-2  py-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
