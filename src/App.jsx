import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import StayWrapper from "./components/StayWrapper";
import StayPopup from "./components/StayPopup";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/404Page";
import HomePage from "./pages/HomePage";
import PopupContext from "./contexts/Popup";
import ProtectedRoute from "./components/ProtectedRoute";
import TodoPage from "./pages/TodoPage";
import NotePage from "./pages/NotePage";
import MenuContext from "./contexts/MenuContext";
import NotificationContext from "./contexts/NotificationContext";
import StayNotification from "./components/StayNotification";
import HabitTrackerPage from "./pages/HabitTrackerPage";
import ProfilePage from "./pages/ProfilePage";

/**
 * Serve all routes
 */
function App() {
  const [popup, setPopup] = useState(null);
  const [notification, setNotification] = useState(null);
  const [menuList, setMenuList] = useState([]);

  // Site menu list
  useEffect(() => {
    setMenuList([
      {
        label: "Dashboard",
        icon: <span className="material-icons-outlined">dashboard</span>,
        url: "/stay/dashboard",
      },
      {
        label: "Todo",
        icon: <span className="material-icons-outlined">task_alt</span>,
        url: "/stay/todo",
      },
      {
        label: "Note",
        icon: <span className="material-icons-outlined">note</span>,
        url: "/stay/note",
      },
      {
        label: "Habit tracker",
        icon: <span className="material-icons-outlined">fact_check</span>,
        url: "/stay/habit-tracker",
      },
      {
        label: "Concentration",
        icon: <span className="material-icons-outlined">graphic_eq</span>,
        url: "/stay/concentration",
      },
    ]);
  }, []);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      {/* Site popup */}
      {popup && <StayPopup>{popup}</StayPopup>}

      {/* Notificaton */}
      {notification && <StayNotification>{notification}</StayNotification>}

      <PopupContext.Provider value={{ popup, setPopup }}>
        <NotificationContext.Provider value={{ notification, setNotification }}>
          <MenuContext.Provider value={{ menuList, setMenuList }}>
            <BrowserRouter>
              <Routes>
                {/* Dashboard route */}
                <Route
                  path="/stay/dashboard"
                  element={
                    <ProtectedRoute>
                      <StayWrapper>
                        <DashboardPage />
                      </StayWrapper>
                    </ProtectedRoute>
                  }
                />

                {/* Todo route */}
                <Route
                  path="/stay/todo"
                  element={
                    <ProtectedRoute>
                      <StayWrapper>
                        <TodoPage />
                      </StayWrapper>
                    </ProtectedRoute>
                  }
                />

                {/* Note route */}
                <Route
                  path="/stay/note"
                  element={
                    <ProtectedRoute>
                      <StayWrapper>
                        <NotePage />
                      </StayWrapper>
                    </ProtectedRoute>
                  }
                />

                {/* Note route */}
                <Route
                  path="/stay/habit-tracker"
                  element={
                    <ProtectedRoute>
                      <StayWrapper>
                        <HabitTrackerPage />
                      </StayWrapper>
                    </ProtectedRoute>
                  }
                />

                {/* Profile route */}
                <Route
                  path="/stay/profile"
                  element={
                    <ProtectedRoute>
                      <StayWrapper>
                        <ProfilePage />
                      </StayWrapper>
                    </ProtectedRoute>
                  }
                />

                {/* Main/home route */}
                <Route path="/" element={<HomePage />} />

                {/* 404 page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </MenuContext.Provider>
        </NotificationContext.Provider>
      </PopupContext.Provider>
    </Suspense>
  );
}

export default App;
