// Logical view reconstructed from the project presentation and service documentation.
// Deliberately omits CIDRs, replica counts and the unconfirmed AI network transport.
export function NcpArchitecture() {
  const nodes = [
    { x: 24, y: 148, w: 150, h: 72, title: '사용자', detail: '영화 탐색 · AI 추천' },
    { x: 236, y: 148, w: 166, h: 72, title: 'Public LB', detail: '외부 요청 진입점' },
    { x: 462, y: 148, w: 162, h: 72, title: 'Web', detail: 'Next.js' },
    { x: 676, y: 148, w: 166, h: 72, title: 'Private LB', detail: '내부 요청 분산' },
    { x: 898, y: 124, w: 168, h: 60, title: 'WAS', detail: 'FastAPI · 서비스 API' },
    { x: 898, y: 222, w: 168, h: 60, title: 'ChatBot', detail: 'LangGraph · RAG' },
    { x: 1158, y: 154, w: 190, h: 94, title: 'PostgreSQL', detail: '메타데이터 · pgvector' },
    { x: 24, y: 308, w: 150, h: 66, title: 'KOBIS · KMDB', detail: '영화 공공 API' },
    { x: 236, y: 308, w: 166, h: 66, title: 'NAT Gateway', detail: '외부 API 송신' },
    { x: 462, y: 308, w: 162, h: 66, title: 'Batch', detail: '수집 · 정제 · 적재' },
    { x: 880, y: 442, w: 204, h: 70, title: 'HyperCLOVA X', detail: 'AI API 호출' },
  ];

  return (
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- Inline SVG needs image semantics; img cannot contain its vector content.
    <svg className="ncp-architecture" viewBox="0 0 1600 540" role="img" aria-labelledby="ncp-title ncp-description">
      <title id="ncp-title">Pop Talk NCP 서비스 및 데이터 연결 구성도</title>
      <desc id="ncp-description">사용자 요청은 Public Load Balancer, Web, Private Load Balancer를 거쳐 WAS와 ChatBot으로 전달됩니다. Batch는 NAT Gateway로 KOBIS와 KMDB를 호출해 PostgreSQL에 적재합니다. ChatBot은 PostgreSQL과 HyperCLOVA X API를 사용합니다. 운영 지원에는 Bastion, Cloud Log Analytics와 Object Storage를 사용합니다. IP와 서브넷 크기를 생략한 논리 구성도입니다.</desc>
      <defs>
        <marker id="ncp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#2563eb" /></marker>
        <marker id="ncp-data-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#0f766e" /></marker>
      </defs>
      <rect width="1600" height="540" fill="#fff" />
      <text x="24" y="35" fontSize="24" fontWeight="750" fill="#10243d">서비스 요청과 데이터 처리 흐름</text>
      <text x="1574" y="35" textAnchor="end" fontSize="16" fill="#64748b">논리 구성도 · IP 및 서브넷 크기 생략</text>
      <rect x="208" y="66" width="1164" height="342" rx="14" fill="#f8fafc" stroke="#94a3b8" strokeDasharray="6 4" />
      <text x="226" y="91" fontSize="17" fontWeight="700" fill="#34465c">NAVER Cloud VPC</text>
      <rect x="226" y="108" width="186" height="284" rx="10" fill="#eff6ff" />
      <text x="246" y="132" fontSize="16" fontWeight="700" fill="#1d4ed8">PUBLIC</text>
      <rect x="444" y="108" width="910" height="284" rx="10" fill="#f0fdfa" />
      <text x="462" y="132" fontSize="16" fontWeight="700" fill="#0f766e">PRIVATE</text>

      <g fill="none" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#ncp-arrow)">
        <path d="M174 184 H236" />
        <path d="M402 184 H462" />
        <path d="M624 184 H676" />
        <path d="M842 184 H870 V154 H898" />
        <path d="M842 184 H870 V252 H898" />
        <path d="M1066 154 H1110 V180 H1158" />
        <path d="M1066 252 H1124 V222 H1158" />
        <path d="M982 282 V442" />
      </g>
      <g fill="none" stroke="#0f766e" strokeWidth="2.5" markerEnd="url(#ncp-data-arrow)">
        <path d="M462 341 H402" />
        <path d="M236 341 H174" />
        <path d="M624 341 H970" markerEnd="none" />
        <path d="M994 341 H1253 V248" />
      </g>
      <text x="696" y="329" fontSize="17" fill="#0f766e">정제 데이터 · 임베딩 적재</text>

      {nodes.map((node) => (
        <g key={node.title}>
          <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="9" fill="white" stroke="#9fb3ca" strokeWidth="1.5" />
          <text x={node.x + node.w / 2} y={node.y + node.h / 2 - 4} textAnchor="middle" fontSize="20" fontWeight="700" fill="#10243d">{node.title}</text>
          <text x={node.x + node.w / 2} y={node.y + node.h / 2 + 19} textAnchor="middle" fontSize="15" fill="#536176">{node.detail}</text>
        </g>
      ))}

      <rect x="1394" y="108" width="184" height="284" rx="10" fill="#f1f5f9" />
      <text x="1412" y="137" fontSize="17" fontWeight="700" fill="#34465c">운영 지원</text>
      <text x="1412" y="181" fontSize="18" fontWeight="700" fill="#10243d">Bastion</text>
      <text x="1412" y="204" fontSize="15" fill="#536176">관리 접속</text>
      <text x="1412" y="250" fontSize="18" fontWeight="700" fill="#10243d">Cloud Log</text>
      <text x="1412" y="273" fontSize="15" fill="#536176">Analytics · 운영 로그</text>
      <text x="1412" y="320" fontSize="18" fontWeight="700" fill="#10243d">Object Storage</text>
      <text x="1412" y="343" fontSize="15" fill="#536176">오브젝트 저장</text>
      <path d="M1372 257 H1394" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />

      <path d="M26 461 H65" stroke="#2563eb" strokeWidth="3" markerEnd="url(#ncp-arrow)" />
      <text x="80" y="467" fontSize="17" fill="#34465c">서비스·AI 요청</text>
      <path d="M288 461 H328" stroke="#0f766e" strokeWidth="3" markerEnd="url(#ncp-data-arrow)" />
      <text x="343" y="467" fontSize="17" fill="#34465c">수집 API 호출·적재</text>
      <text x="26" y="503" fontSize="16" fill="#64748b">주요 호출 방향을 표시했으며 응답 경로는 생략했습니다.</text>
    </svg>
  );
}
