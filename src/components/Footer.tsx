export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-700 py-4 mt-8">
            <div className="container mx-auto px-4 text-sm text-center">
                &copy; {new Date().getFullYear()} Шинопровод Онлайн. Все права защищены.
            </div>
        </footer>
    );
}
