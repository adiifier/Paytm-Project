import { useState } from "react";
import { Bottomwarning } from "../components/Bottomwarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import axios from "axios";

export const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className="flex justify-center  min-h-screen  items-center ">
      <div className="flex items-center justify-center bg-blue5  w-1/3 h-3/4">
        <div className="flex flex-col justify-center bg-white w-64 rounded-lg p-15 m-10 ">
          <Heading label={"Sign Up"}></Heading>
          <Subheading
            label={"Enter your Information to create an account"}
          ></Subheading>
          <Inputbox
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            label={"First Name"}
          ></Inputbox>
          <Inputbox
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            label={"Last Name"}
          ></Inputbox>
          <Inputbox
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            label={"Email"}
          ></Inputbox>
          <Inputbox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
          ></Inputbox>

          <div>
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/sign-up",
                  {
                    firstName,
                    lastName,
                    username,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
              }}
              label={"Sign up"}
            ></Button>
          </div>
          <div>
            <Bottomwarning
              info={"Already have an account ?"}
              label={"Sign in"}
              to={"/signin"}
            ></Bottomwarning>
          </div>
        </div>
      </div>
    </div>
  );
};
