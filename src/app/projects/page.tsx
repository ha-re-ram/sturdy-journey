import { getGitRep, GitHubRepo } from "@/lib/github";
import Link from 'next/link';

export default async function Projects() {
    const repos: GitHubRepo[] = await getGitRep();

    return (
        <main className="min-h-screen bg-black text-white py-20 px-6 sm:px-10 max-w-7xl mx-auto">
            <header className="mb-20">
                <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Projects
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                    A collection of systems and applications I've built, ranging from web architectures to low-level OS experiments.
                </p>
            </header>

            {repos.length === 0 ? (
                <div className="text-center py-20 border border-gray-800 rounded-3xl bg-gray-900/20">
                    <p className="text-gray-500 text-lg">No repositories found. Check back later!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {repos.map((repo) => (
                        <div
                            key={repo.id}
                            className="group flex flex-col p-8 border border-gray-800 rounded-3xl bg-gray-900/20 backdrop-blur-sm hover:bg-gray-900/40 hover:border-gray-700 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-gray-800/50 rounded-2xl group-hover:bg-blue-500/10 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-400 transition-colors"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                                </div>
                                <div className="flex gap-2">
                                    {repo.language && (
                                        <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-gray-800/50 text-gray-400 border border-gray-700">
                                            {repo.language}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                    {repo.name.replace(/-/g, ' ')}
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4 min-h-[5rem]">
                                    {repo.description || "Experimental project and code samples exploring new technologies and concepts."}
                                </p>
                            </div>

                            <div className="mt-auto space-y-6">
                                {repo.status && (
                                    <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border ${repo.status === 'Completed'
                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                            : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${repo.status === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                                        {repo.status}
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                            {repo.stargazers_count}
                                        </span>
                                        <span>
                                            {new Date(repo.updated_at).getFullYear()}
                                        </span>
                                    </div>
                                    <Link
                                        href={repo.html_url}
                                        target="_blank"
                                        className="text-white hover:text-blue-400 font-medium text-sm flex items-center gap-2 transition-colors"
                                    >
                                        Source
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <footer className="mt-20 pt-20 border-t border-gray-800 text-center">
                <p className="text-gray-500">
                    More projects can be found on my <Link href={`https://github.com/ha-re-ram`} target="_blank" className="text-gray-300 hover:text-white transition-colors underline underline-offset-4">GitHub profile</Link>.
                </p>
            </footer>
        </main>
    );
}
