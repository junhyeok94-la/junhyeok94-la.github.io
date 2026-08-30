'use client';

import { useEffect, useRef } from 'react';

export function LangGraphFlowEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  function handleLoad() {
    cleanupRef.current?.();

    const iframe = iframeRef.current;
    const frameWindow = iframe?.contentWindow;
    const document = iframe?.contentDocument;
    if (!iframe || !frameWindow || !document) return;

    const syncHeight = () => {
      const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      iframe.style.height = `${Math.ceil(height)}px`;
    };

    const positionOpenModal = () => {
      const overlay = document.querySelector<HTMLElement>('#overlay.open');
      const modal = document.querySelector<HTMLElement>('#modal');
      if (!overlay || !modal) return;

      const frameRect = iframe.getBoundingClientRect();
      const visibleTop = Math.max(0, Math.min(frameRect.height, -frameRect.top));
      const visibleBottom = Math.max(0, Math.min(frameRect.height, window.innerHeight - frameRect.top));
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const modalHeight = Math.min(modal.scrollHeight, Math.max(320, window.innerHeight - 32));

      overlay.style.alignItems = 'flex-start';
      modal.style.maxHeight = `${Math.max(320, window.innerHeight - 32)}px`;
      modal.style.marginTop = `${visibleTop + Math.max(16, (visibleHeight - modalHeight) / 2)}px`;
    };

    const mutationObserver = new MutationObserver(() => {
      syncHeight();
      positionOpenModal();
    });
    mutationObserver.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

    const resizeObserver = new ResizeObserver(syncHeight);
    resizeObserver.observe(document.body);

    window.addEventListener('scroll', positionOpenModal, { passive: true });
    window.addEventListener('resize', positionOpenModal);
    frameWindow.addEventListener('resize', syncHeight);

    syncHeight();
    frameWindow.requestAnimationFrame(syncHeight);

    cleanupRef.current = () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', positionOpenModal);
      window.removeEventListener('resize', positionOpenModal);
      frameWindow.removeEventListener('resize', syncHeight);
    };
  }

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.addEventListener('load', handleLoad);
    if (iframe.contentDocument?.readyState === 'complete') handleLoad();

    return () => {
      iframe.removeEventListener('load', handleLoad);
      cleanupRef.current?.();
    };
  }, []);

  return (
    <div className="agent-flow-source">
      <iframe
        ref={iframeRef}
        src="/projects/pop-talk/langgraph-flow.html"
        title="Pop Talk Chatbot LangGraph 원본 노드 흐름도"
      />
      <div className="agent-flow-source-footer">
        <span>ORIGINAL INTERACTIVE FLOW · 17 NODES</span>
        <a href="/projects/pop-talk/langgraph-flow.html" target="_blank" rel="noreferrer">전체 화면으로 보기 ↗</a>
      </div>
    </div>
  );
}
