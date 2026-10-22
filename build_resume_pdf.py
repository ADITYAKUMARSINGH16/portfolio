"""
Aditya Kumar Singh - Official Engineering Resume PDF Generator
Uses ReportLab to compile an ATS-compliant, 1-page high-density technical resume.
Outputs: assets/Aditya_Kumar_Singh_Resume.pdf and assets/Aditya_Resume.pdf
"""

import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_resume():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(base_dir, "assets")
    os.makedirs(assets_dir, exist_ok=True)

    output_pdf = os.path.join(assets_dir, "Aditya_Kumar_Singh_Resume.pdf")
    alias_pdf = os.path.join(assets_dir, "Aditya_Resume.pdf")

    # Document setup: 1-page ATS layout with compact margins
    doc = SimpleDocTemplate(
        output_pdf,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    story = []
    styles = getSampleStyleSheet()

    # Color Palette
    PRIMARY = colors.HexColor("#0f172a")       # Deep slate
    ACCENT = colors.HexColor("#0284c7")        # Cyan/Sky blue
    TEXT_DARK = colors.HexColor("#1e293b")     # Charcoal body text
    TEXT_MUTED = colors.HexColor("#475569")    # Subtitle / dates
    LINE_COLOR = colors.HexColor("#cbd5e1")    # Divider line

    # Custom Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=22,
        textColor=PRIMARY,
        alignment=1
    )

    tagline_style = ParagraphStyle(
        'Tagline',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=11,
        textColor=ACCENT,
        alignment=1
    )

    contact_style = ParagraphStyle(
        'ContactBar',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10,
        textColor=TEXT_DARK,
        alignment=1
    )

    sec_heading_style = ParagraphStyle(
        'SectionHeading',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=12,
        textColor=PRIMARY,
        spaceBefore=0,
        spaceAfter=0
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=TEXT_DARK
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.2,
        leading=10.5,
        textColor=TEXT_DARK,
        leftIndent=10
    )

    # 1. Header: Name & Target Role
    story.append(Paragraph("ADITYA KUMAR SINGH", title_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("AI &amp; MACHINE LEARNING ENGINEER &bull; AUTONOMOUS SYSTEMS &amp; RAG ARCHITECTURE", tagline_style))
    story.append(Spacer(1, 4))

    # Contact & Profiles Bar
    contact_text = (
        "(+91) 7273963985 &bull; <b>singhaditya7864@gmail.com</b> &bull; "
        "<a href='https://github.com/ADITYAKUMARSINGH16'>github.com/ADITYAKUMARSINGH16</a> &bull; "
        "<a href='https://www.linkedin.com/in/aditya-kumar-singh-7a439b315/'>linkedin.com/in/aditya-kumar-singh-7a439b315</a> &bull; "
        "Kolkata / Katihar, India"
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 5))
    story.append(HRFlowable(width="100%", thickness=1, color=PRIMARY, spaceBefore=0, spaceAfter=4))

    # Helper function for Section Headers
    def add_section_header(title):
        story.append(Paragraph(title.upper(), sec_heading_style))
        story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=2, spaceAfter=4))

    # 2. Executive Summary
    add_section_header("Professional Summary")
    summary_text = (
        "Motivated Computer Science and Business Systems undergraduate with hands-on experience in architecting "
        "AI-powered applications utilizing <b>Python, FastAPI, Ollama, LangChain, Retrieval-Augmented Generation (RAG), and Docker</b>. "
        "Specialized in local air-gapped LLM inference, multi-agent reasoning, sub-50ms IoT UDP networking, and computer vision pipelines. "
        "Passionate about building production-grade autonomous intelligence systems."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # 3. Technical Arsenal
    add_section_header("Technical Arsenal")
    skills_data = [
        [
            Paragraph("<b>Core Languages:</b>", body_style),
            Paragraph("Python, Java, JavaScript (ES6+ Modules), SQL, HTML5, CSS3", body_style)
        ],
        [
            Paragraph("<b>AI &amp; Machine Learning:</b>", body_style),
            Paragraph("Local LLMs (Ollama, Gemma, LLaMA), RAG, LangChain, Embeddings, Multi-Agent Workflows, PyTorch, OpenCV", body_style)
        ],
        [
            Paragraph("<b>Backend &amp; DevOps:</b>", body_style),
            Paragraph("FastAPI, RESTful APIs, Docker, n8n Workflow Automation, Pinecone Vector DB, SQLite, Git, GitHub CI", body_style)
        ],
        [
            Paragraph("<b>Networking &amp; Systems:</b>", body_style),
            Paragraph("Socket Programming (UDP/TCP broadcast), Asynchronous I/O (asyncio), Web Audio API, PWA Service Workers", body_style)
        ]
    ]
    skills_table = Table(skills_data, colWidths=[120, 420])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 4))

    # 4. Featured Projects
    add_section_header("Key Engineering Projects")

    # Project 1: AURA
    aura_title = "<b>AURA: Autonomous AI Voice Assistant &amp; Tactical Station</b> | <i>Python, FastAPI, Ollama, Gemma, PyAudio</i>"
    story.append(Paragraph(aura_title, body_style))
    story.append(Paragraph("&bull; Engineered an end-to-end autonomous desktop assistant integrating local voice synthesis (Edge-TTS), speech recognition, and OCR screen reading.", bullet_style))
    story.append(Paragraph("&bull; Implemented asynchronous multi-threaded pipeline with sub-500ms voice turnarounds using Ollama local LLM inference (Gemma:2b-instruct).", bullet_style))
    story.append(Paragraph("&bull; Built a real-time Tactical HUD interface displaying live system telemetry (CPU, RAM, GPU load, network state) and audio waveform feedback.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 2: Nyaya AI
    nyaya_title = "<b>Nyaya AI: Offline Air-Gapped Legal Intelligence Assistant</b> | <i>Python, Ollama, LangChain, RAG, Docker, n8n</i>"
    story.append(Paragraph(nyaya_title, body_style))
    story.append(Paragraph("&bull; Architected a 100% offline air-gapped legal research system for Indian legal statutes, case law precedents, and IPC/BNS query resolution.", bullet_style))
    story.append(Paragraph("&bull; Designed a vector embedding pipeline using Ollama embeddings and Pinecone/chroma local vector store with multi-agent validation.", bullet_style))
    story.append(Paragraph("&bull; Orchestrated automated statutory document ingestion pipelines via Dockerized n8n webhooks and FastAPI microservice backends.", bullet_style))
    story.append(Spacer(1, 3))

    # Project 3: Wiz-Bulb-Sync
    wiz_title = "<b>Wiz-Bulb-Sync: Ambient IoT UDP Socket Lighting Automation</b> | <i>Python, UDP Sockets, WiZ Protocol, Sub-50ms Sync</i>"
    story.append(Paragraph(wiz_title, body_style))
    story.append(Paragraph("&bull; Developed low-latency local UDP network controller communicating directly with smart WiZ bulbs over Wi-Fi without cloud dependencies.", bullet_style))
    story.append(Paragraph("&bull; Achieved sub-50ms screen color synchronization using OpenCV/Pillow frame sampling and direct JSON-over-UDP broadcast payloads.", bullet_style))
    story.append(Paragraph("&bull; Created multi-light room mesh profiles, circadian rhythmic temperature transitions, and automated system tray management.", bullet_style))
    story.append(Spacer(1, 4))

    # 5. Education
    add_section_header("Education")
    edu_data = [
        [
            Paragraph("<b>B.Tech in Computer Science and Business Systems (CSBS)</b><br/>Techno India University &bull; Kolkata, West Bengal", body_style),
            Paragraph("<b>Aug 2022 – July 2026</b><br/>CGPA: <b>7.54 / 10.0</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>Higher Secondary School (Class XII - Science)</b><br/>A. A. M. Children’s Academy &bull; Katihar, Bihar", body_style),
            Paragraph("<b>Aug 2019 – July 2021</b><br/>Score: <b>65.8%</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>Secondary School (Class X)</b><br/>R. K. M. Vidya Mandir &bull; Katihar, Bihar", body_style),
            Paragraph("<b>Aug 2017 – May 2019</b><br/>Score: <b>63.8%</b>", ParagraphStyle('RAlign', parent=body_style, alignment=2))
        ]
    ]
    edu_table = Table(edu_data, colWidths=[380, 160])
    edu_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(edu_table)
    story.append(Spacer(1, 4))

    # 6. Certifications & Competitive Coding
    add_section_header("Certifications &amp; Achievements")
    cert_text = (
        "&bull; <b>Cybersecurity Virtual Internship</b> &ndash; EduSkills (Supported by Palo Alto Networks) [May &ndash; July 2023]<br/>"
        "&bull; <b>Android Developer Virtual Internship</b> &ndash; EduSkills (Supported by Google for Developers) [Sep &ndash; Nov 2023]<br/>"
        "&bull; <b>Networking Virtual Internship</b> &ndash; EduSkills (Supported by Juniper Networks) [Jan &ndash; Mar 2024]<br/>"
        "&bull; <b>Competitive Programming Profiles:</b> "
        "<a href='https://leetcode.com/u/singhaditya7864/'>LeetCode (singhaditya7864)</a> &bull; "
        "<a href='https://www.geeksforgeeks.org/profile/singhaditya7864'>GeeksforGeeks (singhaditya7864)</a>"
    )
    story.append(Paragraph(cert_text, bullet_style))

    # Build Document
    doc.build(story)
    shutil.copyfile(output_pdf, alias_pdf)
    size_kb = os.path.getsize(output_pdf) / 1024
    print(f"[SUCCESS] Resume generated: {output_pdf} ({size_kb:.1f} KB)")
    print(f"[SUCCESS] Alias copied: {alias_pdf}")

if __name__ == "__main__":
    generate_resume()
