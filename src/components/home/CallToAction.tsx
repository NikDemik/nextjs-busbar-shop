'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

export default function CallToActionFormSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // здесь можно подключить EmailJS, API route или отправку на почту
            console.log(formData);
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <section className="relative w-full py-24 bg-foreground text-white">
            {/* Декоративный фон */}
            <div className="absolute h-full inset-x-60 inset-y-40 bg-[url('/image/component/section-bg-img.svg')] opacity-3 bg-no-repeat" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Оставьте заявку на расчёт или консультацию
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto">
                        Мы подберём решение под ваши задачи и свяжемся в течение рабочего дня.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <label className="block text-sm mb-2 text-white/80">Имя</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl p-3 bg-white/20 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-300"
                            placeholder="Ваше имя"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-white/80">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl p-3 bg-white/20 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-300"
                            placeholder="example@mail.ru"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-2 text-white/80">Телефон</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl p-3 bg-white/20 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-300"
                            placeholder="+7 (___) ___-__-__"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm mb-2 text-white/80">Сообщение</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Опишите задачу или нужный тип шинопровода"
                            className="w-full rounded-xl p-3 bg-white/20 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
                        />
                    </div>

                    <div className="md:col-span-2 flex justify-center">
                        <button
                            type="submit"
                            className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 transition"
                        >
                            Отправить заявку
                        </button>

                        {/* ✅ Дисклеймер */}
                        <div className="flex items-start gap-2 text-sm text-white/70 max-w-md text-center md:text-left">
                            <Info className="w-4 h-4 mt-0.5 text-green-300 shrink-0" />
                            <p>
                                Нажимая кнопку «Отправить заявку», вы соглашаетесь с{' '}
                                <a
                                    href="/privacy-policy"
                                    className="underline hover:text-white transition"
                                >
                                    политикой конфиденциальности
                                </a>{' '}
                                и даёте согласие на обработку персональных данных.
                            </p>
                        </div>
                    </div>

                    {status === 'success' && (
                        <p className="md:col-span-2 text-center text-green-300 mt-4">
                            ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="md:col-span-2 text-center text-red-300 mt-4">
                            ⚠️ Произошла ошибка при отправке. Попробуйте ещё раз.
                        </p>
                    )}
                </motion.form>
            </div>
        </section>
    );
}
