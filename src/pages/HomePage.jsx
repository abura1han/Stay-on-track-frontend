import React from "react";
import BtnPrimary from "../components/BtnPrimary";
import HomeHeader from "../components/HomeHeader";
import StudentsWriting from "../assets/images/Students-writing.png";
import StayontrackImage from "../assets/images/stay-on-track.png";
import GoogleLoginBtn from "../components/GoogleLoginBtn";

const HomePage = () => {
  return (
    <div className="max-w-stay-max-width mx-auto mt-5 px-5" id="home">
      <HomeHeader />
      <div className="flex mt-32 flex-col md:flex-row">
        <div>
          <h2 className="sm:text-7xl text-4xl font-extrabold">
            Stay<br></br>Motivated
          </h2>
          <div className="mt-4 text-xl text-gray-500">
            <p className="">
              We help student to be motivated and stay on track
            </p>
            <p className="text-xl">
              Are you studing? Let's
              <span
                className="border-b ml-2 border-dashed border-b-gray-400"
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
      <div
        className="flex mt-32 items-center flex-col md:flex-row"
        id="features"
      >
        <div>
          <h2 className="sm:text-7xl text-4xl font-extrabold  ">Features</h2>
          <div className="mt-4">
            <ul className="list-[circle] list-inside text-gray-500 text-xl font-normal">
              <li className="mb-2">
                Pomodoro {"&"} reminder to work actively without feeling boring
              </li>
              <li className="mb-2">
                Quick note to stay focuse on study/work without westing time
              </li>
              <li className="mb-2">
                Important url saver to store all important urls that you will
                need later
              </li>
              <li className="mb-2">Todo to schedule your work</li>
              <li className="mb-2">
                Habit tracker to increase your creativity
              </li>
              <li className="mb-2">
                Concentration music to remove all sounds/noise and focus on your
                study/work
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5">
          <img
            src={StayontrackImage}
            alt="Stay on track"
            className="max-w-[700px] w-full shadow shadow-lg-gray-500"
          />
        </div>
      </div>

      {/* Guides section */}
      <div className="flex mt-32 mb-5 flex-col md:flex-row" id="why-we-r">
        <div>
          <h2 className="sm:text-7xl text-4xl font-extrabold  ">Why we are</h2>
          <div className="mt-4">
            <p className="text-xl text-gray-500">
              A lot of people become demotivated during their work. Stay on
              track provides people to avoid deportation and stay motivated to
              their vision by providing a work environment and letting people
              schedule their work.
            </p>
          </div>
          <div className="mt-4">
            <a href={"#home"}>
              <BtnPrimary>Get started</BtnPrimary>
            </a>
          </div>
        </div>
        <div className="sm:ml-2">
          <img src={StayontrackImage} alt="Stay on track" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
