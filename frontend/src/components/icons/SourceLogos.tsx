
import React from 'react';

const AmazonLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 102 30" fill="currentColor" {...props}><path d="M37.2 21.9c-1.3-1-2-2.1-2-3.6 0-2.3 1.4-4.2 4.4-4.2 1.4 0 2.7.4 3.7 1.1v-1h2.8v10.5c0 3-2.1 4.5-5 4.5-2.2 0-4.1-.9-5.3-2.5l2.2-1.5c.7.9 1.5 1.4 2.6 1.4 1.3 0 2-.6 2-1.7V22c-1.2.7-2.5 1.2-3.9 1.2-1.5 0-2.8-.5-3.5-1.3zm1.5-3.3c0 .8.5 1.4 1.6 1.4.9 0 1.9-.4 2.6-1V18c-.7-.5-1.6-.8-2.5-.8-1.2 0-1.7.6-1.7 1.6zM50.6 29h2.9l-4-15H47l-4 15h2.9l.8-2.7h3.6l.7 2.7zm-2.7-4.4l1.3-4.8 1.2 4.8h-2.5zM61.9 23.3c.7.6 1.6 1 2.8 1 1.4 0 2.1-.6 2.1-1.5 0-.9-.5-1.3-2.4-1.8l-1.2-.3c-2.3-.6-3.8-1.9-3.8-4.4 0-2.4 1.9-4.3 4.8-4.3 2.1 0 3.6.7 4.7 1.9l-1.9 1.6c-.7-.7-1.4-1-2.5-1-1.1 0-1.7.5-1.7 1.3 0 .8.4 1.2 2.3 1.7l1.2.3c2.7.6 4 1.9 4 4.5 0 2.6-1.9 4.6-5.2 4.6-2.5 0-4.5-1-5.6-2.2l2.2-1.5zM77.4 14.3h-3.4v10.2h-2.8V14.3h-3.4v-2.3h9.6v2.3zM92.1 24.5c1.6 0 2.6-.9 2.6-2.4V14.3h2.8v7.9c0 3-2 4.7-5.1 4.7-2.3 0-3.9-1-4.8-2.3l2.2-1.4c.5.7 1.2 1.1 2.3 1.1zM0 29V.5h10.2c4 0 6.7 1.1 8.3 3.3 1.5 2 2.3 4.9 2.3 8.3s-.8 6.3-2.3 8.3c-1.6 2.2-4.3 3.3-8.3 3.3H2.8V29H0zm2.8-16.7h6.8c2.8 0 4.6-.6 5.6-1.8 1-1.1 1.5-3 1.5-5.5s-.5-4.4-1.5-5.5c-1-1.2-2.8-1.8-5.6-1.8H2.8v14.6z"/><path d="M96.5 1.1c-.8-.8-2.1-.8-2.9 0-.8.8-.8 2.1 0 2.9.8.8 2.1.8 2.9 0 .8-.8.8-2.1 0-2.9z"/></svg>
);

const YouTubeLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 28 20" fill="currentColor" {...props}><path d="M27.5 3.1s-.3-2.1-1.2-3C25.2.1 24 .1 23.1.1h-1.6c-4.2 0-10.4.1-10.4.1s-6.3 0-10.4-.1H.8C0 0 0 .1 0 .1 0 2.3 0 9.9 0 9.9s0 7.6 0 9.9c0 0 .1.1.8.1h1.6c4.2 0 10.4-.1 10.4-.1s6.3 0 10.4.1h1.6c.9 0 2.1 0 3.2-1.1 1-1 1.2-3 1.2-3s.3-2.2.3-4.4v-5s-.2-2.3-.3-4.4zM11.2 14.4v-9l8.3 4.5-8.3 4.5z"/></svg>
);

const ArticleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4"/><path d="M16 2v4h-4"/><path d="M12 12h4"/><path d="M12 16h4"/><path d="M8 12h.01"/><path d="M8 16h.01"/></svg>
);


interface SourceLogoMatcherProps extends React.SVGProps<SVGSVGElement> {
    source: string;
}

export const SourceLogoMatcher: React.FC<SourceLogoMatcherProps> = ({ source, ...props }) => {
    const s = source.toLowerCase();

    if (s.includes('amazon')) {
        return <AmazonLogo {...props} />;
    }
    if (s.includes('youtube')) {
        return <YouTubeLogo {...props} />;
    }
    // List of typical article/news sources
    const articleSources = ['verge', 'nyt', 'wired', 'national geographic', 'wait but why', 'bon appétit', 'serious eats', 'allrecipes'];
    if (articleSources.some(as => s.includes(as))) {
        return <ArticleIcon {...props} stroke="white" fill="none" />;
    }
    
    // Return null if no match, so no icon is rendered
    return null;
};
