import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Playground from '@/pages/Playground'
import Admin from '@/pages/Admin'
import { trackPageView } from '@/lib/analytics'

function TrackPageViews() {
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname + location.search)
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
            <Route path="/playground" element={<Playground />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  )
}

export default App
