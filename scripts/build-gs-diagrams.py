"""Build public diagrams from reviewed concepts; never reads private operating guides."""
from pathlib import Path
from html import escape
import base64
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/projects/gs-retail-hbu'
ICONS=OUT/'icons'

def svg(desc,height):
 return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1100 {height}" role="img" aria-label="{escape(desc)}"><style>text{{font-family:"Noto Sans KR","Malgun Gothic",sans-serif;fill:#152335}}.label{{font-size:22px;font-weight:700}}.detail{{font-size:18px;fill:#536277}}.section{{font-size:20px;font-weight:700;fill:#38648a}}</style><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10" fill="#64788d"/></marker></defs><rect width="1100" height="{height}" fill="white"/>']

def text(a,x,y,t,cls='detail',anchor='middle'):
 a.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" class="{cls}">{escape(t)}</text>')

def icon(a,name,x,y,size=42):
 f=next(ICONS.glob('Arch_'+name+'_64.svg'))
 uri='data:image/svg+xml;base64,'+base64.b64encode(f.read_bytes()).decode()
 a.append(f'<image x="{x}" y="{y}" width="{size}" height="{size}" href="{uri}"/>')

def box(a,x,y,w,h,title,lines=(),service=None,accent=False):
 a.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{"#eef5ff" if accent else "#f8fafc"}" stroke="#c4cfda"/>')
 if service:
  icon(a,service,x+w/2-21,y+14)
  ty=y+85
 else:ty=y+35
 text(a,x+w/2,ty,title,'label')
 for i,t in enumerate(lines):text(a,x+w/2,ty+29+i*27,t)

def arrow(a,path,dashed=False):
 a.append(f'<path d="{path}" fill="none" stroke="#64788d" stroke-width="2" {"stroke-dasharray=\"6 5\"" if dashed else ""} marker-end="url(#arrow)"/>')

a=svg('STG는 원천 수집과 S3 적재 후 dbt Bash로 Redshift 테이블 생성. Mart, BI, IF는 Cosmos와 dbt로 변환.',650)
icon(a,'AWS-Fargate',320,16,40)
text(a,570,42,'Airflow · ECS Fargate','label')
text(a,570,73,'실행 주기 · 선행 완료 · 처리 구간 관리')
a.append('<rect x="16" y="109" width="1068" height="235" rx="10" fill="#f4f8fc" stroke="#d5dfe8"/>')
text(a,36,143,'01  STG 수집·적재 — 수집 도구 + dbt Bash 실행','section','start')
box(a,36,169,150,150,'원천 DB',['추출 대상'])
box(a,226,169,175,150,'수집 API',['EMR 분산 처리'],'Amazon-EMR')
box(a,441,169,150,150,'Amazon S3',['1차 적재'],'Amazon-Simple-Storage-Service')
box(a,631,169,190,150,'dbt · Bash',['S3 데이터로','STG 모델 생성'])
box(a,861,169,200,150,'Redshift STG',['2차 적재'],'Amazon-Redshift',True)
for x in [186,401,591,821]:arrow(a,f'M{x} 244H{x+40}')
a.append('<rect x="16" y="374" width="1068" height="235" rx="10" fill="#f6f9f7" stroke="#d5e2d8"/>')
text(a,36,408,'02  Mart·BI·IF 변환 — Cosmos DbtTaskGroup 실행','section','start')
box(a,36,434,200,150,'Redshift STG',['수집·정제 데이터'],'Amazon-Redshift')
box(a,286,434,220,150,'Cosmos · dbt',['태그로 모델 선택','모델 의존성 반영'])
box(a,556,434,240,150,'Mart · BI · IF',['가공·집계·연계 데이터'],'Amazon-Redshift',True)
box(a,846,434,215,150,'데이터 활용',['분석 · BI','외부 시스템 연계'])
for start,end in [(236,286),(506,556),(796,846)]:arrow(a,f'M{start} 509H{end}')
text(a,550,638,'대표 처리 흐름 · 실제 실행 순서는 DAG와 모델별 선행 의존성에 따라 결정')
a.append('</svg>');(OUT/'platform-overview.svg').write_text(''.join(a),encoding='utf-8')

a=svg('dev 브랜치의 Bamboo 개발 배포와 검증 후 dev를 prd에 병합하고 Bamboo 운영 배포. 배포 시 dbt parse, 실행 시 dbt run/test.',640)
text(a,30,35,'01  개발 배포','section','start')
box(a,30,65,270,135,'Bitbucket · dev',['모델 · DAG 변경'])
box(a,415,65,255,135,'Bamboo · DEV',['dbt parse · 산출물 생성','코드 · manifest 배포'])
box(a,785,65,285,135,'개발 환경',['DAG 반영 · 실행 검증'],'AWS-Fargate')
arrow(a,'M300 132H415');arrow(a,'M670 132H785')
arrow(a,'M928 200V270H165V335')
text(a,550,256,'개발 배포·검증 후 dev → prd 병합','label')
text(a,30,319,'02  운영 배포','section','start')
box(a,30,335,270,135,'Bitbucket · prd',['검증한 변경사항 병합'])
box(a,415,335,255,135,'Bamboo · PRD',['dbt parse · 산출물 생성','코드 · manifest 배포'])
box(a,785,335,285,135,'운영 환경',['DAG 반영 · 배치 실행'],'AWS-Fargate')
arrow(a,'M300 402H415');arrow(a,'M670 402H785')
a.append('<rect x="30" y="518" width="1040" height="94" rx="8" fill="#eef5ff"/>')
text(a,550,554,'환경별 dbt 배포 → Airflow DAG 배포 → 반영 확인','label')
text(a,550,586,'배포 단계: dbt parse로 manifest 생성  /  데이터 처리: 스케줄 실행 시 dbt run · test')
a.append('</svg>');(OUT/'delivery-flow.svg').write_text(''.join(a),encoding='utf-8')
print('Rebuilt STG / downstream and sequential dev → prd delivery diagrams')
