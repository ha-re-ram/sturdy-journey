import { getGitRep, GitHubRepo } from "@/lib/github";
import Link from 'next/link';
import ProjectList from "./ProjectList";

export default async function Projects() {
    const repos: GitHubRepo[] = await getGitRep();

    return (
        <main className="min-h-screen bg-black text-white py-20 px-6 sm:px-10 max-w-7xl mx-auto">
            <header className="mb-20">
                <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                    Projects
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
                    A collection of systems and applications I&apos;ve built, ranging from web architectures to low-level OS experiments.
                </p>
            </header>

            {repos.length === 0 ? (
                <div className="text-center py-20 border border-gray-800 rounded-3xl bg-gray-900/20">
                    <p className="text-gray-500 text-lg">No repositories found. Check back later!</p>
                </div>
            ) : (
                <ProjectList repos={repos} />
            )}

            <footer className="mt-32 pt-20 border-t border-gray-900 text-center">
                <p className="text-gray-500 text-lg">
                    More projects can be found on my <Link href={`https://github.com/ha-re-ram`} target="_blank" className="text-gray-300 hover:text-white transition-colors underline underline-offset-8 decoration-gray-800 hover:decoration-blue-500">GitHub profile</Link>.
                </p>
            </footer>
        </main>
    );
}
