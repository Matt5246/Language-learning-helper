import { createTheme } from '@mui/material/styles';
export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
        default: '#1E1E1E',
        paper: '#1E1E1E',
        }
    },
});
export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});