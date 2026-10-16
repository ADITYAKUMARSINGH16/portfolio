/**
 * Aditya Kumar Singh - Autonomous Intelligence Knowledge Base
 * Sourced directly from Aditya's Official Resume & GitHub:
 * Phone: (+91) 7273963985
 * Email: singhaditya7864@gmail.com
 * GitHub: https://github.com/ADITYAKUMARSINGH16
 * LinkedIn: https://www.linkedin.com/in/aditya-kumar-singh-7a439b315/
 */

export const ADITYA_PROFILE = {
  name: "Aditya Kumar Singh",
  title: "AI & Machine Learning Engineer • Generative AI & Autonomous Systems",
  phone: "(+91) 7273963985",
  email: "singhaditya7864@gmail.com",
  summary: "Motivated Computer Science and Business Systems undergraduate with hands-on experience in developing AI-powered applications using Python, FastAPI, Ollama, Retrieval-Augmented Generation (RAG), and Docker. Skilled in building locally hosted AI systems, voice assistants, semantic search applications, and multi-agent workflows. Seeking entry-level Software Engineering, AI/ML, or Generative AI opportunities to apply technical skills and build impactful solutions.",
  
  education: {
    degree: "B.Tech in Computer Science and Business Systems (CSBS)",
    institution: "Techno India University, West Bengal",
    duration: "August 2022 – July 2026",
    cgpa: "7.54 / 10",
    status: "Undergraduate (Final Year)",
    schooling: [
      {
        level: "Higher Secondary School",
        institution: "A. A. M. Children’s Academy",
        location: "Katihar, Bihar",
        duration: "August 2019 – July 2021",
        score: "65.8%"
      },
      {
        level: "Secondary School",
        institution: "R. K. M. Vidya Mandir",
        location: "Katihar, Bihar",
        duration: "August 2017 – May 2019",
        score: "63.8%"
      }
    ],
    highlights: [
      "Rigorous CSBS curriculum bridging modern Computer Science with Business System architecture",
      "Specialized in Generative AI, RAG, Local LLMs, and Multi-Agent Workflows",
      "Graduating in July 2026 with consistent 7.54/10 CGPA"
    ]
  },

  contact: {
    phone: "(+91) 7273963985",
    email: "singhaditya7864@gmail.com",
    github: "https://github.com/ADITYAKUMARSINGH16",
    linkedin: "https://www.linkedin.com/in/aditya-kumar-singh-7a439b315/",
    leetcode: "https://leetcode.com/u/singhaditya7864/",
    geeksforgeeks: "https://www.geeksforgeeks.org/profile/singhaditya7864",
    permanentLocation: "Katihar, Bihar, India",
    collegeLocation: "Techno India University, West Bengal, India",
    location: "Katihar, Bihar, India (College: Kolkata, West Bengal)",
    resume: "assets/Aditya_Kumar_Singh_Resume.pdf"
  },

  certifications: [
    {
      title: "Cybersecurity Virtual Internship",
      provider: "EduSkills (supported by Palo Alto Networks)",
      duration: "May – July 2023",
      icon: "fa-shield-halved"
    },
    {
      title: "Android Developer Virtual Internship",
      provider: "EduSkills (supported by Google for Developers)",
      duration: "Sep – Nov 2023",
      icon: "fa-brands fa-android"
    },
    {
      title: "Networking Virtual Internship",
      provider: "EduSkills (supported by Juniper Networks)",
      duration: "Jan – Mar 2024",
      icon: "fa-network-wired"
    }
  ],

  pillars: [
    {
      id: "gen-ai",
      title: "Generative AI & RAG",
      icon: "⚖️",
      summary: "Air-gapped local LLMs (Ollama, Gemma), semantic search with vector embeddings & Pinecone, and zero cloud leaks."
    },
    {
      id: "multi-agent",
      title: "Multi-Agent Systems",
      icon: "🤖",
      summary: "Complex agent orchestration (Legal Assistant, Lawyer, Opposing Counsel, Judge) simulating end-to-end reasoning."
    },
    {
      id: "voice-ai",
      title: "Voice AI & Tactical HUD",
      icon: "🎙️",
      summary: "Autonomous voice assistant (AURA) with STT, TTS, wake-word, OCR screen reading, and telemetry telemetry."
    },
    {
      id: "iot-systems",
      title: "Low-Latency Systems & IoT",
      icon: "💡",
      summary: "Direct socket programming, sub-50ms UDP datagrams, Docker containerization, and n8n workflow automation."
    }
  ],

  passions: ["Generative AI", "Multi-Agent Reasoning", "Local LLM Deployment", "Algorithmic Problem Solving"],
  currentStatus: "Building autonomous AI agents, multi-agent workflows, and low-latency systems. Actively seeking Software Engineering, AI/ML, or Generative AI opportunities."
};

