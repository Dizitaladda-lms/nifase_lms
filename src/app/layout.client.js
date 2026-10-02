"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const StockLoader = dynamic(() => import("@/components/Home/StockLoader"), { ssr: false });

if (typeof window !== "undefined" && !window.__reactDomPatchApplied) {
  window.__reactDomPatchApplied = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console) console.warn("Prevented React removeChild crash due to DOM mutation", child, this);
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console) console.warn("Prevented React insertBefore crash due to DOM mutation", referenceNode, this);
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (typeof window !== 'undefined' && window.__hideSplash) window.__hideSplash();
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <StockLoader />}
      <div style={{ filter: loading ? 'blur(2px)' : 'none', pointerEvents: loading ? 'none' : 'auto' }}>
        {children}
      </div>
    </>
  );
}