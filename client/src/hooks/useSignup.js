import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useSignup = () => {
  const [loading, setLoading] =
    useState(false);
  const { setUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = checkInputs({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const data = await axios.post(
        "/api/auth/signup",
        {
          fullName,
          password,
          username,
          confirmPassword,
          gender,
        }
      );
      console.log(data.data);
      localStorage.setItem(
        "chat-user",
        JSON.stringify(data.data)
      );
      setUser(data.data);
      toast.success(
        "Account Created Successfuly"
      );
    } catch (e) {
      toast.error(e.message);
      console.log(
        "error in usesignup: ",
        e.message
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    signup,
  };
};

function checkInputs({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (
    !fullName ||
    !username ||
    !password ||
    !confirmPassword ||
    !gender
  ) {
    toast.error(
      "Please fill in all fields"
    );
    return false;
  }
  if (password !== confirmPassword) {
    toast.error(
      "passwords does not match"
    );
    return false;
  }
  if (password.length < 6) {
    toast.error(
      "password must larger than 6 character"
    );
    return false;
  }

  return true;
}

export default useSignup;