export const ADITYA_PROJECTS = [
  {
    id: "aura-ai",
    title: "AURA – Autonomous AI Voice Assistant",
    category: "ai",
    badge: "Voice & Agent Flagship",
    icon: "🎙️",
    status: "Production Ready",
    statusColor: "cyan",
    summary: "Locally hosted AI voice assistant built with Python, FastAPI, Ollama, and Gemma supporting voice/text interaction, OCR screen reading, and a Tactical HUD.",
    description: "An autonomous, multi-modal desktop assistant. Integrates speech-to-text (STT), text-to-speech (TTS), wake-word detection, system control, OCR-based screen reading, web search, file management, and conversational memory with a real-time Tactical HUD for hardware telemetry.",
    architecture: [
      { 
        step: "1", 
        title: "Speech / Text Ingestion", 
        desc: "Wake-word detection & real-time mic streaming",
        packet: `{
  "stream_source": "default_mic_device",
  "wake_word": "detected ('Hey Aura')",
  "sample_rate_hz": 16000,
  "channels": 1,
  "vad_confidence": 0.982,
  "latency_ms": 12.4
}`,
        designNote: "Local chunk buffering streams to WebRTC VAD. Discards non-speech frames instantly to preserve CPU headroom during gaming and development."
      },
      { 
        step: "2", 
        title: "FastAPI & Ollama Engine", 
        desc: "Gemma local LLM inference with conversational memory",
        packet: `{
  "inference_server": "FastAPI @ 127.0.0.1:8000",
  "local_model": "ollama/gemma:2b-instruct",
  "context_tokens": 4096,
  "memory_history_depth": 10,
  "temperature": 0.45,
  "ttft_ms": 140
}`,
        designNote: "FastAPI async endpoints stream tokens via Server-Sent Events (SSE). Conversation buffers are kept in an in-memory ring buffer with SQLite persistence."
      },
      { 
        step: "3", 
        title: "Multi-Modal OCR & OS Control", 
        desc: "Screen reading, file management, web search, apps",
        packet: `{
  "ocr_engine": "Tesseract-OCR / PyAutoGUI",
  "region_bounds": {"x": 0, "y": 0, "w": 1920, "h": 1080},
  "intent_detected": "system.launch_app",
  "target_binary": "code.exe",
  "execution_status": "SUCCESS"
}`,
        designNote: "Executes OCR in a worker thread pool. Intent parsing routes desktop automations (volume, windows, file movement) safely through validated sandboxed dispatchers."
      },
      { 
        step: "4", 
        title: "Tactical HUD & Low-Latency TTS", 
        desc: "Real-time system telemetry and voice response",
        packet: `{
  "hud_refresh_rate": "60 FPS",
  "telemetry": {
    "cpu_usage_pct": 14.2,
    "ram_consumed_mb": 485,
    "gpu_load_pct": 8.0
  },
  "tts_engine": "pyttsx3_offline",
  "audio_latency_ms": 45
}`,
        designNote: "Tactical HUD renders live hardware metrics and agent states directly on screen, synchronizing voice feedback without network round-trips."
      }
    ],
    techStack: ["Python", "FastAPI", "Ollama", "Gemma", "STT / TTS", "OCR", "Tactical HUD"],
    github: "https://github.com/ADITYAKUMARSINGH16/AURA-AI_ASSISTANT",
    highlights: [
      "Built with Python, FastAPI, Ollama, and Gemma for 100% locally hosted execution",
      "Features wake-word detection, OCR screen reading, and file management",
      "Includes a real-time Tactical HUD for hardware monitoring and agent telemetry"
    ]
  },
  {
    id: "nayaya-ai",
    title: "Nyaya AI Offline – AI-Powered Legal Assistant",
    category: "ai",
    badge: "Multi-Agent RAG",
    icon: "⚖️",
    status: "Active Open-Source",
    statusColor: "emerald",
    summary: "Air-gapped Indian legal assistant utilizing RAG, local LLMs, Pinecone semantic search, and a 4-role multi-agent workflow.",
    description: "Built for confidential Indian legal research using Retrieval-Augmented Generation (RAG) and locally hosted LLMs. Implements a multi-agent AI workflow comprising Legal Assistant, Lawyer, Opposing Counsel, and Judge to simulate thorough legal analysis, containerized with Docker and automated via n8n.",
    architecture: [
      { 
        step: "1", 
        title: "Legal Query & Statute Lookup", 
        desc: "Ingestion of case facts and legal query",
        packet: `{
  "legal_query": "Applicability of IPC 304A vs 302 in hit-and-run negligence",
  "jurisdiction": "Supreme Court & High Court of India",
  "privacy_mode": "AIR_GAPPED_CONFIDENTIAL",
  "external_network_egress": "BLOCKED"
}`,
        designNote: "Strict adherence to attorney-client privilege. Queries never exit the physical host, making it compliant with strict legal confidentiality laws."
      },
      { 
        step: "2", 
        title: "Vector Embeddings & Pinecone", 
        desc: "Semantic retrieval of Indian statutes & penal codes",
        packet: `{
  "embedding_model": "sentence-transformers/all-MiniLM-L6-v2",
  "vector_dimensions": 384,
  "similarity_metric": "cosine",
  "top_k_chunks": 4,
  "top_match_score": 0.894,
  "cited_statutes": ["IPC Section 304A", "Motor Vehicles Act 134"]
}`,
        designNote: "Cosine similarity filtering discards chunks below 0.72 similarity threshold, virtually eliminating statutory hallucination."
      },
      { 
        step: "3", 
        title: "Multi-Agent Simulation", 
        desc: "Assistant ➔ Lawyer ➔ Opposing Counsel ➔ Judge deliberation",
        packet: `{
  "agent_orchestration": {
    "role_1_assistant": "Fact synthesis & statute indexing complete",
    "role_2_lawyer": "Prosecution claim drafted with precedent citations",
    "role_3_opposing_counsel": "Defense counters on absence of mens rea",
    "role_4_judge": "Balanced judicial synthesis & precedent summary"
  },
  "deliberation_turns": 4
}`,
        designNote: "Adversarial deliberation mirrors real court procedures: the Opposing Counsel agent probes defense vulnerabilities before the Judge agent delivers a synthesis."
      },
      { 
        step: "4", 
        title: "Docker & n8n Automation", 
        desc: "Containerized deployment with automated document pipelines",
        packet: `{
  "container_orchestration": "docker-compose.yml",
  "containers": ["ollama_core", "n8n_worker", "vector_service"],
  "n8n_active_workflows": 3,
  "pdf_ingest_pipeline": "auto_split_embed_and_index"
}`,
        designNote: "n8n file watchers automate text extraction, section splitting, and vector ingestion whenever new case law briefs are placed in the watched directory."
      }
    ],
    techStack: ["Python", "Ollama", "RAG", "Docker", "n8n", "Pinecone", "Multi-Agent Workflows"],
    github: "https://github.com/ADITYAKUMARSINGH16/nayaya-ai-offline",
    highlights: [
      "Multi-agent AI workflow: Legal Assistant, Lawyer, Opposing Counsel, Judge",
      "Semantic search using vector embeddings and Pinecone for Indian legal statutes",
      "Containerized with Docker and automated using n8n workflows"
    ]
  },
  {
    id: "wiz-bulb-sync",
    title: "Wiz-Bulb-Sync (Ambient IoT Lighting)",
    category: "iot",
    badge: "Local UDP Protocol",
    icon: "💡",
    status: "Production Ready",
    statusColor: "cyan",
    summary: "IoT ambient synchronization system providing real-time lighting control with smart WiZ bulbs directly over local network UDP protocols.",
    description: "Direct UDP socket communication system enabling ambient screen color syncing, music-reactive lighting, and automated smart illumination without relying on third-party cloud bridges or external internet gateways.",
    architecture: [
      { 
        step: "1", 
        title: "Screen / Audio Capture", 
        desc: "Color sampling & frequency analysis",
        packet: `{
  "capture_source": "primary_display (1920x1080)",
  "subsample_stride": 16,
  "sampling_time_ms": 2.8,
  "dominant_rgb": [56, 189, 248],
  "audio_fft_band": "bass_boost_reactive"
}`,
        designNote: "Sampling every 16th pixel cuts image analysis from 45ms to 2.8ms, allowing fluid ambient room reaction with near-zero CPU footprint."
      },
      { 
        step: "2", 
        title: "UDP Packet Crafting", 
        desc: "Construct WiZ binary JSON datagrams",
        packet: `{
  "method": "setPilot",
  "env": "pro",
  "params": {
    "r": 56,
    "g": 189,
    "b": 248,
    "dimming": 90,
    "speed": 100
  }
}`,
        designNote: "Crafts raw JSON payloads compliant with WiZ smart bulb UDP protocol specification, eliminating HTTP connection overhead."
      },
      { 
        step: "3", 
        title: "LAN Broadcast", 
        desc: "Direct socket delivery to bulb IP (Port 38899)",
        packet: `{
  "socket_type": "AF_INET, SOCK_DGRAM",
  "target_ip": "192.168.1.185",
  "target_port": 38899,
  "socket_timeout_ms": 50,
  "status": "DATAGRAM_SENT"
}`,
        designNote: "Direct point-to-point UDP socket dispatch works over local WiFi even if internet service drops out completely."
      },
      { 
        step: "4", 
        title: "<50ms Sync", 
        desc: "Sub-50ms latency ambient room immersion",
        packet: `{
  "measured_latency_ms": 18.6,
  "packet_loss_pct": 0.0,
  "refresh_frequency_hz": 48
}`,
        designNote: "Sub-50ms roundtrip maintains imperceptible synchronization with high-speed video frames and music transients."
      }
    ],
    techStack: ["Python", "IoT", "Networking", "UDP Sockets", "Hardware Control"],
    github: "https://github.com/ADITYAKUMARSINGH16/Wiz-Bulb-Sync",
    highlights: [
      "Zero-cloud direct LAN communication using raw UDP datagrams",
      "Sub-50ms synchronization latency for dynamic lighting",
      "Custom color presets and circadian schedule management"
    ]
  },
  {
    id: "emotion-detector",
    title: "Emotion Detector (Computer Vision)",
    category: "ai",
    badge: "Deep Learning & Vision",
    icon: "👁️",
    status: "Complete",
    statusColor: "emerald",
    summary: "Real-time computer vision system detecting human emotions using Convolutional Neural Networks (CNN) and facial landmark tracking.",
    description: "Trained on facial expression datasets to classify primary human emotions (Happy, Sad, Angry, Surprised, Neutral) directly through live video feeds with bounding box landmark overlays.",
    architecture: [
      { 
        step: "1", 
        title: "Webcam Frame", 
        desc: "Video stream ingestion via OpenCV",
        packet: `{
  "stream_resolution": "1280x720",
  "capture_fps": 60,
  "color_space": "BGR_TO_GRAYSCALE"
}`,
        designNote: "Direct hardware buffer capture using OpenCV cv2.VideoCapture with optimized thread queue."
      },
      { 
        step: "2", 
        title: "Face Landmark Crop", 
        desc: "Haar cascade / dlib facial localization",
        packet: `{
  "detector": "HaarCascade_FrontalFace_Default",
  "scale_factor": 1.1,
  "min_neighbors": 5,
  "bounding_box": [320, 180, 240, 240]
}`,
        designNote: "Crops and normalizes facial ROI to 48x48 pixel input tensor before feeding to neural classifier."
      },
      { 
        step: "3", 
        title: "CNN Inference", 
        desc: "Deep feature extraction & Softmax scoring",
        packet: `{
  "model_architecture": "4-Layer Conv2D + MaxPool + Dropout",
  "softmax_probabilities": {
    "Happy": 0.78,
    "Neutral": 0.14,
    "Surprised": 0.05,
    "Sad": 0.02,
    "Angry": 0.01
  },
  "top_prediction": "Happy"
}`,
        designNote: "Dropout layers (0.25 & 0.5) prevent overfitting across varying lighting angles and skin tones."
      },
      { 
        step: "4", 
        title: "Live Overlay", 
        desc: "Real-time FPS emotion probability meter",
        packet: `{
  "rendered_fps": 58.4,
  "hud_elements": ["face_box_cyan", "confidence_meter", "emotion_label"]
}`,
        designNote: "Smooth exponential moving average on class probabilities avoids flickering on frame transitions."
      }
    ],
    techStack: ["Python", "OpenCV", "Deep Learning", "CNNs", "TensorFlow"],
    github: "https://github.com/ADITYAKUMARSINGH16/Emotion-Detector",
    highlights: [
      "Real-time video inference at high FPS",
      "Multi-face detection and concurrent emotion probability scoring",
      "Integrated OpenCV visual feedback overlay"
    ]
  },
  {
    id: "omni-downloader",
    title: "OmniDownloader",
    category: "tools",
    badge: "Utility App",
    icon: "📥",
    status: "Stable",
    statusColor: "amber",
    summary: "Multi-platform, high-speed downloader utility for media streams and segmented downloads.",
    description: "A fast desktop utility that handles multithreaded stream chunks, automatic format conversion, and clean download queues with pause/resume support.",
    architecture: [
      { step: "1", title: "Stream URL", desc: "Metadata parsing & chunk discovery" },
      { step: "2", title: "Multi-Threaded Chunks", desc: "Concurrent byte-range requests" },
      { step: "3", title: "Assembly & FFMPEG", desc: "Stitching and audio/video muxing" }
    ],
    techStack: ["Python", "GUI", "Networking", "Multithreading", "Stream Handling"],
    github: "https://github.com/ADITYAKUMARSINGH16/OmniDownloader",
    highlights: [
      "Segmented multi-threaded download acceleration",
      "Automatic media metadata fetching and audio extraction",
      "Clean visual progress monitoring with error recovery"
    ]
  },
  {
    id: "india-interactive-map",
    title: "India Interactive Map",
    category: "web",
    badge: "Web GIS & Visualizer",
    icon: "🗺️",
    status: "Production",
    statusColor: "cyan",
    summary: "Interactive web visualizer showcasing India's states and territories with rich geospatial information.",
    description: "Vector-driven geographic visualization tool built with semantic HTML5, CSS3, and dynamic JavaScript, providing interactive state drills and regional analytics.",
    architecture: [
      { step: "1", title: "SVG Vector Grid", desc: "Optimized geographic vector boundaries" },
      { step: "2", title: "DOM Hover Interactivity", desc: "Instant spotlight & event propagation" },
      { step: "3", title: "Geospatial Data Modal", desc: "Demographic cards & state statistics" }
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "SVG / Geospatial Data"],
    github: "https://github.com/ADITYAKUMARSINGH16/India-Interactive-Map",
    highlights: [
      "Smooth vector SVG state rendering with hover spotlights",
      "Instant demographic and geographical data modal cards",
      "Fully responsive touch & mouse navigation"
    ]
  }
];

