import * as symbolProvider from './generic/symbolProvider';
import constants from '../symbols/constants';

export const constantCompletionProvider = symbolProvider.buildSymbolCompletionProvider(constants, '$');
export const constantHoverProvider = symbolProvider.buildSymbolHoverProvider(constants);