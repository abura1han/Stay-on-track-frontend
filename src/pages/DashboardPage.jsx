import React from "react";
import HabitTracker from "../components/habitTracker";
import Pomodoro from "../components/Pomodoro";
import Reminder from "../components/Reminder";
import QuickNote from "../components/QuickNote";
import ImportantUrl from "../components/ImportantUrl";
import Todo from "../components/Todo";

const DashboardPage = () => {
  return (
    <div className="w-full max-w-stay-max-width mx-auto px-3">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="min-w-[200px]">
          <Pomodoro />
        </div>
        <div className="min-w-[200px]">
          <Reminder />
        </div>
        <div className="min-w-[200px]">
          <QuickNote />
        </div>
        <div className="min-w-[200px]">
          <ImportantUrl />
        </div>
      </div>
      <div className="my-3 w-full mx-auto max-w-stay-max-width h-1 bg-stay-border"></div>
      <div className="grid grid-cols-1 gap-2 items-start">
        <div className="max-w-full">
          <Todo />
        </div>
        <div className="max-w-full">
          <HabitTracker />
        </div>
        <div className="">
          {/* <Calendar
            onChange={setCalendar}
            value={[calendar, new Date(2022, 1, 4)]}
          /> */}
        </div>
        {/* <div>
          <MusicPlayer />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
