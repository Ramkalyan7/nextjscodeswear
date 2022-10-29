import mongoose from "mongoose";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Order from "../models/Order";

const Orders = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return (
    <div>
      <div className="container ">
        <div className="overflow-x-auto relative w-4/5 mx-auto ">
          <h1 className="font-semibold text-2xl text-center p-8">My Orders</h1>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Product name
                </th>
                <th scope="col" className="py-3 px-6">
                  Color
                </th>
                <th scope="col" className="py-3 px-6">
                  Category
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Apple MacBook Pro
                </th>
                <td className="py-4 px-6">Sliver</td>
                <td className="py-4 px-6">Laptop</td>
                <td className="py-4 px-6">$2999</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">White</td>
                <td className="py-4 px-6">Laptop PC</td>
                <td className="py-4 px-6">$1999</td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="py-4 px-6">Black</td>
                <td className="py-4 px-6">Accessories</td>
                <td className="py-4 px-6">$99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find();

  return {
    props: {
      orders: orders,
    },
  };
}

export default Orders;
