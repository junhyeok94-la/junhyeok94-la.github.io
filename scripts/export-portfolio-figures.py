"""Export the already reviewed, non-identifying portfolio diagrams for web case studies."""
from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
source = root / 'documents/portfolio-archive/index.html'
svgs = re.findall(r'<svg\b[\s\S]*?</svg>', source.read_text(encoding='utf-8'))
figures = [
    (2, 'gs-retail-hbu/interval-recovery.svg', 'Airflow Variable'),
    (3, 'gs-retail-hbu/workload-isolation.svg', 'Serverless'),
    (4, 'gs-retail-hbu/orchestration.svg', 'Control DAG'),
    (5, 'gs-retail-hbu/quality-check.svg', 'Diff Check'),
    (6, 'gs-retail-hbu/monitoring.svg', 'Grafana'),
    (7, 'next-kics/data-standard.svg', 'BLOB'),
    (8, 'lgchem-data-lake/loading-strategy.svg', 'Incremental'),
    (9, 'local-finance/data-model.svg', 'One-Table'),
]
style = '<style>text{font-family:"Noto Sans KR", "Malgun Gothic", sans-serif;fill:#1b2933;font-weight:550}.sub{fill:#637079;font-weight:420}.blue-text{fill:#264ce4;font-weight:650}</style>'
for index, filename, expected in figures:
    svg = svgs[index]
    if expected not in svg:
        raise ValueError(f'Unexpected source diagram: {filename}')
    if 'xmlns=' not in svg.split('>')[0]:
        svg = svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ', 1)
    start = svg.index('>') + 1
    svg = svg[:start] + style + svg[start:]
    target = root / 'public/projects' / filename
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(svg, encoding='utf-8')
    print(target.relative_to(root))
