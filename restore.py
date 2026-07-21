import json
import os

log_file = r"C:\Users\jhonm\.gemini\antigravity\brain\d29af1aa-890b-48ad-bd7b-aba03c74fb70\.system_generated\logs\transcript_full.jsonl"
files = {}

with open(log_file, "r", encoding="utf-8") as f:
    for line in f:
        try:
            entry = json.loads(line)
            
            # Check for VIEW_FILE
            if entry.get("type") == "VIEW_FILE" and entry.get("status") == "DONE":
                content = entry.get("content", "")
                if "File Path: `file:///" in content:
                    path_start = content.find("File Path: `file:///") + len("File Path: `file:///")
                    path_end = content.find("`", path_start)
                    filepath = content[path_start:path_end]
                    
                    code_lines = []
                    in_code = False
                    for l in content.split("\n"):
                        if l.startswith("1: "):
                            in_code = True
                        if in_code:
                            parts = l.split(": ", 1)
                            if len(parts) == 2 and parts[0].isdigit():
                                # remove carriage returns
                                code_lines.append(parts[1].replace('\r', ''))
                    if code_lines:
                        basename = filepath.split("/")[-1].lower()
                        files[basename] = "\n".join(code_lines)
            
            # Check for write_to_file
            if entry.get("tool_calls"):
                for tc in entry["tool_calls"]:
                    if tc["name"] == "write_to_file" and "TargetFile" in tc["args"]:
                        target = tc["args"]["TargetFile"].replace('"', '')
                        content = tc["args"].get("CodeContent", "")
                        if isinstance(content, str) and content.startswith('"') and content.endswith('"'):
                            try:
                                content = json.loads(content)
                            except:
                                pass
                        basename = os.path.basename(target).lower()
                        files[basename] = content

        except Exception as e:
            pass

dest_dir = r"c:\Users\jhonm\OneDrive\Desktop\Proyectos\Portafolio\PortafolioGi\PortafolioDEF\src"

targets = ["index.js", "about.js", "projects.js", "experience.js", "education.js", "skills.js", "navbar.js", "footer.js", "hireme.js", "logo.js", "icons.js"]

for name, code in files.items():
    if name in targets:
        # Find where to write it
        if name in ["index.js", "about.js", "projects.js"]:
            out_path = os.path.join(dest_dir, "pages", name)
        else:
            out_path = os.path.join(dest_dir, "components", name)
            
        # Ensure correct casing for output file name
        actual_name = next((t for t in ["index.js", "about.js", "projects.js", "Experience.js", "Education.js", "Skills.js", "Navbar.js", "Footer.js", "HireMe.js", "Logo.js", "Icons.js"] if t.lower() == name), name)
        out_path = out_path.replace(name, actual_name)
        
        with open(out_path, "w", encoding="utf-8") as out:
            out.write(code)
        print("Restored", actual_name)
