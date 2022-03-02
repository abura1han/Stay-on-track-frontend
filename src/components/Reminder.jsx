import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "./Button";
import ReminderSound from "../assets/soundes/reminder.mp3";
import PopupContext from "../contexts/Popup";

const Reminder = () => {
  const [seconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [hours, setHours] = useState(1);
  const [breakSeconds] = useState(0);

  const [reminderSeconds, setReminderSeconds] = useState(seconds);
  const [reminderMinutes, setReminderMinutes] = useState(minutes);
  const [reminderHours, setReminderHours] = useState(hours);

  const [isPause, setIsPause] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  const reminderAudio = useRef();
  const reminderTimeline = useRef();

  const { setPopup } = useContext(PopupContext);

  /**
   * Update pomodoro work time and break time
   */
  useEffect(() => {
    setReminderMinutes(minutes);
    setReminderHours(hours);
  }, [minutes, hours]);

  /**
   * Handle pomodoro
   */
  useEffect(() => {
    // Is pomodoro is paused default is paused
    if (isPause) {
      return;
    }

    // Reminder interval
    const reminderInterval = setInterval(() => {
      // Promodo
      if (reminderSeconds <= 0) {
        if (reminderMinutes <= 0) {
          if (reminderHours <= 0) {
            setIsFinished(true);
            setIsPause(true);
          } else {
            setReminderHours(reminderHours - 1);
            setReminderMinutes(59);
          }
        } else {
          setReminderSeconds(59);
          setReminderMinutes(reminderMinutes - 1);
        }
      } else {
        setReminderSeconds(reminderSeconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(reminderInterval);
    };
  }, [
    minutes,
    seconds,
    reminderHours,
    breakSeconds,
    reminderMinutes,
    reminderSeconds,
    isPause,
    isFinished,
  ]);

  /**
   * Handle pomodoro sound
   */
  useEffect(() => {
    if (isFinished) {
      reminderAudio.current.play();
    } else {
      !isPause && reminderAudio.current.play();
    }
  }, [isFinished, isPause]);

  /**
   * Handle play pause pomodoro
   */
  const handlePlayPausePomodoro = () => {
    setIsPause(!isPause);
  };

  /**
   * Handle reset pomodoro
   */
  const handleResetPomodoro = () => {
    setIsPause(true);
    setIsFinished(false);
    setReminderSeconds(seconds);
    setReminderMinutes(minutes);
    setReminderHours(hours);
  };

  /**
   *  Handle toggle popup
   */
  const openPomodoroPopup = useCallback(() => {
    /**
     * Close pomodoro popup
     */
    const closePomodoroPopup = () => {
      setPopup(null);
    };

    const popupForm = (
      <div className="max-w-[450px] mx-auto mt-5 bg-white px-2 py-3 rounded">
        <h2 className="font-semibold text-black text-center text-lg mb-3">
          Reminder
        </h2>
        <form>
          <div className="mt-2">
            <label htmlFor="hours" className="block text-sm font-medium">
              Hours
            </label>
            <input
              type="number"
              id="hours"
              className="w-full px-1 py-2 border-2 border-gray-400 text-black rounded outline-none"
              onChange={(e) => setHours(e.target.value)}
              defaultValue={hours}
            />
          </div>
          <div className="mt-2">
            <label htmlFor="work-minutes" className="block text-sm font-medium">
              Minutes
            </label>
            <input
              type="number"
              id="work-minutes"
              className="w-full px-1 py-2 border-2 border-gray-400 text-black rounded outline-none"
              onChange={(e) => setMinutes(e.target.value)}
              defaultValue={minutes}
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-stay-primary text-white mt-4 outline-none"
              onClick={closePomodoroPopup}
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    );

    setPopup(popupForm);
  }, [setPopup, minutes, hours]);

  /**
   * Handle reminder timeline
   */
  useEffect(() => {
    const timeLineWidth =
      ((reminderHours + reminderMinutes) / (hours + minutes)) * 100;
    reminderTimeline.current.style.width = `${timeLineWidth}%`;
  }, [reminderMinutes, reminderHours, minutes, hours]);

  return (
    <div className="bg-white  border border-gray-300 relative rounded p-2 overflow-hidden min-h-[190px] z-0 shadow shadow-gray-300">
      {/* Timer sound */}
      <audio src={ReminderSound} ref={reminderAudio}></audio>
      <h2 className="font-semibold text-black text-base flex items-center justify-between">
        <div>Reminder</div>
        <button onClick={openPomodoroPopup} className="flex items-center">
          <span className="material-icons-outlined">settings</span>
        </button>
      </h2>
      <div className="w-full h-full rounded">
        <div className="text-stay-primary text-center font-semibold mt-4">
          {isPause ? "PAUSED" : "RUNNING"}
        </div>
        <div
          className={`text-4xl font-semibold z-10 text-gray-700 mt-1 text-center`}
        >
          {reminderHours < 10 ? `0${reminderHours}` : reminderHours}:
          {reminderMinutes < 10 ? `0${reminderMinutes}` : reminderMinutes}:
          {reminderSeconds < 10 ? `0${reminderSeconds}` : reminderSeconds}
        </div>
        <div className="w-full h-1 bg-gray-500 mt-3 rounded relative">
          <div
            className="absolute top-0 left-0 h-full bg-stay-primary rounded"
            ref={reminderTimeline}
          ></div>
        </div>
      </div>

      {/* Timer controls */}
      <div className="flex items-center justify-center absolute right-2/4 bottom-2 translate-x-2/4">
        <button onClick={handleResetPomodoro}>
          <span className="material-icons-outlined text-3xl">replay</span>
        </button>
        {!isPause ? (
          <button onClick={handlePlayPausePomodoro}>
            <span className="material-icons-outlined text-3xl">
              pause_circle
            </span>
          </button>
        ) : (
          <button onClick={handlePlayPausePomodoro}>
            <span className="material-icons-outlined text-3xl">
              play_circle
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Reminder;
