"""Public logical diagrams only; no private PDF is read or copied."""
from pathlib import Path
from html import escape
OUT=Path(__file__).resolve().parents[1]/'public/projects/next-kics'

def svg(desc,h):
 return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 {h}" role="img" aria-label="{escape(desc)}"><style>text{{font-family:"Noto Sans KR","Malgun Gothic",sans-serif;fill:#152335}}.label{{font-size:22px;font-weight:700}}.detail{{font-size:18px;fill:#536277}}</style><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10" fill="#64788d"/></marker></defs><rect width="1100" height="{h}" fill="white"/>']
def text(a,x,y,t,cls='detail'):
 a.append(f'<text x="{x}" y="{y}" text-anchor="middle" class="{cls}">{escape(t)}</text>')
def box(a,x,y,w,h,title,lines=(),blue=False):
 a.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{"#eef5ff" if blue else "#f8fafc"}" stroke="#c4cfda"/>')
 text(a,x+w/2,y+36,title,'label')
 for i,t in enumerate(lines):text(a,x+w/2,y+68+i*28,t)
def arrow(a,p):a.append(f'<path d="{p}" fill="none" stroke="#64788d" stroke-width="2" marker-end="url(#arrow)"/>')
def save(a,name):a.append('</svg>');(OUT/name).write_text(''.join(a),encoding='utf-8')

a=svg('기관별 원천 데이터를 TeraStream ETL로 수집·적재하고 SBP Hadoop·Hive 플랫폼에서 분석 데이터 구성. 외부 법령정보는 Python으로 연계. 대시보드 설계 문서는 MSTR 개발 담당자에게 전달.',570)
for x,t in [(130,'원천'),(400,'수집 · 전처리'),(695,'저장 · 처리'),(975,'활용')]:text(a,x,50,t,'label')
box(a,30,120,200,210,'기관별 원천',['검찰청','경찰청','해양경찰청','법무부'])
box(a,290,150,220,150,'TeraStream',['추출 · 변환 · 적재','ETL 공통 규칙'],True)
box(a,570,150,250,180,'LG CNS SBP',['Hadoop · Hive','저장 · 처리 · 분석','분석용 데이터 구성'])
box(a,880,150,190,180,'대시보드 활용',['MSTR','별도 개발 담당자','화면 구현'])
for st,en in [(230,290),(510,570),(820,880)]:arrow(a,f'M{st} 225H{en}')
box(a,30,390,200,115,'외부 법령정보',['API 신규 수집'])
box(a,290,390,220,115,'Python',['메타데이터 판단','전처리 · 적재'],True)
arrow(a,'M230 448H290');arrow(a,'M510 448H695V330')
text(a,550,548,'기관별 적용 흐름과 도구 역할을 표현한 논리도 · 실제 기관 간 데이터 공유·물리 연결은 생략')
save(a,'platform-architecture.svg')

a=svg('데이터플랫폼 사업은 데이터플랫폼 구축과 지능형 사건처리지원 서비스로 구분. 본인은 데이터플랫폼 구축의 파이프라인과 표준, 3개 기관 대시보드 화면 설계 담당.',450)
box(a,380,25,340,80,'데이터플랫폼 사업')
arrow(a,'M550 105V135H280V170');arrow(a,'M550 135H820V170')
box(a,25,170,510,225,'데이터플랫폼 구축',['데이터레이크 · 사용자포털 · 시각화','본인: 데이터 파이프라인 · 공통 표준','3개 기관 대시보드 화면 설계'],True)
box(a,565,170,510,225,'지능형 사건처리지원 서비스',['지능형 서비스 · 분석과제 발굴 등','별도 수행 영역'])
save(a,'project-scope.svg')

a=svg('검찰청·경찰청·해양경찰청 대시보드 화면을 설계하고 문서를 작성한 후 별도 MSTR 개발 담당자에게 인계.',335)
box(a,20,15,1060,75,'설계 대상: 검찰청 · 경찰청 · 해양경찰청')
box(a,20,145,220,120,'화면 설계',['본인 수행'],True)
box(a,300,145,220,120,'설계 문서 작성',['본인 수행'],True)
box(a,580,145,220,120,'문서 인계',['1차 설계 완료 후'],True)
box(a,860,145,220,120,'MSTR 화면 개발',['인계받은 담당자 수행'])
for st,en in [(240,300),(520,580),(800,860)]:arrow(a,f'M{st} 205H{en}')
text(a,550,315,'본인 산출물: 화면 설계 문서 · 실제 화면 구현은 MSTR 개발 담당자가 수행')
save(a,'dashboard-handoff.svg')
print('Created 3 KICS public logical diagrams')
