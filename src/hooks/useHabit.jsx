import { useEffect, useState } from "react";
import configs from "../configs";
import useLocalStorage from "./useLocalStorage";
const useHabit = () => {
  const { stayToken } = useLocalStorage();
  const [habitList, setHabitList] = useState([]);
  const [addHabit, setAddHabit] = useState("");
  const [updateHabit, setUpdateHabit] = useState("");
  const [deleteHabit, setDeleteHabit] = useState("");

  /**
   * Get all habits
   */ useEffect(() => {
    fetch(`${configs.serverUrl}/api/habits`, {
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (!success) {
          return;
        }

        if (data) {
          setHabitList((habitList) => [...habitList, ...data]);
        }
      });
  }, [stayToken]);

  /**
   * Handle add habit
   */
  useEffect(() => {
    if (!addHabit) {
      return;
    }

    fetch(`${configs.serverUrl}/api/add-habit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
      body: JSON.stringify({
        name: addHabit.trim(),
      }),
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (!success) {
          return;
        }

        if (data) {
          setHabitList((habitList) => [...habitList, { ...data }]);
        }
      });

    setAddHabit("");
  }, [addHabit, stayToken]);

  /**
   * Handle update habit
   */
  useEffect(() => {
    if (!updateHabit) {
      return;
    }

    fetch(`${configs.serverUrl}/api/update-habit?habitId=${updateHabit._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
      body: JSON.stringify({
        name: updateHabit.name,
        days: updateHabit.days,
      }),
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (!success) {
          return;
        }

        if (data) {
          console.log(data);
        }
      });

    setUpdateHabit("");
  }, [stayToken, updateHabit]);

  /**
   * Handle delete habit
   */
  useEffect(() => {
    if (!deleteHabit) {
      return;
    }

    fetch(`${configs.serverUrl}/api/delete-habit?habitId=${deleteHabit}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: stayToken,
      },
    })
      .then((res) => res.json())
      .then(({ success, data }) => {
        if (!success) {
          return;
        }

        if (data) {
          //   const newHabitList = habitList.filter(({ _id }) => _id !== data._id);
          const index = habitList.findIndex(({ _id }) => _id === data._id);
          const newHabitList = [...habitList];
          newHabitList.splice(index, 1);
          setHabitList(newHabitList);
        }
      });

    setDeleteHabit("");
  }, [stayToken, deleteHabit, habitList]);

  return { habitList, setAddHabit, setUpdateHabit, setDeleteHabit };
};

export default useHabit;
