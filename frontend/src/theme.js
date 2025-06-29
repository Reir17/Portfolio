// frontend/src/theme.js
// Konfigurasi tema global untuk aplikasi React (non-dashboard)
// Ini adalah objek tema sederhana untuk referensi warna di Tailwind
// Bukan lagi tema Material-UI.

const theme = {
    colors: {
        primary: '#4F46E5', // Indigo 600
        secondary: '#10B981', // Emerald 500
        accent: '#F59E0B', // Amber 500
        dark: '#1F2937', // Gray 800
        light: '#F9FAFB', // Gray 50
    },
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    // Anda bisa menambahkan properti tema kustom lainnya di sini
    // Contoh: spacing, borderRadius, etc.
};

export default theme;