export const ADITYA_SKILLS = {
  languages: [
    { name: "Python", role: "AI/ML, FastAPI, Ollama, LangChain, Backend", level: "Primary / Expert" },
    { name: "Java", role: "Object-Oriented Programming & Systems Architecture", level: "Advanced" },
    { name: "JavaScript", role: "Modern ES6+, Dynamic Web & UI Logic", level: "Advanced" },
    { name: "SQL", role: "Relational Queries, Schema Design & Database Management", level: "Intermediate" }
  ],
  aiAndRAG: [
    { name: "Generative AI & LLMs", desc: "Local Ollama models, Gemma, prompt engineering & fine-tuning" },
    { name: "Retrieval-Augmented Generation (RAG)", desc: "Context-aware question answering with zero cloud leaks" },
    { name: "Vector Embeddings & Pinecone", desc: "Semantic indexing and high-dimensional similarity search" },
    { name: "Multi-Agent Systems", desc: "Orchestrating agent collaboration (Lawyer, Judge, Assistant)" },
    { name: "Semantic Search", desc: "Dense text embeddings for deep domain document queries" }
  ],
  systemsAndIot: [
    { name: "FastAPI", desc: "High-performance async Python REST microservices" },
    { name: "Docker", desc: "Containerizing local models and application microservices" },
    { name: "n8n", desc: "Automating document pipelines & agent workflows" },
    { name: "Git & GitHub", desc: "Version control, collaboration, and open-source releases" }
  ],
  webAndTools: [
    { name: "HTML, CSS, JavaScript", desc: "Responsive, accessible, and high-performance user interfaces" },
    { name: "Windows & Linux", desc: "Cross-platform development and terminal system control" },
    { name: "Speech-to-Text & TTS", desc: "Low-latency voice capture, wake words, and synthesis" },
    { name: "OCR & Screen Reading", desc: "Optical character recognition for visual agent ingestion" }
  ]
};
