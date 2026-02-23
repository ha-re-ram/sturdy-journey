import { siteConfig } from "./config";

export interface GitHubRepo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    status?: string; // Add status field
}

export async function getGitRep(): Promise<GitHubRepo[]> {
    try {
        const username = siteConfig.social.github;
        // Fetch more repos to find the curated ones
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            if (res.status === 404) {
                return [];
            }
            throw new Error(`Failed to fetch GitHub repos: ${res.statusText}`);
        }

        const repos: GitHubRepo[] = await res.json();

        // Sort logic:
        // 1. Curated projects from config (in specific order)
        // 2. Remaining projects sorted by updated_at

        const curatedProjects = siteConfig.projects || [];
        const curatedNames = new Set(curatedProjects.map(p => p.name));

        const sortedRepos: GitHubRepo[] = [];
        const otherRepos: GitHubRepo[] = [];

        // Find curated repos
        curatedProjects.forEach(configProject => {
            const repo = repos.find(r => r.name.toLowerCase() === configProject.name.toLowerCase());
            if (repo) {
                sortedRepos.push({ ...repo, status: configProject.status });
            }
        });

        // Find remaining repos
        repos.forEach(repo => {
            if (!curatedNames.has(repo.name) && !sortedRepos.some(r => r.name === repo.name)) {
                otherRepos.push(repo);
            }
        });


        // Sort remaining by date descending
        otherRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        return [...sortedRepos, ...otherRepos];
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return [];
    }
}
