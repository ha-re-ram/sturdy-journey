"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";

export default function TerminalEasterEgg() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<{ type: "system" | "user" | "error" | "ascii"; text: string }[]>([
        { type: "system", text: "Welcome to HK-OS v1.0.0" },
        { type: "system", text: 'Type "help" to see available commands.' }
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Trigger with Ctrl+` or Ctrl+K
            if ((e.ctrlKey && e.key === "`") || (e.ctrlKey && e.key === "k")) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
        }
    }, [isOpen, output]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        if (!cmd) return;

        const newOutput = [...output, { type: "user" as const, text: `$ ${input}` }];

        switch (cmd) {
            case "help":
                newOutput.push({ type: "system", text: "Available commands: help, whoami, clear, projects, contact, resume, neofetch" });
                break;
            case "whoami":
                newOutput.push({ type: "system", text: `I am ${siteConfig.author}, a Software Engineer focused on backend systems and scalability.` });
                break;
            case "clear":
                setOutput([]);
                setInput("");
                return;
            case "projects":
                newOutput.push({ type: "system", text: "Loading projects..." });
                siteConfig.projects.slice(0, 3).forEach(p => newOutput.push({ type: "system", text: `- ${p.name}: ${p.description}` }));
                break;
            case "contact":
                newOutput.push({ type: "system", text: `Email: ${siteConfig.contact.email}\nGitHub: github.com/${siteConfig.social.github}` });
                break;
            case "resume":
                newOutput.push({ type: "system", text: `Opening resume from ${siteConfig.resumeUrl}...` });
                window.open(siteConfig.resumeUrl, "_blank");
                break;
            case "neofetch":
                newOutput.push({
                    type: "ascii", text:
                        `
     /\\     OS: HK-OS
    /  \\    Kernel: 5.15.0
   /____\\   Uptime: 1337 days
  /      \\  Shell: base
 /________\\ User: Hareram Kushwaha
`
                });
                break;
            case "sudo":
                newOutput.push({ type: "error", text: "Nice try! This incident will be reported." });
                break;
            default:
                newOutput.push({ type: "error", text: `Command not found: ${cmd}` });
        }

        setOutput(newOutput);
        setInput("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    className="fixed bottom-6 right-6 w-full max-w-[400px] h-[350px] bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-[100] flex flex-col font-mono text-sm overflow-hidden"
                >
                    <div className="flex justify-between items-center px-4 py-3 bg-white/40 border-b border-white/50 select-none backdrop-blur-md">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#1a1a1a]/20 hover:bg-[#1a1a1a]/40 transition-colors cursor-pointer" onClick={() => setIsOpen(false)}></div>
                            <div className="w-3 h-3 rounded-full bg-[#1a1a1a]/10"></div>
                            <div className="w-3 h-3 rounded-full bg-[#1a1a1a]/10"></div>
                        </div>
                        <span className="text-[#1a1a1a]/40 font-syne font-bold tracking-widest uppercase text-[10px]">hk-os (Ctrl+`)</span>
                    </div>
                    <div className="flex-1 p-5 overflow-y-auto w-full custom-scrollbar text-[#1a1a1a]" onClick={() => inputRef.current?.focus()}>
                        {output.map((line, i) => (
                            <div key={i} className={`mb-1.5 ${line.type === 'error' ? 'text-red-500 font-medium' : line.type === 'user' ? 'text-[#1a1a1a]/60 font-semibold' : line.type === 'ascii' ? 'text-[#1a1a1a] whitespace-pre font-black' : 'text-[#1a1a1a]/80 font-light'}`}>
                                {line.text}
                            </div>
                        ))}
                        <form onSubmit={handleCommand} className="flex gap-2 mt-4 w-full">
                            <span className="text-[#1a1a1a] font-bold">~/hk</span>
                            <span className="text-[#1a1a1a]/40">❯</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none text-[#1a1a1a] w-full font-medium placeholder-[#1a1a1a]/20"
                                autoComplete="off"
                                autoFocus
                            />
                        </form>
                        <div ref={bottomRef} className="h-1" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
