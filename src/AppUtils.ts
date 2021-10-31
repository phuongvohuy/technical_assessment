// Store App Utils globally
import { History } from 'history';

let appHistory: History;
export const setHistory = (history: History) => {
    appHistory = history;
}

export const getHistory = (): History => {
    return appHistory;
}