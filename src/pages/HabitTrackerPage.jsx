import React, { useEffect, useState } from "react";
import useHabit from "../hooks/useHabit";

const HabitTrackerPage = () => {
  const [habit, setHabit] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [modifyHabitId, setModifyHabitId] = useState("");
  const [modifyHabit, setModifyHabit] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);
  const { habitList, setAddHabit, setUpdateHabit, setDeleteHabit } = useHabit();

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

  /**
   * Handle update habit
   */
  const handleUpdateHabitName = () => {
    setUpdateHabit({ _id: modifyHabitId, name: modifyHabit });

    // Reset modify habit data
    setModifyHabit("");
    setModifyHabitId("");
    setIsEdit(false);
  };

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
    <div className="w-full max-w-[1000px] mx-auto px-3 mb-10 shadow shadow-gray-300 border border-gray-200">
      <h2 className="text-xl font-medium my-2">Habit tracker</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (habit) {
              setIsSubmit(true);
            }
          }}
          className="flex"
        >
          <input
            type="text"
            placeholder="Add Habit..."
            className="border border-gray-200 px-2 py-2 text-base rounded-l outline-none focus:border-stay-primary hover:border-stay-primary w-full"
            onChange={(e) => setHabit(e.target.value)}
            value={habit}
          />
          <button
            className="flex items-center px-2 py-2 bg-gray-300 rounded-r text-gray-600"
            type="submit"
          >
            <span className="material-icons-outlined">add</span>
          </button>
        </form>
      </div>
      <div>
        <div className=" overflow-x-auto">
          {/* Habit edit form */}
          {isEdit && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (modifyHabit) {
                  setIsSubmit(true);
                  handleUpdateHabitName();
                }
              }}
              className="flex absolute z-10"
            >
              <input
                type="text"
                placeholder="Update Habit..."
                className="border border-gray-200 px-2 py-2 text-base rounded-l outline-none focus:border-stay-primary hover:border-stay-primary w-full"
                onChange={(e) => setModifyHabit(e.target.value)}
                value={modifyHabit}
              />
              <button
                className="flex items-center px-2 py-2 bg-green-500 rounded-r text-white"
                type="submit"
              >
                <span className="material-icons-outlined">check</span>
              </button>
            </form>
          )}
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
                {habitList &&
                  habitList.map(({ _id, name, days }, i) => (
                    <tr className="border-b border-b-gray-300" key={i}>
                      <td className="mr-10 border-l flex items-center">
                        <button
                          className="flex hover:border-gray-300 border"
                          onClick={() => {
                            setIsEdit(!isEdit);
                            setModifyHabitId(_id);
                          }}
                        >
                          <span className="material-icons-outlined text-gray-600">
                            edit
                          </span>
                        </button>
                        <button
                          className="flex hover:border-gray-300 border mr-1"
                          onClick={() => setDeleteHabit(_id)}
                        >
                          <span className="material-icons-outlined text-gray-600">
                            close
                          </span>
                        </button>
                        <div className="ml-2 py-2">{name}</div>
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
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTrackerPage;
