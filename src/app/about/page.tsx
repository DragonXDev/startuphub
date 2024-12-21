export default function About() {
  return (
    <main className="min-h-screen pt-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4">
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">About StartupHub</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            StartupHub is a platform that connects innovative minds with ambitious projects. 
            We believe great ideas deserve the right team to bring them to life.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">For Innovators</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Have a groundbreaking idea but need help bringing it to life? Post your startup idea 
                and connect with talented individuals who share your vision.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">For Talent</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Looking to join the next big thing? Browse through exciting startup opportunities 
                and find projects that match your skills and interests.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center font-semibold">1</div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Post Your Project</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Share your startup idea with our community. Describe your vision, what you're 
                  building, and the kind of talent you're looking for.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Connect with Talent</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Review applications from interested individuals, chat with potential team members, 
                  and find the perfect match for your project.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Build Together</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Once you've found your team, use our platform to collaborate, track progress, 
                  and turn your idea into reality.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Community</h2>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">500+</div>
                <div className="text-gray-600 dark:text-gray-300">Active Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">2,000+</div>
                <div className="text-gray-600 dark:text-gray-300">Talented Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">150+</div>
                <div className="text-gray-600 dark:text-gray-300">Success Stories</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
