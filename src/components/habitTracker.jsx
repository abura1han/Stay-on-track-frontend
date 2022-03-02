import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHabit from "../hooks/useHabit";

const HabitTracker = () => {
  const [habit, setHabit] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const { habitList, setAddHabit, setUpdateHabit } = useHabit();

  /**
   * Handle add habit
   */
  useEffect(() => {
    if (isSubmit) {
      setAddHabit(habit);

      // Clear add habit form
      setHabit("");
      setIsSubmit(false);
    }
  }, [isSubmit, setAddHabit, habit]);

  const handleUpdateHabitCheck = (data) => {
    const days = data.days;
    if (days[data.index]) {
      days[data.index] = false;
    } else {
      days[data.index] = true;
    }
    setUpdateHabit({ _id: data._id, days });
  };

  return (
    <div className="bg-white relative rounded p-2 overflow-x-auto z-0 shadow shadow-gray-300 border border-gray-300">
      <h2 className="font-semibold text-black text-base text-left flex items-center justify-between">
        <div>Habit tracker</div>
        <div>
          <Link to={"/stay/habit-tracker"} className="flex">
            <span className="material-icons-outlined">margin</span>
          </Link>
        </div>
      </h2>
      <div>
        <table className="mt-5 text-left">
          <thead className="bg-neutral-200">
            <tr>
              <th className="mr-10 min-w-[120px] font-medium"></th>
              {Array(30)
                .fill(1)
                .map((_, i) => (
                  <th
                    key={i}
                    className="p-2 font-medium border-l border-l-gray-300"
                  >
                    {i}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="font-medium">
            {/* Habit list */}
            {habitList.map(({ _id, name, days }, i) => {
              if (i < !5) {
                return null;
              }

              return (
                <tr className="border-b border-b-gray-300" key={i}>
                  <td className="mr-10 border-l">
                    <input
                      type="text"
                      className="px-1 py-2 font-medium text-base border hover:border-gray-300"
                      defaultValue={name}
                      readOnly
                    />
                  </td>
                  {days?.map((isChecked, i) => (
                    <td key={i} className="p-2 border-l border-l-gray-300">
                      <label>
                        <input
                          type="checkbox"
                          className="p-2"
                          checked={isChecked}
                          onChange={() =>
                            handleUpdateHabitCheck({ _id, index: i, days })
                          }
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          {habitList.length < 1 && (
            <span className="text-gray-500 mt-2">No todos found</span>
          )}
          {habitList.length > 4 && (
            <span className="mt-2">
              {habitList.length - 5} more habits{" "}
              <Link
                to={"/stay/habit-tracker"}
                className="font-medium text-stay-primary hover:underline"
              >
                show all
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;
