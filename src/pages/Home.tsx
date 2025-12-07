import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import MottoDisplay from '@/components/MottoDisplay'

export default function Home() {
  return (
    <>
      <SEO />
      
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-spethial-text mb-6">
              Welcome to{' '}
              <span className="text-spethial-accent">Spethial</span>
            </h1>
            
            <div className="mb-8">
              <MottoDisplay />
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-spethial-muted mb-8 leading-relaxed">
              A personal space for thoughts, experiments, and caffeine-fueled coding adventures. 
              Part blog, part playground, entirely powered by curiosity.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 bg-spethial-accent hover:bg-spethial-accent-hover text-white font-medium rounded-lg transition-colors duration-200"
              >
                Read the Blog
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                to="/playground"
                className="inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-spethial-surface hover:bg-gray-300 dark:hover:bg-spethial-border text-gray-900 dark:text-spethial-text font-medium rounded-lg border border-gray-300 dark:border-spethial-border transition-colors duration-200"
              >
                Explore Playground
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 dark:bg-spethial-surface/50">
        <div className="container-main">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-spethial-text mb-6">
              What's this all about?
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-spethial-muted">
              <p>
                Spethial.com is a personal website that serves as a homepage, blog, and testing 
                ground for various technical experiments. It's where ideas go to be explored, 
                sometimes refined, and occasionally abandoned.
              </p>
              <p>
                Built by a Product Manager who codes, this site is proof that with enough 
                determination (and caffeine), anything is possible… eventually.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

