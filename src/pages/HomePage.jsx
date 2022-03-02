import React from "react";
import BtnPrimary from "../components/BtnPrimary";
import HomeHeader from "../components/HomeHeader";
import StudentsWriting from "../assets/images/Students-writing.png";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

const HomePage = () => {
  return (
    <div className="max-w-stay-max-width mx-auto mt-5 px-5">
      <HomeHeader />
      <div className="flex mt-32   flex-col md:flex-row">
        <div>
          <h2 className="sm:text-7xl text-4xl font-extrabold">
            Stay<br></br>Motivated
          </h2>
          <div className="mt-4">
            <p className="sm:text-2xl text-xl font-light text-gray-600">
              We help student to be motivated and stay on track
            </p>
            <p className="text-2xl font-light text-gray-600">
              Are you studing? Let's{" "}
              <span
                className="border border-dashed border-b-gray-400"
                title="Sign up"
              >
                sign up!
              </span>
            </p>
          </div>
          <div className="mt-4">
            <GoogleLoginBtn label={"Get started"} />
          </div>
        </div>
        <div>
          <img src={StudentsWriting} alt="Stay on track" />
        </div>
      </div>

      {/* Features section */}
      <div className="flex mt-32   flex-col md:flex-row" id="features">
        <div>
          <h2 className="sm:text-7xl text-4xl font-extrabold  ">Features</h2>
          <div className="mt-4">
            <p className="sm:text-2xl text-xl font-light text-gray-600">
              We help student to be motivated and stay on track
            </p>
            <p className="text-2xl font-light text-gray-600">
              Are you studing? Let's sign up!
            </p>
          </div>
          <div className="mt-4">
            <BtnPrimary>Get started</BtnPrimary>
          </div>
        </div>
        <div>
          <img src={StudentsWriting} alt="Stay on track" />
        </div>
      </div>

      {/* Guides section */}
      <div
        className="flex mt-32   flex-col md:flex-row"
        id="guides-nd-tutorials"
      >
        <div>
          <h2 className="sm:text-7xl text-4xl font-extrabold  ">
            Guides and tutorials
          </h2>
          <div className="mt-4">
            <p className="sm:text-2xl text-xl font-light text-gray-600">
              We help student to be motivated and stay on track
            </p>
            <p className="text-2xl font-light text-gray-600">
              Are you studing? Let's sign up!
            </p>
          </div>
          <div className="mt-4">
            <BtnPrimary>Get started</BtnPrimary>
          </div>
        </div>
        <div>
          <img src={StudentsWriting} alt="Stay on track" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
