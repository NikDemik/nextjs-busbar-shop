'use client';

import Image from 'next/image';
import { Boxes, Settings, Package } from 'lucide-react';
import { Button } from '../ui/button';

export default function StageWork() {
    const stages = [
        {
            id: '1',
            title: 'Оставьте заявку',
            description:
                'Оставьте свои контактные данные в любой форме обратной связи на сайте, и наш менеджер свяжется с вами для составления технического задания.',
            icon: <Settings className="w-10 h-10 text-accent" />,
            link: '/catalog/components',
        },
        {
            id: '2',
            title: 'Коммерческое предложение',
            description:
                'Исходя из составленного технического задания, мы разработаем персональное коммерческое предложение с указанием сроков выполнения, стоимости и условий доставки.',
            icon: <Boxes className="w-10 h-10 text-accent" />,
            link: '/catalog/busbars',
        },
        {
            id: '3',
            title: 'Комплектация',
            description:
                'Инициируем процесс сборки товаров на складе, следим за каждым этапом, чтобы гарантировать высокое качество продукции.',
            icon: <Package className="w-10 h-10 text-accent" />,
            link: '/catalog/kits',
        },
        {
            id: '4',
            title: 'Доставка заказа',
            description:
                'Ваш заказ будет доставлен либо в транспортную компанию, либо по указанному вами адресу — как вы выберете. ',
            icon: <Package className="w-10 h-10 text-accent" />,
            link: '/catalog/kits',
        },
    ];

    return (
        <section className="w-full dark:bg-gray-900 py-10">
            <div className="max-w-7xl mx-auto p-6 bg-foreground dark:bg-neutral-900 rounded-2xl text-center">
                <p className="text-xl md:text-xl font-normal text-gray-500 dark:text-white">
                    [ Как мы работаем ]
                </p>
                <div className=" flex justify-between flex-col sm:flex-row gap-4 items-center py-10">
                    <h2 className=" text-white text-2xl md:text-3xl lg:text-4xl text-start lg:leading-10">
                        Путь к <span className="text-accent">вашему</span>
                        <br /> надежному <span className="text-accent">шинопроводу</span>
                    </h2>
                    <div>
                        <Button>Отправить запрос</Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6">
                        <Image
                            src="/image/banners/stage-work-1.png"
                            alt="Этапы работы"
                            width={600}
                            height={600}
                            className=" rounded-2xl"
                        />
                    </div>
                    <div>
                        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                            {stages.map((stage, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col flex-wrap content-start justify-start bg-white dark:bg-neutral-200 rounded-2xl p-2 md:p-4 xl:p-6 text-start"
                                >
                                    <div className=" flex justify-start">
                                        <div className=" flex justify-center items-center bg-foreground rounded-2xl w-10 h-10 text-white dark:text-foreground">
                                            {stage.id}
                                        </div>
                                    </div>
                                    <div className="py-4 text-xl leading-5 font-semibold flex-grow">
                                        {stage.title}
                                    </div>
                                    <div className=" flex-grow text-gray-600">
                                        {stage.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
