import * as symbolProvider from './generic/symbolProvider';
import sections from '../symbols/sections';

export const sectionCompletionProvider = symbolProvider.buildSymbolCompletionProvider(sections, '%');
export const sectionHoverProvider = symbolProvider.buildSymbolHoverProvider(sections);