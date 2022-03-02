import React from "react";
import BtnPrimary from "../components/BtnPrimary";

const NotFoundPage = () => {
  return (
    <div className="max-w-stay-max-width mx-auto">
      <div className="flex justify-center text-center mt-32   flex-col md:flex-row">
        <div>
          <h2 className="sm:text-7xl text-4xl font-extrabold">
            Opps page not found!
          </h2>
          <div className="mt-8">
            <p className="text-2xl font-light text-gray-600">
              Genius people never{" "}
              <span
                className="border border-dashed border-b-gray-400"
                title="Sign up"
              >
                give up
              </span>
            </p>
          </div>
          <div className="mt-4">
            <BtnPrimary>
              <a href="/">Back to home</a>
            </BtnPrimary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
