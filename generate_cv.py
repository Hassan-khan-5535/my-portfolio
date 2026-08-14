from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        # We don't necessarily need a header, let's keep it clean
        pass

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}}', align='C')

pdf = PDF()
pdf.add_page()
pdf.set_margins(15, 15, 15)

# Name
pdf.set_font("helvetica", "B", 18)
pdf.cell(0, 8, "HASSAN KHAN", new_x="LMARGIN", new_y="NEXT", align="C")

# Contact info
pdf.set_font("helvetica", "", 10)
pdf.cell(0, 5, "Software Engineering Student | Full-Stack & AI Development", new_x="LMARGIN", new_y="NEXT", align="C")
pdf.cell(0, 5, "Swabi, Pakistan | 03359217458 | khanhassy321@gmail.com", new_x="LMARGIN", new_y="NEXT", align="C")
pdf.cell(0, 5, "LinkedIn: linkedin.com/in/hassan-khan-se | GitHub: github.com/Hassan-khan-5535", new_x="LMARGIN", new_y="NEXT", align="C")
pdf.cell(0, 5, "Portfolio: hassan-khan-5535.github.io/my-portfolio/", new_x="LMARGIN", new_y="NEXT", align="C")
pdf.ln(5)

def add_section_header(title):
    pdf.set_font("helvetica", "B", 12)
    pdf.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT", align="L")
    pdf.line(pdf.get_x(), pdf.get_y(), pdf.get_x() + 180, pdf.get_y())
    pdf.ln(2)

def add_paragraph(text, bold=False):
    style = "B" if bold else ""
    pdf.set_font("helvetica", style, 10)
    pdf.multi_cell(0, 5, text, new_x="LMARGIN", new_y="NEXT", align="L")
    pdf.ln(2)

add_section_header("PROFESSIONAL SUMMARY")
add_paragraph("Software Engineering student at COMSATS University Islamabad, Abbottabad Campus, with a 3.4 CGPA and a strong foundation in programming, data structures, databases, artificial intelligence, and software engineering. Developed academic projects spanning AI, computer vision/OCR, database applications, and JavaFX software. Proficient in C++, C, Java, Python, JavaScript, HTML, CSS, SQL, Git, and GitHub, with hands-on experience integrating Gemini and Grok APIs. Currently expanding into MERN and modern full-stack development.")

add_section_header("EDUCATION")
pdf.set_font("helvetica", "B", 10)
pdf.cell(0, 5, "Bachelor of Science in Software Engineering - COMSATS University Islamabad, Abbottabad Campus", new_x="LMARGIN", new_y="NEXT", align="L")
pdf.set_font("helvetica", "", 10)
pdf.cell(0, 5, "2024-2028 | CGPA: 3.4/4.0", new_x="LMARGIN", new_y="NEXT", align="L")
pdf.ln(2)
pdf.set_font("helvetica", "B", 10)
pdf.write(5, "Relevant Coursework: ")
pdf.set_font("helvetica", "", 10)
pdf.write(5, "Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Artificial Intelligence, Operating Systems, Computer Networks, Programming Fundamentals, Software Engineering, Professional Practices, Discrete Structures")
pdf.ln(7)

add_section_header("TECHNICAL SKILLS")
def add_skill(name, details):
    pdf.set_font("helvetica", "B", 10)
    pdf.write(5, name + ": ")
    pdf.set_font("helvetica", "", 10)
    pdf.write(5, details)
    pdf.ln(6)

add_skill("Languages", "C, C++, Java, Python, JavaScript, SQL")
add_skill("Web / Full-Stack", "HTML5, CSS3, JavaScript, full-stack application development; currently learning MERN, React, Node.js, Express.js, MongoDB")
add_skill("AI / APIs", "Google Gemini Vision API, xAI/Grok API, LLM/API integration, AI-assisted application development")
add_skill("Computer Vision / Data", "OpenCV, NumPy, pyzbar, EasyOCR, pandas, openpyxl, Streamlit")
add_skill("Databases", "MySQL, SQL, JDBC")
add_skill("Tools", "Git, GitHub, VS Code, Python dotenv")
add_skill("Core Concepts", "OOP, DSA, MVC, REST/API concepts, database connectivity, software engineering fundamentals")
pdf.ln(2)

