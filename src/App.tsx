import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import SubjectsDirectory from './pages/SubjectsDirectory';
import SubjectDetail from './pages/SubjectDetail';
import MockTestHub from './pages/MockTestHub';
import LiveMockTest from './pages/LiveMockTest';
import Scorecard from './pages/Scorecard';
import SyllabusMaster from './pages/SyllabusMaster';
import HistoryStoriesHub from './pages/HistoryStoriesHub';
import Bookmarks from './pages/Bookmarks';
import About from './pages/About';

// Scroll to Top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout manager to hide header/footer in live test mode
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLiveTest = location.pathname === '/mock-test/live';

  return (
    <div className="flex flex-col min-h-screen bg-bgLight dark:bg-bgDark transition-colors duration-200">
      {!isLiveTest && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isLiveTest && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<SubjectsDirectory />} />
          <Route path="/subjects/:id" element={<SubjectDetail />} />
          <Route path="/mock-test" element={<MockTestHub />} />
          <Route path="/mock-test/live" element={<LiveMockTest />} />
          <Route path="/mock-test/result/:id" element={<Scorecard />} />
          <Route path="/syllabus" element={<SyllabusMaster />} />
          <Route path="/history-stories" element={<HistoryStoriesHub />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
