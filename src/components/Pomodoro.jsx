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

const Pomodoro = () => {
  const [workSeconds] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const [pomodoroSeconds, setPomodoroSeconds] = useState(workSeconds);
  const [pomodoroMinutes, setPomodoroMinutes] = useState(workMinutes);

  const [isPause, setIsPause] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  const pomodoroAudio = useRef();
  const pomodoroTimeline = useRef();

  const { setPopup } = useContext(PopupContext);

  /**
   * Update pomodoro work time and break time
   */
  useEffect(() => {
    setPomodoroMinutes(workMinutes);
  }, [workMinutes]);

  /**
   * Handle pomodoro
   */
  useEffect(() => {
    // Is pomodoro is paused default is paused
    if (isPause) {
      return;
    }

    // Pomodoro interval
    const pomodoroInterval = setInterval(() => {
      // Promodo
      if (pomodoroSeconds <= 0) {
        if (pomodoroMinutes <= 0) {
          setPomodoroSeconds(breakSeconds);
          setPomodoroMinutes(breakMinutes);
          setIsBreak(true);
        } else {
          setPomodoroSeconds(59);
          setPomodoroMinutes(pomodoroMinutes - 1);
        }
      } else {
        setPomodoroSeconds(pomodoroSeconds - 1);
      }

      // Break
      if (isBreak) {
        if (pomodoroSeconds <= 0) {
          if (pomodoroMinutes <= 0) {
            setPomodoroSeconds(workSeconds);
            setPomodoroMinutes(workMinutes);
            setIsBreak(false);
          } else {
            setPomodoroSeconds(59);
            setPomodoroMinutes(pomodoroMinutes - 1);
          }
        } else {
          setPomodoroSeconds(pomodoroSeconds - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(pomodoroInterval);
    };
  }, [
    workMinutes,
    workSeconds,
    breakMinutes,
    breakSeconds,
    pomodoroMinutes,
    pomodoroSeconds,
    isPause,
    isBreak,
  ]);

  /**
   * Handle pomodoro sound
   */
  useEffect(() => {
    if (isBreak) {
      pomodoroAudio.current.play();
    } else {
      !isPause && pomodoroAudio.current.play();
    }
  }, [isBreak, isPause]);

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
    setIsBreak(false);
    setPomodoroSeconds(workSeconds);
    setPomodoroMinutes(workMinutes);
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
          Pomodoro
        </h2>
        <form>
          <h2 className="font-medium text-black">WORK</h2>
          <div className="mt-2">
            <label htmlFor="work-minutes" className="block text-sm font-medium">
              Minutes
            </label>
            <input
              type="number"
              id="work-minutes"
              className="w-full px-1 py-2 border-2 border-gray-400 text-black rounded outline-none"
              onChange={(e) => setWorkMinutes(e.target.value)}
              defaultValue={workMinutes}
            />
          </div>

          <h2 className="font-medium text-black mt-4">BREAK</h2>
          <div className="mt-2">
            <label
              htmlFor="break-minutes"
              className="block text-sm font-medium"
            >
              Minutes
            </label>
            <input
              type="number"
              id="break-minutes"
              className="w-full px-1 py-2 border-2 border-gray-400 text-black rounded outline-none"
              onChange={(e) => setBreakMinutes(e.target.value)}
              defaultValue={breakMinutes}
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
  }, [breakMinutes, setPopup, workMinutes]);

  /**
   * Handle pomodoro timeline
   */
  useEffect(() => {
    let timeLineWidth;
    if (!isBreak) {
      timeLineWidth = (pomodoroMinutes / workMinutes) * 100;
    } else {
      timeLineWidth = (pomodoroMinutes / breakMinutes) * 100;
    }
    pomodoroTimeline.current.style.width = `${timeLineWidth}%`;
  }, [pomodoroMinutes, workMinutes, breakMinutes, isBreak]);

  return (
    <div className="bg-white  border border-gray-300 relative rounded p-2 overflow-hidden min-h-[190px] z-0 shadow shadow-gray-300">
      {/* Timer sound */}
      <audio src={ReminderSound} ref={pomodoroAudio}></audio>
      <h2 className="font-semibold text-black text-base flex items-center justify-between">
        <div>Pomodoro</div>
        <button onClick={openPomodoroPopup} className="flex items-center">
          <span className="material-icons-outlined">settings</span>
        </button>
      </h2>
      <div className="w-full h-full rounded">
        <div className="text-stay-primary text-center font-semibold mt-4">
          {isBreak ? "BREAK" : "WORK"}
        </div>
        <div
          className={`text-4xl font-semibold z-10 text-gray-700 mt-1 text-center`}
        >
          {pomodoroMinutes < 10 ? `0${pomodoroMinutes}` : pomodoroMinutes}:
          {pomodoroSeconds < 10 ? `0${pomodoroSeconds}` : pomodoroSeconds}
        </div>
        <div className="w-full h-1 bg-gray-500 mt-3 rounded relative">
          <div
            className="absolute top-0 left-0 h-full bg-stay-primary rounded"
            ref={pomodoroTimeline}
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

export default Pomodoro;
