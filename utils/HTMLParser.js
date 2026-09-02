import parse from 'html-react-parser';

export function HTMLParser(htmlString) {
    if (!htmlString) return null;
    return parse(htmlString);
}