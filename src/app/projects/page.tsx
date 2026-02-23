import { getGitRep, GitHubRepo } from "@/lib/github";
import Link from 'next/link';

export default async function Projects() {
    const repos: GitHubRepo[] = await getGitRep();

    return (
        <main className="min-h-screen p-10 bg-black text-white">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                Review My Code
            </h1>

            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
                Here are some of my recent open-source projects directly from GitHub.
                Check out the code quality and consistency.
            </p>

            {repos.length === 0 ? (
                <p className="text-center text-gray-500">No repositories found. Check back later!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo) => (
                        <div
                            key={repo.id}
                            className="p-6 border border-gray-800 rounded-xl hover:border-gray-600 transition-all hover:shadow-lg hover:shadow-emerald-500/10 bg-gray-900/50 backdrop-blur-sm group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                                    <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </Link>
                                </h2>
                                {repo.language && (
                                    <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                                        {repo.language}
                                    </span>
                                )}
                            </div>

                            {repo.status && (
                                <div className="mb-3">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium border ${repo.status === 'Completed'
                                            ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800'
                                            : 'bg-yellow-900/30 text-yellow-400 border-yellow-800'
                                        }`}>
                                        {repo.status}
                                    </span>
                                </div>
                            )}

                            <p className="text-gray-400 text-sm mb-4 line-clamp-3 min-h-[60px]">

                                {repo.description || "No description provided."}
                            </p>

                            <div className="flex justify-between items-center text-xs text-gray-500 mt-auto pt-4 border-t border-gray-800/50">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        ⭐ {repo.stargazers_count}
                                    </span>
                                    <span>
                                        Updated {new Date(repo.updated_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <Link
                                    href={repo.html_url}
                                    target="_blank"
                                    className="text-emerald-500 hover:text-emerald-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    View Code →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
