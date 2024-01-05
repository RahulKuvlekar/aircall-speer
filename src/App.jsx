import './App.css'

import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import FeedPage from './Components/Feed/FeedPage';
import ArchivePage from './Components/Archive/ArchivePage';
import FeedDetailPage from './Components/Feed/FeedDetailPage';
function App() {

  return (
    <Router >
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FeedPage />} />
        <Route path="archives" element={<ArchivePage />} />
        <Route path="details/:feedId" element={<FeedDetailPage />} />
      </Route>
    </Routes>
    </Router>
  )
}

export default App
