import { useRouter } from "next/router";
import { useEffect } from "react";

const MyAccount = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  return <div>Account</div>;
};

export default MyAccount;
