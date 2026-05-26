import { useEffect, useRef } from 'react'
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
import { trackPageViewAfterTitle } from '@/lib/analytics'

function TrackPageViews() {
  const location = useLocation()
  const isFirstNavigation = useRef(true)

  useEffect(() => {
    const path = location.pathname + location.search

    // Initial page_view is sent by the HTML gtag snippet in index.html
    if (isFirstNavigation.current) {
      isFirstNavigation.current = false
      return
    }

    return trackPageViewAfterTitle(path)
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
