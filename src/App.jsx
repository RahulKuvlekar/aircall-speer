import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LayoutLoader from './Components/Layout/LayoutLoader';
const Layout = lazy(() => import('./Components/Layout'));
const FeedPage = lazy(() => import('./Components/Feed/FeedPage'));
const ArchivePage = lazy(() => import('./Components/Archive/ArchivePage'));
const FeedDetailPage = lazy(() => import('./Components/Feed/FeedDetailPage'));

function App() {
    return (
        <Router>
            <Suspense fallback={<LayoutLoader />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<FeedPage />} />
                        <Route path="archives" element={<ArchivePage />} />
                        <Route
                            path="details/:feedId"
                            element={<FeedDetailPage />}
                        />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
