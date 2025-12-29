import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Playground from '@/pages/Playground'
import Admin from '@/pages/Admin'
import { useAnalytics } from '@/hooks/useAnalytics'

// Component to track page views on route changes
function PageViewTracker() {
  const location = useLocation()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    // Track page view on initial load and route changes
    trackPageView(location.pathname + location.search)
  }, [location, trackPageView])

  return null
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <PageViewTracker />
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
