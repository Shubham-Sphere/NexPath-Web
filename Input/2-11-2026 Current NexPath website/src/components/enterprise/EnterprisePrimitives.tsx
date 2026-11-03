import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Clipboard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { SectionHeadingData } from './enterprise.types';

const isPlaceholder = (s: string) => s.startsWith('{{PLACEHOLDER:');
export function CopyText({children, className}: {children: string; className?: string}) {
 const parts = children.split(/(\{\{PLACEHOLDER:.*?\}\})/g);
 return <span className={className}>{parts.map((part,i) => isPlaceholder(part) ? <span key={i} className="break-words rounded-sm border border-primary/30 bg-primary/10 px-1 font-mono text-xs font-medium text-primary">{part}</span> : part)}</span>;
}
export function Section({id, children, className}: {id?: string; children: ReactNode; className?: string}) { return <section id={id} className={cn('scroll-mt-20 border-b py-16 sm:py-24',className)}><div className="mx-auto max-w-7xl px-5 lg:px-8">{children}</div></section>; }
export function Heading({eyebrow,title,description}: SectionHeadingData) { return <div className="mx-auto max-w-3xl text-center"><span className="inline-block rounded-full border bg-card px-3 py-1 font-mono text-[11px] font-medium text-primary">{eyebrow}</span><h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h2><p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p></div>; }
export function PageLink({href,children,className,onClick}: {href:string;children:ReactNode;className?:string;onClick?:()=>void}) {
 if(isPlaceholder(href)) return <span className={cn('block',className)}>{children}<span className="mt-1 block"><CopyText>{href}</CopyText></span></span>;
 if(href==='/' || href==='/enterprise') return <Link to={href} className={className} onClick={onClick}>{children}</Link>;
 return <a href={href} className={className} onClick={onClick} {...(href.startsWith('https://') ? {target:'_blank',rel:'noopener noreferrer'} : {})}>{children}</a>;
}
export function Brackets({className}: {className?: string}) {
 return <span aria-hidden="true" className={cn('pointer-events-none absolute inset-0',className)}><span className="absolute -left-1 -top-1 size-2.5 border-l-2 border-t-2 border-primary"/><span className="absolute -bottom-1 -right-1 size-2.5 border-b-2 border-r-2 border-primary"/></span>;
}
export function CopyButton({text}: {text:string}) { const [copied,setCopied]=useState(false); async function copy(){try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(()=>setCopied(false),1800); } catch { setCopied(false); }} return <Button variant="ghost" size="icon" title={copied?'Copied':'Copy'} aria-label={copied?'Copied':'Copy'} onClick={copy} className="text-terminal-muted hover:bg-terminal hover:text-terminal-foreground">{copied?<Check/>:<Clipboard/>}</Button>; }
