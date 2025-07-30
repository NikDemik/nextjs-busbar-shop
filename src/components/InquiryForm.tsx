'use client';
import { useState } from 'react';

export function InquiryForm({ productSlug }: { productSlug: string }) {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = new FormData(e.target);
        await fetch('/api/inquiry', {
            method: 'POST',
            body: JSON.stringify({
                name: form.get('name'),
                email: form.get('email'),
                phone: form.get('phone'),
                message: form.get('message'),
                productSlug,
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        setSubmitted(true);
    };

    return submitted ? (
        <p className="text-green-600">Спасибо! Мы свяжемся с вами.</p>
    ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <input type="text" name="name" placeholder="Имя" className="input" required />
            <input type="email" name="email" placeholder="Email" className="input" required />
            <input type="tel" name="phone" placeholder="Телефон" className="input" required />
            <textarea name="message" placeholder="Сообщение" className="input" rows={4} />
            <button type="submit" className="btn btn-accent">
                Отправить запрос
            </button>
        </form>
    );
}