add_section_header("SELECTED PROJECTS")
def add_project(title, details, bullets, link=None):
    pdf.set_font("helvetica", "B", 10)
    pdf.cell(0, 5, title, new_x="LMARGIN", new_y="NEXT", align="L")
    pdf.set_font("helvetica", "I", 10)
    pdf.cell(0, 5, details, new_x="LMARGIN", new_y="NEXT", align="L")
    pdf.set_font("helvetica", "", 10)
    for bullet in bullets:
        pdf.multi_cell(0, 5, f"- {bullet}", new_x="LMARGIN", new_y="NEXT", align="L")
    if link:
        pdf.set_font("helvetica", "B", 10)
        pdf.write(5, "GitHub: ")
        pdf.set_font("helvetica", "", 10)
        pdf.write(5, link)
        pdf.ln(5)
    pdf.ln(3)

add_project("Automated Quiz Scanner & Grading System", "Python, OpenCV, NumPy, pyzbar, Google Gemini Vision API, EasyOCR, pandas, openpyxl, Streamlit", [
    "Built an AI-powered quiz scanning and grading application that processes bubble sheets, decodes QR-based answer keys, and extracts handwritten student information.",
    "Integrated Gemini 2.5 Flash for handwritten text recognition with EasyOCR as a fallback, and added batch processing with CSV/Excel report export.",
    "Developed a browser-based interface in Streamlit and managed configuration securely with python-dotenv."
], "https://github.com/Hassan-khan-5535/quiz-scanner-and-grading-system")

add_project("Othello / Reversi - Two-Player AI Game", "Java, JavaFX, CSS, OOP, MVC, AI/heuristic algorithms", [
    "Developed a fully functional Othello/Reversi game with Player vs Player and Player vs Computer modes.",
    "Implemented move validation across eight directions, turn handling, score tracking, undo using a stack, and an AI opponent using a board-position heuristic strategy.",
    "Applied MVC architecture to separate model, view, and controller responsibilities and built a custom JavaFX/CSS interface."
], "https://github.com/Hassan-khan-5535/Othello-Reversi")

add_project("EchoAgent - Voice-Native AI Assistant", "Python, FastAPI, React, Claude API, faster-whisper, SQLite, Tailwind CSS", [
    "Developed a bilingual (English & Urdu) voice-native agentic AI assistant capable of reasoning and executing real-world tool calls via Anthropic Claude.",
    "Engineered an ultra-low latency voice pipeline using CPU-optimized faster-whisper (STT) and native edge-tts (TTS).",
    "Built a real-time web UI using React and Vite, featuring visible reasoning traces and cross-session memory backed by SQLite."
], "https://github.com/Hassan-khan-5535/echoagent")

add_section_header("CERTIFICATIONS")
certs = [
    "Web Development Internship & Training Program - Arch Technologies | May 2026",
    "Agile Project Management - HP LIFE | May 2026",
    "Introduction to Cybersecurity Awareness - HP LIFE | February 2026",
    "Introduction to Modern AI - Cisco Networking Academy | February 2026"
]
for c in certs:
    pdf.set_font("helvetica", "", 10)
    pdf.cell(0, 5, f"- {c}", new_x="LMARGIN", new_y="NEXT", align="L")
pdf.ln(4)

add_section_header("ADDITIONAL EXPERIENCE & INTERESTS")
exp = [
    "Hands-on experience integrating external AI/LLM APIs, including Google Gemini and xAI/Grok, into software projects.",
    "Actively developing skills in MERN stack development and modern AI-powered applications.",
    "Career interests: Software Engineering, Full-Stack/MERN Development, AI-powered Applications, API Integration, and Freelance Development."
]
for e in exp:
    pdf.set_font("helvetica", "", 10)
    pdf.multi_cell(0, 5, f"- {e}", new_x="LMARGIN", new_y="NEXT", align="L")
pdf.ln(4)

add_section_header("LANGUAGES & CAREER TARGET")
pdf.set_font("helvetica", "B", 10)
pdf.write(5, "Languages: ")
pdf.set_font("helvetica", "", 10)
pdf.write(5, "English - Professional | Urdu - Professional")
pdf.ln(6)
pdf.set_font("helvetica", "B", 10)
pdf.write(5, "Target: ")
pdf.set_font("helvetica", "", 10)
pdf.write(5, "Software Engineering Internship | Full-Stack Developer Internship | MERN Developer | Freelance Developer | Remote")
pdf.ln(6)

pdf.output("Hassan_Khan_CV.pdf")
