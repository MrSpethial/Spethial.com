import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import MottoDisplay from '@/components/MottoDisplay'
import { ArrowRightIcon } from '@/components/Icons'

export default function Home() {
  return (
    <>
      <SEO />
      
      <section className="py-20 sm:py-32">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-spethial-text mb-6">
              Welcome to <span className="text-spethial-accent">Spethial</span>
            </h1>
            
            <div className="mb-8">
              <MottoDisplay />
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-spethial-muted mb-8 leading-relaxed">
              A personal space for thoughts, experiments, and caffeine-fueled coding adventures. 
              Part blog, part playground, entirely powered by curiosity.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/blog" className="btn-primary">
                Read the Blog
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </Link>
              <Link to="/playground" className="btn-secondary">
                Explore Playground
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                sometimes refined, and regularly abandoned.
              </p>
              <p>
                Built by a Product Manager who "codes" (sort of), this site is proof that with enough 
                determination (and caffeine), anything is possible… eventually.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
