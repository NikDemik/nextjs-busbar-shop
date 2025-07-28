import contactData from '@/lib/contactData';

export default function ContactsPage() {
    return (
        <main className="bg-[var(--color-bg)] text-[var(--color-text)] py-12">
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 mx-auto">
                {/* Форма */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
                    <p className="text-muted mb-6">Мы ответим вам в ближайшее время</p>
                    <form className="space-y-4">
                        <input type="text" placeholder="Ваше имя" className="input" />
                        <input type="email" placeholder="Email" className="input" />
                        <textarea placeholder="Сообщение" className="input h-32 resize-none" />
                        <button type="submit" className="btn">
                            Отправить
                        </button>
                    </form>
                </div>

                {/* Карта и контакты */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Наш офис</h2>
                    <div className="mb-4 text-muted">
                        Адрес: {contactData.address}
                        <br />
                        Телефон: {contactData.phone}
                        <br />
                        Email: {contactData.email}
                    </div>
                    <iframe
                        src={contactData.mapEmbedUrl}
                        className="w-full h-80 rounded-lg shadow-md"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </main>
    );
}
