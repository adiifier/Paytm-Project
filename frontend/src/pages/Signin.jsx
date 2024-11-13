import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Inputbox } from "../components/InputBox";

export function Signin() {
  return (
    // <div className="flex justify-center  min-h-screen  items-center ">
    //   <div className="flex items-center justify-center bg-blue5  w-1/3 min-h-128">
    //     <div className="flex flex-col justify-center bg-white w-64 rounded-lg  p-15 m-10 ">
    //       <Heading label={"Sign in"}></Heading>

    //       <Inputbox label={"Email"}></Inputbox>
    //       <Inputbox label={"Password"}></Inputbox>

    //       <div>
    //         <Button label={"Sign in"}></Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="flex justify-center min-h-screen items-center">
      <div className="flex items-center justify-center bg-blue5 w-1/3 min-h-[500px] ">
        {" "}
        {/* min-h and padding */}
        <div className="flex flex-col justify-center bg-white w-64 rounded-lg p-8 m-4">
          <Heading label={"Sign in"}></Heading>
          <Inputbox label={"Email"}></Inputbox>
          <Inputbox label={"Password"}></Inputbox>
          <div>
            <Button label={"Sign in"}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
