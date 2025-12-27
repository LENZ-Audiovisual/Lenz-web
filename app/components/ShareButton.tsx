"use client";

import { Share2, Check, Copy } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  title: string;
  description: string;
}

export default function ShareButton({ title, description }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    // 1. Tenta usar o compartilhamento nativo do celular (WhatsApp, Instagram, etc)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: url,
        });
        return;
      } catch (err) {
        console.log("Usuário cancelou o compartilhamento");
      }
    }

    // 2. Se estiver no PC ou o nativo falhar, copia o Link
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Volta ao normal após 3s
    } catch (err) {
      console.error("Erro ao copiar link", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 text-sm font-bold text-white hover:text-purple-400 transition-all active:scale-95"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-500" />
          <span className="text-green-500">LINK COPIADO!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          COMPARTILHAR
        </>
      )}
    </button>
  );
}