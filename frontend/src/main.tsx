import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/outfit/700.css'
import '@fontsource/hind-siliguri/400.css'
import '@fontsource/hind-siliguri/600.css'
import '@fontsource/hind-siliguri/700.css'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFFFFF', // Pure White
        },
        background: {
            default: '#000000', // Pure Black
            paper: '#000000',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#BBBBBB',
        },
        divider: '#FFFFFF',
        action: {
            active: '#FFFFFF',
            hover: 'rgba(255, 255, 255, 0.1)',
            selected: 'rgba(255, 255, 255, 0.2)',
        }
    },
    typography: {
        fontFamily: '"Hind Siliguri", "Inter", sans-serif',
        h1: { fontFamily: '"Outfit", "Hind Siliguri", sans-serif', fontWeight: 700 },
        h2: { fontFamily: '"Outfit", "Hind Siliguri", sans-serif', fontWeight: 700 },
        h3: { fontFamily: '"Outfit", "Hind Siliguri", sans-serif', fontWeight: 700 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 0,
                    border: '1px solid #FFFFFF',
                    padding: '8px 24px',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        border: '1px solid #FFFFFF',
                    },
                },
                contained: {
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    border: '1px solid #FFFFFF',
                    '&:hover': {
                        backgroundColor: '#EEEEEE',
                        color: '#000000',
                    },
                },
                outlined: {
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    border: '1px solid #FFFFFF',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid #FFFFFF',
                    },
                }
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                    borderRadius: 0,
                    border: '1px solid #FFFFFF',
                    backgroundImage: 'none',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                    borderBottom: '1px solid #FFFFFF',
                    backgroundImage: 'none',
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#000000',
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#000000',
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: '1px solid #FFFFFF',
                    color: '#FFFFFF',
                }
            }
        }
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)
