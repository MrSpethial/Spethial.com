import SEO from '@/components/SEO'
import { ExclamationTriangleIcon, BeakerIcon } from '@/components/Icons'

export default function Playground() {
  return (
    <>
      <SEO
        title="Playground"
        description="An experimental testing ground for technical ideas, half-baked projects, and random experiments."
      />

      <section className="py-16 sm:py-24">
        <div className="container-main">
          {/* Warning Banner */}
          <div className="mb-12 p-6 sm:p-8 rounded-xl bg-amber-500/10 border-2 border-amber-500/30">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-500 mb-4 flex items-center gap-3">
              <ExclamationTriangleIcon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12" />
              Warning: Here be dragons and half-baked ideas
            </h1>
            <p className="text-lg text-amber-600 dark:text-amber-400/80">
              This is an experimental playground. Things may break, disappear, or spontaneously 
              transform. Proceed with curiosity, not expectations.
            </p>
          </div>

          {/* Playground Content Area */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-spethial-text mb-4">
                Experiments
              </h2>
              <p className="text-gray-600 dark:text-spethial-muted mb-6">
                This section will house various experiments, components, charts, shaders, and 
                other technical explorations. Check back for new additions!
              </p>
            </div>

            {/* Empty Experiment Container */}
            <div className="card min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <BeakerIcon className="h-16 w-16 mx-auto mb-4 text-gray-400 dark:text-spethial-muted" />
                <p className="text-gray-500 dark:text-spethial-muted">
                  Experiments coming soon...
                </p>
                <p className="text-sm text-gray-400 dark:text-spethial-muted/60 mt-2">
                  Drop components, charts, shaders, or any random ideas here
                </p>
              </div>
            </div>

            {/* Example placeholder sections for future experiments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-spethial-text mb-2">
                  Component Lab
                </h3>
                <p className="text-sm text-gray-600 dark:text-spethial-muted">
                  Testing ground for UI components before they graduate to production.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-spethial-text mb-2">
                  Data Viz
                </h3>
                <p className="text-sm text-gray-600 dark:text-spethial-muted">
                  Charts, graphs, and visual experiments with data.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-spethial-text mb-2">
                  Shader Sandbox
                </h3>
                <p className="text-sm text-gray-600 dark:text-spethial-muted">
                  WebGL and shader experiments for the visually curious.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-spethial-text mb-2">
                  API Playground
                </h3>
                <p className="text-sm text-gray-600 dark:text-spethial-muted">
                  Testing integrations and playing with external APIs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

