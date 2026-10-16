/**
 * Dedicated Portfolio AI Assistant Engine for Aditya Kumar Singh
 * Independent assistant created specifically to answer queries about
 * Aditya's portfolio, background, engineering projects, skills, and contact.
 * (Separate from Aditya's standalone projects like AURA or Nayaya AI).
 */

import { ADITYA_PROFILE, ADITYA_SKILLS, ADITYA_PROJECTS } from './knowledge-base.js';

export class PortfolioAIAssistant {
  constructor() {
    this.history = [];
    this.speechEnabled = false;
    this.synth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.isGenerating = false;
    this.selectedVoice = null;
    this.customApiKey = localStorage.getItem('portfolio_ai_api_key') || '';
    this.customProvider = localStorage.getItem('portfolio_ai_provider') || 'local'; // 'local' | 'gemini' | 'groq' | 'openai'

    this.initSpeech();
  }

  initSpeech() {
    if (!this.synth) return;
    const loadVoices = () => {
      const voices = this.synth.getVoices();
      this.selectedVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))) || voices[0];
    };
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  toggleSpeech(enable) {
    this.speechEnabled = enable !== undefined ? enable : !this.speechEnabled;
    if (!this.speechEnabled && this.synth) {
      this.synth.cancel();
    }
    return this.speechEnabled;
  }

  speak(text) {
    if (!this.speechEnabled || !this.synth) return;
    try {
      this.synth.cancel();
      const cleanText = text
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .replace(/[*_#`~>]/g, '')
        .replace(/\n+/g, ' ');
      
      const utterance = new SpeechSynthesisUtterance(cleanText);
      if (this.selectedVoice) utterance.voice = this.selectedVoice;
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn("Speech error:", e);
    }
  }

  /**
   * Main query resolver
   */
  async ask(userPrompt) {
    const prompt = userPrompt.trim();
    if (!prompt) return null;

    // Check if user configured an external generative API key
    if (this.customProvider !== 'local' && this.customApiKey) {
      try {
        const externalReply = await this.queryExternalLLM(prompt);
        if (externalReply) {
          return {
            text: externalReply,
            source: this.customProvider.toUpperCase(),
            quickActions: this.suggestNextActions(prompt)
          };
        }
      } catch (err) {
        console.warn("External API failed, falling back to built-in knowledge engine:", err);
      }
    }

    // Built-in intelligent Knowledge Engine strictly answering for the portfolio
    const response = this.resolvePortfolioKnowledge(prompt);
    return response;
  }

  resolvePortfolioKnowledge(query) {
    const q = query.toLowerCase();

    // 1. GREETINGS & INTRO
    if (/^(hi|hello|hey|greetings|hola|namaste|sup|yo)\b/i.test(q)) {
      return {
        text: `Hello! 👋 I am **Aditya's Portfolio AI Assistant**.\n\nI was created specifically to help you navigate Aditya Kumar Singh's portfolio, answer questions about his software engineering projects (such as **Nayaya AI**, **AURA**, and **Wiz-Bulb-Sync**), his computer science degree at **Techno India University**, technical skills, and contact details.\n\nWhat would you like to know about his portfolio?`,
        quickActions: ["Who is Aditya?", "Explore Projects", "What is his tech stack?", "How to contact him?"]
      };
    }

    // 2. WHO ARE YOU / WHAT IS THIS AI
    if (/\b(who are you|what are you|what is your purpose|what can you do)\b/i.test(q) && 
        !q.includes("your skill") && 
        !q.includes("your certif") && 
        !q.includes("your phone") && 
        !q.includes("your project") && 
        !q.includes("your education")) {
      return {
        text: `I am the **Portfolio AI Assistant** for Aditya Kumar Singh.\n\nMy sole purpose is to serve as an interactive guide for this portfolio. I have complete knowledge of:\n- Aditya's bio, education, and career aspirations\n- His featured projects and source code repositories\n- Technical skill ratings across Python, AI/ML, C++, Web & IoT\n- Competitive problem-solving track record on LeetCode & GeeksforGeeks\n- Direct channels to hire or collaborate with him`,
        quickActions: ["Tell me about Nayaya AI", "View his skills", "Why should we hire Aditya?"]
      };
    }

    // 3. ABOUT ADITYA / BIO / BACKGROUND
    if (q.includes("who is") || q.includes("about aditya") || q.includes("background") || q.includes("introduce") || q.includes("bio")) {
      return {
        text: `**${ADITYA_PROFILE.name}** is an **${ADITYA_PROFILE.title}** and undergraduate at **${ADITYA_PROFILE.education.institution}**.\n\n🚀 **Portfolio Summary:**\n- **Offline AI & Autonomous Systems**: Developed **Nayaya AI** (privacy-focused offline legal advisor) and **AURA** (conversational desktop assistant).\n- **IoT Protocols & Hardware**: Created **Wiz-Bulb-Sync** for local-network ambient lighting using UDP sockets.\n- **Full-Stack Software**: Skilled in Python, JavaScript/TypeScript, modern web architectures, and C++ algorithmic design.\n- **Current Status**: ${ADITYA_PROFILE.currentStatus}`,
        quickActions: ["Show all projects", "View skills breakdown", "Contact info"]
      };
    }

    // 4. EDUCATION / UNIVERSITY / DEGREE
    if (q.includes("college") || q.includes("university") || q.includes("education") || q.includes("degree") || q.includes("techno india") || q.includes("study") || q.includes("undergraduate") || q.includes("academic") || q.includes("cgpa") || q.includes("school")) {
      return {
        text: `🎓 **Academic Background & Education:**\n\n- **Degree**: **B.Tech in Computer Science and Business Systems (CSBS)**\n- **University**: **Techno India University, West Bengal** (August 2022 – July 2026)\n- **CGPA**: **7.54 / 10**\n- **Higher Secondary School**: A. A. M. Children’s Academy, Katihar, Bihar (Aug 2019 – July 2021) • **65.8%**\n- **Secondary School**: R. K. M. Vidya Mandir, Katihar, Bihar (Aug 2017 – May 2019) • **63.8%**\n- **Core Focus**: Generative AI, RAG, Local LLMs, Multi-Agent Workflows, and High-Performance Systems.`,
        quickActions: ["What projects has he built?", "View Certifications", "Download Resume"]
      };
    }

    // 5. RECRUITER PITCH / WHY HIRE
    if (q.includes("why hire") || q.includes("hire aditya") || q.includes("why should we hire") || q.includes("strength") || q.includes("recruiter") || q.includes("internship") || q.includes("job")) {
      return {
        text: `🌟 **Why Aditya stands out for engineering teams:**\n\n1. **Pragmatic AI Builder**: Proven ability to build end-to-end AI applications like **Nayaya AI** (offline local LLM inference + RAG) and computer vision pipelines (**Emotion Detector**).\n2. **Low-Level to High-Level Range**: Experienced in low-latency UDP sockets and C++ algorithmic problem-solving as well as full-stack web and Node.js.\n3. **Dedicated Problem Solver**: Active coder on LeetCode and GeeksforGeeks (` + "`singhaditya7864`" + `) focusing on optimal time/space complexity.\n4. **Autonomous & Quick Learner**: Self-driven builder with an open-source mindset.\n\nGet in touch directly at **[singhaditya7864@gmail.com](mailto:singhaditya7864@gmail.com)**!`,
        quickActions: ["Copy Email", "View LinkedIn", "Explore Nayaya AI"]
      };
    }

    // 6. NAYAYA / NYAYA AI
    if (q.includes("nayaya") || q.includes("nyaya") || q.includes("legal") || q.includes("judicial") || q.includes("law")) {
      const p = ADITYA_PROJECTS.find(pr => pr.id === "nayaya-ai");
      return {
        text: `⚖️ **${p.title}**\n\n${p.description}\n\n**Tech Stack:** ${p.techStack.map(t => '`' + t + '`').join(', ')}\n\n**Key Highlights:**\n${p.highlights.map(h => `- ${h}`).join('\n')}\n\n🔗 [View Nayaya AI on GitHub](${p.github})`,
        quickActions: ["Open Nayaya AI Repo", "What other AI projects?", "All Projects"]
      };
    }

    // 7. AURA (SEPARATE PROJECT ON HIS GITHUB)
    if (q.includes("aura") || (q.includes("voice") && q.includes("assistant"))) {
      const p = ADITYA_PROJECTS.find(pr => pr.id === "aura-ai");
      return {
        text: `🎙️ **${p.title}**\n\n*Note: AURA is a separate, standalone project created by Aditya—distinct from me (his portfolio assistant)!*\n\n${p.description}\n\n**Tech Stack:** ${p.techStack.map(t => '`' + t + '`').join(', ')}\n\n**Project Highlights:**\n${p.highlights.map(h => `- ${h}`).join('\n')}\n\n🔗 [View AURA Project on GitHub](${p.github})`,
        quickActions: ["Open AURA Repo", "Tell me about Wiz-Bulb-Sync", "All Projects"]
      };
    }

    // 8. WIZ BULB SYNC / IOT
    if (q.includes("wiz") || q.includes("bulb") || q.includes("iot") || q.includes("hardware") || q.includes("lighting") || q.includes("udp")) {
      const p = ADITYA_PROJECTS.find(pr => pr.id === "wiz-bulb-sync");
      return {
        text: `💡 **${p.title}**\n\n${p.description}\n\n**Tech Stack:** ${p.techStack.map(t => '`' + t + '`').join(', ')}\n\n**Why it stands out:**\n${p.highlights.map(h => `- ${h}`).join('\n')}\n\n🔗 [View Wiz-Bulb-Sync on GitHub](${p.github})`,
        quickActions: ["Tell me about Emotion Detector", "View all projects"]
      };
    }

    // 9. EMOTION DETECTOR / OPENCV
    if (q.includes("emotion") || q.includes("opencv") || q.includes("vision") || q.includes("cnn") || q.includes("face")) {
      const p = ADITYA_PROJECTS.find(pr => pr.id === "emotion-detector");
      return {
        text: `🎭 **${p.title}**\n\n${p.description}\n\n**Tech Stack:** ${p.techStack.map(t => '`' + t + '`').join(', ')}\n\n**Capabilities:**\n${p.highlights.map(h => `- ${h}`).join('\n')}\n\n🔗 [View Emotion Detector on GitHub](${p.github})`,
        quickActions: ["Tell me about OmniDownloader", "Nayaya AI details"]
      };
    }

    // 10. OMNIDOWNLOADER
    if (q.includes("omni") || q.includes("download") || q.includes("stream")) {
      const p = ADITYA_PROJECTS.find(pr => pr.id === "omni-downloader");
      return {
        text: `📥 **${p.title}**\n\n${p.description}\n\n**Tech Stack:** ${p.techStack.map(t => '`' + t + '`').join(', ')}\n\n**Highlights:**\n${p.highlights.map(h => `- ${h}`).join('\n')}\n\n🔗 [View OmniDownloader on GitHub](${p.github})`,
        quickActions: ["India Interactive Map", "All Projects"]
      };
    }

    // 11. INDIA INTERACTIVE MAP
    if (q.includes("map") || q.includes("india") || q.includes("geospatial") || q.includes("gis")) {
      const p = ADITYA_PROJECTS.find(pr => pr.id === "india-interactive-map");
      return {
        text: `🗺️ **${p.title}**\n\n${p.description}\n\n**Tech Stack:** ${p.techStack.map(t => '`' + t + '`').join(', ')}\n\n**Highlights:**\n${p.highlights.map(h => `- ${h}`).join('\n')}\n\n🔗 [View India Interactive Map on GitHub](${p.github})`,
        quickActions: ["Explore all projects", "Contact Aditya"]
      };
    }

    // 12. ALL PROJECTS
    if (q.includes("projects") || q.includes("work") || q.includes("portfolio") || q.includes("repos") || q.includes("what has he built")) {
      const projectList = ADITYA_PROJECTS.map(p => `- ${p.icon} **[${p.title}](${p.github})**: ${p.summary}`).join('\n');
      return {
        text: `🚀 **Featured Projects in Aditya's Portfolio:**\n\n${projectList}\n\nAll source code is publicly accessible on [Aditya's GitHub profile](https://github.com/ADITYAKUMARSINGH16). Which project would you like to explore deeper?`,
        quickActions: ["Deep dive: Nayaya AI", "Deep dive: Wiz-Bulb-Sync", "Deep dive: AURA project"]
      };
    }

    // 13. SKILLS / TECH STACK
    if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("languages") || q.includes("python") || q.includes("javascript") || q.includes("tools")) {
      return {
        text: `🛠️ **Aditya Kumar Singh's Technical Arsenal:**\n\n- **Core Languages**: Python (Primary for AI/Backend), JavaScript (ES6+), TypeScript, C/C++ (DSA & Hardware), SQL, HTML5/CSS3\n- **AI & Deep Learning**: Local LLMs (Ollama), LangChain, RAG architectures, OpenCV, CNNs, Speech APIs\n- **Systems & IoT**: UDP/LAN Socket protocols, Ambient Device Control, Linux OS, Docker\n- **Web & Backend**: Node.js, Express, REST APIs, Component Design, Responsive CSS\n- **DevOps & Workflow**: Git, GitHub, GitHub Actions, Postman, VS Code`,
        quickActions: ["Show problem-solving stats", "Why hire Aditya?", "See project repos"]
      };
    }

    // 14. PROBLEM SOLVING / LEETCODE / GEEKSFORGEEKS
    if (q.includes("leetcode") || q.includes("geeksforgeeks") || q.includes("gfg") || q.includes("dsa") || q.includes("problem solving") || q.includes("competitive")) {
      return {
        text: `🧩 **Problem Solving & Competitive Programming Profiles:**\n\n- 🟧 **LeetCode**: [leetcode.com/u/singhaditya7864](https://leetcode.com/u/singhaditya7864/)\n- 🟩 **GeeksforGeeks**: [geeksforgeeks.org/profile/singhaditya7864](https://www.geeksforgeeks.org/profile/singhaditya7864)\n\nAditya focuses on clean implementations of Graph algorithms, Dynamic Programming, Trees, Binary Search, and optimal Big-O complexity in C++ and Python.`,
        quickActions: ["View LeetCode profile", "Check out GitHub", "Contact Aditya"]
      };
    }

    // 14.5 RESUME / CV
    if (q.includes("resume") || q.includes("cv") || q.includes("curriculum vitae")) {
      return {
        text: `📄 **Aditya Kumar Singh's Official Resume / CV:**\n\n- **Education**: B.Tech in Computer Science and Business Systems (CSBS) @ **Techno India University** (CGPA: 7.54/10)\n- **Primary R&D**: Generative AI, RAG, Locally Hosted LLMs (Ollama, Gemma), Multi-Agent Workflows, and FastAPI\n- **Official 1-Page PDF**: [Download Aditya_Kumar_Singh_Resume.pdf](assets/Aditya_Kumar_Singh_Resume.pdf)\n\nYou can download the exact 1-page PDF using the green **Resume** button in the header or the **Resume / CV** hero action!`,
        quickActions: ["Download Resume PDF", "View Certifications", "Contact Aditya"]
      };
    }

    // 14.8 CERTIFICATIONS / INTERNSHIPS
    if (q.includes("certif") || q.includes("credential") || q.includes("virtual internship") || q.includes("palo alto") || q.includes("juniper") || q.includes("eduskills")) {
      return {
        text: `📜 **Official Virtual Internships & Certifications:**\n\n- 🛡️ **Cybersecurity Virtual Internship** — EduSkills, supported by **Palo Alto Networks** (May – July 2023)\n- 🤖 **Android Developer Virtual Internship** — EduSkills, supported by **Google for Developers** (Sep – Nov 2023)\n- 🌐 **Networking Virtual Internship** — EduSkills, supported by **Juniper Networks** (Jan – Mar 2024)\n\nAll verified and featured on Aditya's official resume!`,
        quickActions: ["Download Resume PDF", "What are his skills?", "Contact Aditya"]
      };
    }

    // 15. CONTACT / PHONE / EMAIL
    if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("linkedin") || q.includes("social") || q.includes("phone") || q.includes("mobile") || q.includes("call") || q.includes("connect") || q.includes("location") || q.includes("address") || q.includes("city")) {
      return {
        text: `📬 **How to Connect with Aditya Kumar Singh:**\n\n- 📞 **Phone**: [+91 7273963985](tel:+917273963985)\n- 📧 **Direct Email**: [singhaditya7864@gmail.com](mailto:singhaditya7864@gmail.com)\n- 💼 **LinkedIn**: [Aditya Kumar Singh](https://www.linkedin.com/in/aditya-kumar-singh-7a439b315/)\n- 🐙 **GitHub**: [github.com/ADITYAKUMARSINGH16](https://github.com/ADITYAKUMARSINGH16)\n- 🏠 **Permanent Address**: Katihar, Bihar, India\n- 🎓 **College**: Techno India University, West Bengal\n\nFeel free to send an email, connect on LinkedIn, or call directly!`,
        quickActions: ["Download Resume PDF", "Visit LinkedIn", "Browse GitHub"]
      };
    }

    // 16. GITHUB STATS
    if (q.includes("github") || q.includes("streak") || q.includes("activity") || q.includes("contribution")) {
      return {
        text: `🐙 **Aditya's GitHub Activity:**\n\n- **Profile**: [github.com/ADITYAKUMARSINGH16](https://github.com/ADITYAKUMARSINGH16)\n- Active developer maintaining multiple repositories in AI, Full-Stack, and IoT.\n- Features an automated contribution grid snake and repository analytics.\n- Regularly explores next-gen LLMs and developer tooling!`,
        quickActions: ["Explore Nayaya AI", "Contact Aditya"]
      };
    }

    // 17. PORTFOLIO-SPECIFIC FALLBACK
    return {
      text: `I'm specifically set up to answer questions regarding **Aditya Kumar Singh's portfolio**.\n\nHere are some things you can ask me:\n- ⚖️ **Nayaya AI** (Offline Legal & Judicial Assistant)\n- 🎙️ **AURA** (His separate voice & desktop AI assistant project)\n- 💡 **Wiz-Bulb-Sync** (Ambient IoT lighting via UDP)\n- 🛠️ **Technical Arsenal** (Python, Local LLMs, C++, Web)\n- 🎓 **Education** at Techno India University\n- 🧩 **Competitive Coding** (LeetCode & GFG)\n- 📬 **Contact & Collaboration Details**\n\nWhat would you like to explore?`,
      quickActions: ["Tell me about Nayaya AI", "What are his skills?", "How to hire him?", "Problem solving stats"]
    };
  }

  suggestNextActions(lastPrompt) {
    const p = lastPrompt.toLowerCase();
    if (p.includes("nayaya") || p.includes("nyaya")) return ["What other AI projects?", "How to contact him?"];
    if (p.includes("skill")) return ["Show all projects", "LeetCode profile"];
    return ["Tell me about Nayaya AI", "What are his skills?", "Contact Aditya"];
  }

  /**
   * Optional External LLM Integration (Gemini, Groq, OpenAI)
   */
  async queryExternalLLM(prompt) {
    const systemPrompt = `You are the dedicated Portfolio AI Assistant for Aditya Kumar Singh on his personal portfolio website.
You are separate from Aditya's individual projects (such as AURA or Nayaya AI). Your job is exclusively to answer questions about Aditya's personal portfolio, engineering projects, background, skills, and contact details.
Know everything about Aditya:
- Name: Aditya Kumar Singh
- University: Techno India University (Undergraduate in Computer Science & Engineering)
- Core Focus: AI & ML (RAG, Local LLMs with Ollama/LangChain), Full-Stack engineering, IoT ambient automation.
- Projects in his portfolio:
  1. Nayaya AI (Offline legal/judicial assistant using local LLMs & RAG)
  2. AURA (His separate desktop voice & automation AI assistant project)
  3. Wiz-Bulb-Sync (IoT UDP lighting automation with WiZ bulbs)
  4. Emotion-Detector (OpenCV CNN facial expression analysis)
  5. OmniDownloader (multithreaded stream downloader)
  6. India-Interactive-Map (vector geospatial visualizer)
- Contact: singhaditya7864@gmail.com, GitHub: ADITYAKUMARSINGH16, LinkedIn: aditya-kumar-singh-7a439b315, LeetCode: singhaditya7864.
Always answer helpfully, concisely, and invite visitors to reach out.`;

    if (this.customProvider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.customApiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: systemPrompt + "\n\nUser Question: " + prompt }] }
          ]
        })
      });
      if (!res.ok) throw new Error("Gemini API error: " + res.statusText);
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    }

    if (this.customProvider === 'groq' || this.customProvider === 'openai') {
      const endpoint = this.customProvider === 'groq' 
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : 'https://api.openai.com/v1/chat/completions';
      const model = this.customProvider === 'groq' ? 'llama-3.1-8b-instant' : 'gpt-4o-mini';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.customApiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ]
        })
      });
      if (!res.ok) throw new Error(`${this.customProvider} API error: ` + res.statusText);
      const data = await res.json();
      return data.choices?.[0]?.message?.content;
    }

    return null;
  }
}
