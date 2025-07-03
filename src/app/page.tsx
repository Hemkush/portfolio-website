import styles from '@/app/ui/styles/home.module.css';
import Image from 'next/image';
export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="container mx-auto p-4 relative">
                <div className="bg-white border-2 border-gray-100 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl text-gray-700 font-bold mb-4">Welcome</h1>
                        <p className="text-lg text-gray-700 mb-4">
You are about to explore the journey of a curious mind, a passionate builder, and a lifelong learner.
Hi, I am Hemant — a driven and dynamic individual who blends technical skills with creativity, hard work with humility, and ambition with empathy.
From coding robust systems to collaborating on impactful projects, I strive to leave a mark wherever I go.
Take a look around — you might just find the perfect teammate, problem-solver, or spark of inspiration.
                        </p>
                        <a href="/home/about" className={`outline outline-1 outline-offset-2 border-gray-700 text-gray-700 hover:text-white py-2 px-4 rounded hover:bg-gray-800 md:w-auto ${styles.fit_content}`}>
                          About Me
                        </a>
                    </div>
                    <Image
                        src="/image-desktop.png"
                        alt="Hero Image"
                        width={1000}
                        height={760}
                        className="hidden md:block w-full h-auto rounded-lg shadow-lg object-cover z-10"
                    />
                    <Image
                        src="/image-desktop.png"
                        alt="Hero Image"
                        width={560}
                        height={620}
                        className="md:hidden block w-full h-auto rounded-lg shadow-lg object-cover z-10"
                    />
                </div>

            </div>
            <div className="bg-gray-800/60 hidden md:block absolute top-0 right-0 bottom-0 left-2/3 z-0"></div> 
        </main>
  );
}
