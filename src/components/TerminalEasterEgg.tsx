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
                    className="fixed bottom-6 right-6 w-full max-w-[400px] h-[350px] bg-black/90 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl z-[100] flex flex-col font-mono text-sm overflow-hidden"
                >
                    <div className="flex justify-between items-center px-4 py-2 bg-gray-900 border-b border-gray-800 select-none">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsOpen(false)}></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-gray-500 text-xs">hk-os terminal (Ctrl+`)</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto w-full custom-scrollbar" onClick={() => inputRef.current?.focus()}>
                        {output.map((line, i) => (
                            <div key={i} className={`mb-1 ${line.type === 'error' ? 'text-red-400' : line.type === 'user' ? 'text-blue-400' : line.type === 'ascii' ? 'text-emerald-500 whitespace-pre font-bold' : 'text-gray-300'}`}>
                                {line.text}
                            </div>
                        ))}
                        <form onSubmit={handleCommand} className="flex gap-2 mt-2 w-full">
                            <span className="text-emerald-500">~/hk</span><span className="text-gray-400">$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none text-white w-full"
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
