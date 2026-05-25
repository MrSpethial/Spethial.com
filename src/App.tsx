import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Lab from '@/pages/Lab'
import Admin from '@/pages/Admin'
import Travels from '@/pages/Travels'
import Music from '@/pages/Music'
import { trackPageView } from '@/lib/analytics'

function TrackPageViews() {
  const location = useLocation()
  useEffect(() => {
    setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title)
    }, 0)
  }, [location])
  return null
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <TrackPageViews />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/playground" element={<Navigate to="/lab" replace />} />
            <Route path="/travels" element={<Travels />} />
            <Route path="/music" element={<Music />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  )
}

export default App
